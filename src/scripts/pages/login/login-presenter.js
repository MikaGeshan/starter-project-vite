class LoginPresenter {
  constructor({ view, model }) {
    this._view = view;
    this._model = model;

    this._view.bindLogin(this._handleLogin.bind(this));
  }

  async _handleLogin(data) {
    try {
      const response = await this._model.postLogin(data);
      if (response.error) {
        this._view.showMessage(response.message, true);
      } else {
        // Save token to localStorage for later use
        localStorage.setItem('user_token', response.loginResult.token);
        this._view.showMessage('Login berhasil!');
        window.location.hash = '#/';
      }
    } catch (error) {
      console.error('Login failed:', error);
      this._view.showMessage('Terjadi kesalahan saat login.', true);
    }
  }
}

export default LoginPresenter;
