export default class AboutPage {
  async render() {
    return `
      <section class="container animate-in fade-in duration-700">
        <h1 class="text-4xl font-black text-gray-900 tracking-tight mb-6">Tentang StoryApp</h1>
        <div class="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
          <p class="text-gray-600 text-lg leading-relaxed">
            StoryApp adalah platform untuk berbagi cerita dan momen spesial Anda dengan orang lain di seluruh penjuru negeri.
          </p>
        </div>
      </section>
    `;
  }

  async afterRender() {
    // Do your job here
  }
}
