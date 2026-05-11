class AddStoryView {
  getTemplate() {
    return `
      <section class="animate-in fade-in duration-700">
        <div class="mb-10">
          <h1 class="text-4xl font-black text-gray-900 tracking-tight">Tambah Cerita Baru</h1>
          <p class="text-gray-500 font-medium mt-2">Bagikan momen serumu dengan dunia.</p>
        </div>

        <form id="add-story-form" class="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div class="space-y-8">
            <div class="space-y-4">
              <label for="description" class="text-lg font-black text-gray-900 flex items-center gap-2">
                <span class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm">1</span>
                Ceritakan momenmu
              </label>
              <textarea id="description" name="description" required rows="5"
                class="w-full px-6 py-4 bg-white border-2 border-gray-100 rounded-[2rem] focus:border-blue-400 focus:outline-none transition-all duration-300 font-medium shadow-sm"
                placeholder="Tulis deskripsi cerita di sini..."></textarea>
            </div>

            <div class="space-y-4">
              <h2 class="text-lg font-black text-gray-900 flex items-center gap-2">
                <span class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm">2</span>
                Tambahkan Foto
              </h2>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div class="relative group">
                  <input type="file" id="photo" name="photo" accept="image/*" class="hidden">
                  <label for="photo" class="flex flex-col items-center justify-center w-full h-48 border-4 border-dashed border-gray-100 rounded-[2rem] cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-300" aria-label="Pilih foto dari galeri">
                    <span class="text-4xl mb-2" aria-hidden="true">🖼️</span>
                    <span class="font-bold text-gray-500">Pilih Galeri</span>
                  </label>
                </div>

                <div id="camera-section" class="relative group">
                   <button type="button" id="btn-open-camera" class="flex flex-col items-center justify-center w-full h-48 border-4 border-dashed border-gray-100 rounded-[2rem] cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-300" aria-label="Gunakan kamera untuk mengambil foto">
                    <span class="text-4xl mb-2" aria-hidden="true">📸</span>
                    <span class="font-bold text-gray-500">Gunakan Kamera</span>
                  </button>
                  <div id="camera-ui" class="hidden absolute inset-0 z-10 bg-black rounded-[2rem] overflow-hidden flex flex-col">
                    <video id="video" class="w-full h-full object-cover" autoplay playsinline aria-label="Pratinjau kamera"></video>
                    <div class="absolute bottom-4 left-0 right-0 flex justify-center gap-4">
                      <button type="button" id="btn-capture" class="w-12 h-12 bg-white rounded-full border-4 border-gray-300 shadow-lg active:scale-90 transition-transform" aria-label="Ambil foto"></button>
                      <button type="button" id="btn-close-camera" class="absolute right-4 bottom-2 text-white font-bold bg-red-600/80 px-4 py-2 rounded-xl text-xs backdrop-blur-sm" aria-label="Tutup kamera">Tutup</button>
                    </div>
                  </div>
                </div>
              </div>

              <div id="image-preview" class="hidden relative rounded-[2rem] overflow-hidden border-8 border-white shadow-xl aspect-video bg-gray-50">
                <img id="preview-img" class="w-full h-full object-cover" src="" alt="Pratinjau foto yang dipilih">
                <button type="button" id="btn-remove-photo" class="absolute top-4 right-4 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors" aria-label="Hapus foto">✕</button>
              </div>
            </div>
          </div>

          <div class="space-y-8">
            <div class="space-y-4">
              <h2 class="text-lg font-black text-gray-900 flex items-center gap-2">
                <span class="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm">3</span>
                Pilih Lokasi
              </h2>
              <p class="text-sm text-gray-500 font-medium">Klik pada peta untuk menandai lokasi ceritamu.</p>
              
              <div id="map-add" class="w-full h-[400px] rounded-[2rem] shadow-xl border-8 border-white z-0" role="application" aria-label="Peta interaktif untuk memilih lokasi"></div>
              
              <div class="grid grid-cols-2 gap-4">
                <div class="space-y-2">
                  <label for="lat" class="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Latitude</label>
                  <input type="text" id="lat" name="lat" readonly
                    class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl font-bold text-gray-600 outline-none" placeholder="-">
                </div>
                <div class="space-y-2">
                  <label for="lon" class="text-xs font-black text-gray-400 uppercase tracking-widest ml-4">Longitude</label>
                  <input type="text" id="lon" name="lon" readonly
                    class="w-full px-6 py-4 bg-gray-50 border-2 border-transparent rounded-2xl font-bold text-gray-600 outline-none" placeholder="-">
                </div>
              </div>
            </div>

            <button type="submit" id="btn-submit"
              class="w-full py-6 bg-blue-600 hover:bg-blue-700 text-white font-black text-xl rounded-[2rem] shadow-2xl shadow-blue-200 transform hover:-translate-y-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
              Posting Cerita Sekarang
            </button>
          </div>
        </form>
      </section>
    `;
  }

  bindAddStory(handler) {
    const form = document.querySelector('#add-story-form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      
      // If there's a captured image from camera, it might need special handling
      // depending on how we store it. For now, we'll assume the handler handles it.
      handler(formData);
    });
  }

  showPreview(file) {
    const previewContainer = document.querySelector('#image-preview');
    const previewImg = document.querySelector('#preview-img');
    
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        previewImg.src = e.target.result;
        previewContainer.classList.remove('hidden');
      };
      reader.readAsDataURL(file);
    } else {
      previewContainer.classList.add('hidden');
      previewImg.src = '';
    }
  }

  showMessage(message, isError = false) {
    // Simple alert for now, can be improved
    alert(message);
  }

  setLoading(isLoading) {
    const btn = document.querySelector('#btn-submit');
    if (isLoading) {
      btn.disabled = true;
      btn.innerHTML = `
        <div class="flex items-center justify-center gap-3">
          <div class="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          Memposting...
        </div>
      `;
    } else {
      btn.disabled = false;
      btn.innerText = 'Posting Cerita Sekarang';
    }
  }
}

export default AddStoryView;
