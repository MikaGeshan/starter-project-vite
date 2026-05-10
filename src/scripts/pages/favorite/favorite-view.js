class FavoriteView {
  getTemplate() {
    return `
      <section class="animate-in fade-in duration-700">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
          <div class="space-y-1">
            <h1 class="text-4xl font-black text-gray-900 tracking-tight">Cerita Favorit</h1>
            <p class="text-gray-500 font-medium">Koleksi cerita yang Anda simpan secara lokal.</p>
          </div>
          <div class="relative w-full md:w-80">
            <input type="text" id="search-favorite" placeholder="Cari cerita favorit..." class="w-full px-6 py-3 rounded-2xl border border-gray-100 bg-white shadow-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all font-medium">
            <span class="absolute right-6 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
          </div>
        </div>
        
        <div id="favorite-list" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <div class="col-span-full flex flex-col items-center justify-center py-32 space-y-4">
            <div class="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
            <p class="text-gray-400 font-bold tracking-widest uppercase text-xs">Mengambil Data Favorit</p>
          </div>
        </div>
      </section>
    `;
  }

  showData(data, onRemoveFavorite) {
    const favoriteListElement = document.querySelector('#favorite-list');
    if (!data || data.length === 0) {
      favoriteListElement.innerHTML = `
        <div class="col-span-full text-center py-24 bg-white rounded-[2rem] border-4 border-dashed border-gray-100">
          <div class="text-6xl mb-6">💖</div>
          <p class="text-2xl text-gray-400 font-black italic">Belum ada cerita favorit.</p>
          <p class="text-gray-400 mt-2 font-medium">Klik ikon hati pada cerita untuk menyimpannya di sini.</p>
        </div>
      `;
      return;
    }

    favoriteListElement.innerHTML = data.map((item) => `
      <div class="group bg-white rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 cursor-pointer transform hover:-translate-y-3 card-story" 
        data-id="${item.id}" 
        tabindex="0" 
        role="button">
        <div class="relative h-72 overflow-hidden">
          <img src="${item.photoUrl}" alt="Foto cerita oleh ${item.name}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
          <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
            <a href="#/detail/${item.id}" class="text-white font-bold text-xs bg-blue-600/90 px-5 py-2.5 rounded-full backdrop-blur-md shadow-lg">Lihat Detail Cerita</a>
          </div>
        </div>
        <div class="p-8">
          <div class="flex justify-between items-start mb-6">
            <h3 class="text-2xl font-black text-gray-900 group-hover:text-blue-600 transition-colors leading-tight">${item.name}</h3>
            <button class="btn-remove-favorite p-2 rounded-full bg-pink-600 text-white hover:bg-pink-700 transition-all shadow-sm" data-id="${item.id}" title="Hapus dari Favorit">
              ❤️
            </button>
          </div>
          <p class="text-gray-500 line-clamp-3 leading-relaxed font-medium text-lg">${item.description}</p>
        </div>
      </div>
    `).join('');

    favoriteListElement.querySelectorAll('.btn-remove-favorite').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        onRemoveFavorite(btn.dataset.id);
      });
    });

    favoriteListElement.querySelectorAll('.card-story').forEach((card) => {
      card.addEventListener('click', () => {
        window.location.hash = `#/detail/${card.dataset.id}`;
      });
    });
  }

  bindSearch(onSearch) {
    const searchInput = document.querySelector('#search-favorite');
    searchInput.addEventListener('input', (e) => {
      onSearch(e.target.value);
    });
  }
}

export default FavoriteView;
