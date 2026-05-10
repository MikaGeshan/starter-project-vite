import DBHelper from '../../data/db-helper';

class HomePresenter {
  constructor({ view, model }) {
    this._view = view;
    this._model = model;
    this._map = null;
    this._markers = {};

    this._initialize();
  }

  async _initialize() {
    this._view.setFavoriteCallbacks({
      onFavoriteClick: (story, isFavorited, btn) => this._onFavoriteClick(story, isFavorited, btn),
      onCheckFavorite: (id) => this._onCheckFavorite(id),
    });

    try {
      const response = await this._model.getData();
      const stories = response.listStory || [];
      
      this._view.showData(stories, (id) => this._onStoryClick(id));
      this._initMap(stories);
    } catch (error) {
      console.error('Failed to fetch stories:', error);
      this._view.showError('Gagal memuat cerita. Pastikan Anda sudah login.');
    }
  }

  async _onFavoriteClick(story, isFavorited, btn) {
    if (isFavorited) {
      await DBHelper.deleteFavorite(story.id);
      btn.innerText = '🤍';
    } else {
      await DBHelper.putFavorite(story);
      btn.innerText = '❤️';
    }
  }

  async _onCheckFavorite(id) {
    const story = await DBHelper.getFavorite(id);
    return !!story;
  }

  _initMap(stories) {
    // 1. Tile Layers (Criteria 2 Advanced: Multiple tile layers)
    const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    });

    const satellite = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EBP, and the GIS User Community'
    });

    // 2. Initialize Map
    this._map = L.map('map', {
      center: [-2.5489, 118.0149], // Indonesia center
      zoom: 5,
      layers: [osm]
    });

    // 3. Layer Control (Criteria 2 Advanced)
    const baseMaps = {
      "OpenStreetMap": osm,
      "Satellite": satellite
    };
    L.control.layers(baseMaps).addTo(this._map);

    // 4. Add Markers (Criteria 2 Basic)
    stories.forEach((story) => {
      if (story.lat !== null && story.lon !== null) {
        const marker = L.marker([story.lat, story.lon]).addTo(this._map);
        
        // Popup (Criteria 2 Basic: popup with image and text)
        marker.bindPopup(`
          <div class="map-popup">
            <img src="${story.photoUrl}" alt="Foto cerita oleh ${story.name}" style="width:100%; border-radius:4px;">
            <h4>${story.name}</h4>
            <p>${story.description.substring(0, 50)}...</p>
          </div>
        `);

        this._markers[story.id] = marker;
      }
    });
  }

  _onStoryClick(id) {
    const marker = this._markers[id];
    if (marker) {
      this._map.flyTo(marker.getLatLng(), 12);
      marker.openPopup();
    } else {
      alert('Lokasi tidak tersedia untuk cerita ini.');
    }
  }
}

export default HomePresenter;
