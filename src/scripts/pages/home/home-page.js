import HomeView from './home-view';
import HomePresenter from './home-presenter';
import { getData } from '../../data/api';

export default class HomePage {
  constructor() {
    this._view = new HomeView();
  }

  async render() {
    return this._view.getTemplate();
  }

  async afterRender() {
    new HomePresenter({
      view: this._view,
      model: { getData },
    });
  }
}
