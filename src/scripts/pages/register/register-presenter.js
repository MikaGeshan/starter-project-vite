class RegisterPresenter {
  constructor({ view, model }) {
    this._view = view;
    this._model = model;

    this._view.bindRegister(this._handleRegister.bind(this));
  }

  async _handleRegister(data) {
    try {
      const response = await this._model.postRegister(data);
      if (response.error) {
        this._view.showMessage(response.message, true);
      } else {
        this._view.showMessage('Registrasi berhasil! Silakan login.');
        window.location.hash = '#/login';
      }
    } catch (error) {
      console.error('Registration failed:', error);
      this._view.showMessage('Terjadi kesalahan saat registrasi.', true);
    }
  }
}

export default RegisterPresenter;
