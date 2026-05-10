import RegisterView from './register-view';
import RegisterPresenter from './register-presenter';
import { postRegister } from '../../data/api';

export default class RegisterPage {
  constructor() {
    this._view = new RegisterView();
  }

  async render() {
    return this._view.getTemplate();
  }

  async afterRender() {
    new RegisterPresenter({
      view: this._view,
      model: { postRegister },
    });
  }
}
