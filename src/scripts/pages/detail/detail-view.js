class DetailView {
  getTemplate() {
    return `
      <section class="animate-in fade-in duration-700 max-w-4xl mx-auto">
        <div class="mb-10">
          <a href="#/" class="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline mb-6">
            ← Kembali ke Beranda
          </a>
          <h1 class="text-4xl font-black text-gray-900 tracking-tight">Detail Cerita</h1>
        </div>

        <div id="detail-content" class="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100">
          <div class="flex flex-col items-center justify-center py-32 space-y-4">
            <div class="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
            <p class="text-gray-400 font-bold tracking-widest uppercase text-xs">Memuat Detail Cerita</p>
          </div>
        </div>
      </section>
    `;
  }

  showDetail(story) {
    const detailContent = document.querySelector('#detail-content');
    detailContent.innerHTML = `
      <div class="relative h-[500px] overflow-hidden">
        <img src="${story.photoUrl}" alt="Foto cerita oleh ${story.name}" class="w-full h-full object-cover">
      </div>
      <div class="p-10">
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
          <div>
            <h2 class="text-3xl font-black text-gray-900 mb-2">${story.name}</h2>
            <p class="text-sm font-black text-gray-400 uppercase tracking-widest">
              ${new Date(story.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </p>
          </div>
          ${story.lat && story.lon ? `
            <div class="bg-blue-50 text-blue-700 px-6 py-3 rounded-2xl font-bold text-sm border border-blue-100 flex items-center gap-2">
              📍 ${story.lat.toFixed(4)}, ${story.lon.toFixed(4)}
            </div>
          ` : ''}
        </div>
        <div class="prose max-w-none">
          <p class="text-xl text-gray-600 leading-relaxed font-medium whitespace-pre-wrap">${story.description}</p>
        </div>
      </div>
    `;
  }

  showError(message) {
    const detailContent = document.querySelector('#detail-content');
    detailContent.innerHTML = `
      <div class="p-20 text-center">
        <div class="text-6xl mb-6">⚠️</div>
        <p class="text-xl text-red-500 font-bold">${message}</p>
        <a href="#/" class="mt-8 inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-blue-700 transition-all">Kembali ke Beranda</a>
      </div>
    `;
  }
}

export default DetailView;
