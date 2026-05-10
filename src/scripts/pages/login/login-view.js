class LoginView {
  getTemplate() {
    return `
      <section class="flex items-center justify-center min-h-[calc(100vh-120px)] px-4">
        <div class="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 p-8 md:p-12">
          <div class="text-center mb-10">
            <h1 class="text-3xl font-black text-gray-900 mb-2">Selamat Datang</h1>
            <p class="text-gray-500 font-medium">Masuk untuk melihat cerita seru!</p>
          </div>
          <form id="login-form" class="space-y-6">
            <div class="space-y-2">
              <label for="email" class="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">Email</label>
              <input type="email" id="email" name="email" required 
                class="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-400 focus:outline-none transition-all duration-300 font-medium" 
                placeholder="nama@email.com">
            </div>
            <div class="space-y-2">
              <label for="password" class="text-sm font-bold text-gray-700 uppercase tracking-wider ml-1">Password</label>
              <input type="password" id="password" name="password" required 
                class="w-full px-5 py-4 bg-gray-50 border-2 border-transparent rounded-2xl focus:bg-white focus:border-blue-400 focus:outline-none transition-all duration-300 font-medium" 
                placeholder="••••••••">
            </div>
            <button type="submit" 
              class="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-lg rounded-2xl shadow-lg shadow-blue-200 transform hover:-translate-y-1 transition-all duration-300">
              Masuk Sekarang
            </button>
          </form>
          <div class="mt-10 text-center">
            <p class="text-gray-600 font-medium">Belum punya akun? 
              <a href="#/register" class="text-blue-600 font-bold hover:underline ml-1">Daftar di sini</a>
            </p>
          </div>
        </div>
      </section>
    `;
  }

  bindLogin(handler) {
    const form = document.querySelector('#login-form');
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      handler(data);
    });
  }

  showMessage(message, isError = false) {
    alert(message);
  }
}

export default LoginView;
