class HomeView {
  getTemplate() {
    return `
      <section class="animate-in fade-in duration-700">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div class="space-y-1">
            <h1 class="text-4xl font-black text-gray-900 tracking-tight">Dashboard Story</h1>
            <p class="text-gray-500 font-medium">Jelajahi cerita dari berbagai lokasi di Indonesia.</p>
          </div>
          <div class="flex items-center gap-3 bg-blue-50 text-blue-700 px-6 py-3 rounded-2xl font-bold text-sm border border-blue-100 shadow-sm">
            <span class="flex h-3 w-3 relative">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span class="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
            </span>
            📍 Lokasi Terdeteksi
          </div>
        </div>
        
        <div id="map" class="w-full h-[500px] rounded-[2rem] shadow-2xl border-8 border-white mb-16 relative z-0 overflow-hidden group" role="application" aria-label="Peta interaktif yang menunjukkan lokasi cerita">
           <div class="absolute inset-0 bg-gray-100 flex items-center justify-center -z-10">
             <p class="text-gray-400 font-bold animate-pulse">Memuat Peta...</p>
           </div>
        </div>
        
        <div class="flex items-center gap-4 mb-10">
          <h2 class="text-2xl font-black text-gray-900">Cerita Terbaru</h2>
          <div class="h-1 flex-grow bg-gray-100 rounded-full overflow-hidden">
            <div class="h-full w-24 bg-blue-500 rounded-full"></div>
          </div>
        </div>
        
        <div id="data-list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div class="col-span-full flex flex-col items-center justify-center py-32 space-y-4">
            <div class="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
            <p class="text-gray-400 font-bold tracking-widest uppercase text-xs">Mengambil Data Cerita</p>
          </div>
        </div>
      </section>
    `;
  }

  showData(data, onCardClick) {
    const dataListElement = document.querySelector('#data-list');
    if (!data || data.length === 0) {
      dataListElement.innerHTML = `
        <div class="col-span-full text-center py-24 bg-white rounded-[2rem] border-4 border-dashed border-gray-100">
          <div class="text-6xl mb-6">📭</div>
          <p class="text-2xl text-gray-400 font-black italic">Belum ada cerita di sini.</p>
          <p class="text-gray-400 mt-2 font-medium">Jadilah yang pertama untuk berbagi!</p>
        </div>
      `;
      return;
    }

    dataListElement.innerHTML = data.map((item) => `
      <div class="group bg-white rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 cursor-pointer transform hover:-translate-y-3 card-story" 
        data-id="${item.id}" 
        tabindex="0" 
        role="button" 
        aria-label="Cerita oleh ${item.name}, klik untuk lihat detail">
        <div class="relative h-72 overflow-hidden">
          <img src="${item.photoUrl}" alt="Foto cerita oleh ${item.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
          <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
            <div class="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
               <a href="#/detail/${item.id}" class="text-white font-bold text-xs bg-blue-600/90 px-5 py-2.5 rounded-full backdrop-blur-md shadow-lg">Lihat Detail Cerita</a>
            </div>
          </div>
        </div>
        <div class="p-8">
          <div class="flex justify-between items-start mb-6">
            <h3 class="text-2xl font-black text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">${item.name}</h3>
            <div class="flex gap-2">
              <button class="btn-favorite p-2 rounded-full bg-pink-50 text-pink-600 hover:bg-pink-600 hover:text-white transition-all shadow-sm" data-id="${item.id}" title="Tambah ke Favorit">
                🤍
              </button>
              ${item.lat && item.lon ? `
                <button class="btn-locate p-2 rounded-full bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm" data-id="${item.id}" title="Lihat di Peta">
                  📍
                </button>
              ` : ''}
            </div>
          </div>
          <div class="flex items-center gap-3 mb-6">
            <div class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-lg" aria-hidden="true">👤</div>
            <div>
               <p class="text-xs font-black text-gray-400 uppercase tracking-widest">${new Date(item.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
            </div>
          </div>
          <p class="text-gray-500 line-clamp-3 leading-relaxed font-medium text-lg">${item.description}</p>
        </div>
      </div>
    `).join('');

    const handleAction = (id) => {
      window.location.hash = `#/detail/${id}`;
    };

    const handleLocate = (event, id) => {
      event.stopPropagation();
      onCardClick(id);
    };

    const handleFavorite = async (event, story) => {
      event.stopPropagation();
      const btn = event.currentTarget;
      const isFavorited = btn.innerText === '❤️';
      this._onFavoriteClick(story, isFavorited, btn);
    };

    dataListElement.querySelectorAll('.card-story').forEach((card, index) => {
      card.addEventListener('click', () => handleAction(card.dataset.id));
      card.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          handleAction(card.dataset.id);
        }
      });

      const locateBtn = card.querySelector('.btn-locate');
      if (locateBtn) {
        locateBtn.addEventListener('click', (e) => handleLocate(e, card.dataset.id));
      }

      const favoriteBtn = card.querySelector('.btn-favorite');
      if (favoriteBtn) {
        this._checkFavorite(card.dataset.id, favoriteBtn);
        favoriteBtn.addEventListener('click', (e) => handleFavorite(e, data[index]));
      }
    });
  }

  async _checkFavorite(id, btn) {
    if (this.onCheckFavorite) {
      const isFav = await this.onCheckFavorite(id);
      btn.innerText = isFav ? '❤️' : '🤍';
    }
  }

  setFavoriteCallbacks({ onFavoriteClick, onCheckFavorite }) {
    this._onFavoriteClick = onFavoriteClick;
    this.onCheckFavorite = onCheckFavorite;
  }

  showError(message) {
    const dataListElement = document.querySelector('#data-list');
    if (dataListElement) {
      dataListElement.innerHTML = `
        <div class="col-span-full text-center py-24">
          <p class="text-red-500 font-bold">${message}</p>
        </div>
      `;
    }
  }
}

export default HomeView;
