import LoginView from './login-view';
import LoginPresenter from './login-presenter';
import { postLogin } from '../../data/api';

export default class LoginPage {
  constructor() {
    this._view = new LoginView();
  }

  async render() {
    return this._view.getTemplate();
  }

  async afterRender() {
    new LoginPresenter({
      view: this._view,
      model: { postLogin },
    });
  }
}
