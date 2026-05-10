import DBHelper from '../../data/db-helper';

class AddStoryPresenter {
  constructor({ view, model }) {
    this._view = view;
    this._model = model;
    this._map = null;
    this._marker = null;
    this._stream = null;
    this._capturedFile = null;

    this._initialize();
  }

  _initialize() {
    this._initMap();
    this._view.bindAddStory(this._handleSubmit.bind(this));
    this._setupFileListeners();
    this._setupCameraListeners();
  }

  _initMap() {
    this._map = L.map('map-add').setView([-2.5489, 118.0149], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(this._map);

    this._map.on('click', (e) => {
      const { lat, lng } = e.latlng;
      this._updateLocation(lat, lng);
    });
  }

  _updateLocation(lat, lng) {
    if (this._marker) {
      this._marker.setLatLng([lat, lng]);
    } else {
      this._marker = L.marker([lat, lng]).addTo(this._map);
    }

    document.querySelector('#lat').value = lat.toFixed(6);
    document.querySelector('#lon').value = lng.toFixed(6);
  }

  _setupFileListeners() {
    const photoInput = document.querySelector('#photo');
    photoInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        this._capturedFile = file;
        this._view.showPreview(file);
      }
    });

    const removeBtn = document.querySelector('#btn-remove-photo');
    removeBtn.addEventListener('click', () => {
      this._capturedFile = null;
      photoInput.value = '';
      this._view.showPreview(null);
    });
  }

  async _setupCameraListeners() {
    const btnOpen = document.querySelector('#btn-open-camera');
    const btnClose = document.querySelector('#btn-close-camera');
    const btnCapture = document.querySelector('#btn-capture');
    const cameraUi = document.querySelector('#camera-ui');
    const video = document.querySelector('#video');

    btnOpen.addEventListener('click', async () => {
      try {
        this._stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = this._stream;
        cameraUi.classList.remove('hidden');
      } catch (err) {
        console.error('Error accessing camera:', err);
        this._view.showMessage('Tidak dapat mengakses kamera.', true);
      }
    });

    btnClose.addEventListener('click', () => {
      this._stopCamera();
      cameraUi.classList.add('hidden');
    });

    btnCapture.addEventListener('click', () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d').drawImage(video, 0, 0);
      
      canvas.toBlob((blob) => {
        const file = new File([blob], 'captured_image.jpg', { type: 'image/jpeg' });
        this._capturedFile = file;
        this._view.showPreview(file);
        this._stopCamera();
        cameraUi.classList.add('hidden');
      }, 'image/jpeg');
    });
  }

  _stopCamera() {
    if (this._stream) {
      this._stream.getTracks().forEach((track) => track.stop());
      this._stream = null;
    }
  }

  async _handleSubmit(formData) {
    const description = formData.get('description');
    const lat = formData.get('lat');
    const lon = formData.get('lon');
    const photo = this._capturedFile;

    if (!description) {
      this._view.showMessage('Deskripsi harus diisi.', true);
      return;
    }

    if (!photo) {
      this._view.showMessage('Foto harus diunggah atau diambil via kamera.', true);
      return;
    }

    const storyData = {
      description,
      photo,
      lat: lat ? parseFloat(lat) : null,
      lon: lon ? parseFloat(lon) : null,
      token: localStorage.getItem('user_token'),
    };

    if (!navigator.onLine && 'serviceWorker' in navigator && 'SyncManager' in window) {
      try {
        this._view.setLoading(true);
        // We need to convert photo to Base64 or Blob to store in IDB
        // Blobs are fine in IDB
        await DBHelper.addToOutbox(storyData);
        
        const registration = await navigator.serviceWorker.ready;
        await registration.sync.register('sync-stories');
        
        this._view.showMessage('Offline: Cerita disimpan dan akan dikirim saat Anda online kembali.');
        setTimeout(() => {
          window.location.hash = '#/';
        }, 2000);
      } catch (error) {
        console.error('Failed to register sync:', error);
        this._view.showMessage('Gagal menyimpan cerita offline.', true);
      } finally {
        this._view.setLoading(false);
      }
      return;
    }

    try {
      this._view.setLoading(true);
      const response = await this._model.postStory(storyData);

      if (response.error) {
        this._view.showMessage(response.message, true);
      } else {
        this._view.showMessage('Cerita berhasil diposting!');
        window.location.hash = '#/';
      }
    } catch (error) {
      console.error('Failed to post story:', error);
      this._view.showMessage('Terjadi kesalahan saat memposting cerita. Mencoba simpan offline...');
      
      // Fallback to offline if request fails (e.g. flaky network)
      if ('serviceWorker' in navigator && 'SyncManager' in window) {
        await DBHelper.addToOutbox(storyData);
        const registration = await navigator.serviceWorker.ready;
        await registration.sync.register('sync-stories');
      }
    } finally {
      this._view.setLoading(false);
    }
  }
}

export default AddStoryPresenter;
