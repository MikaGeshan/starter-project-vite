import FavoriteView from './favorite-view';
import FavoritePresenter from './favorite-presenter';

export default class FavoritePage {
  constructor() {
    this._view = new FavoriteView();
  }

  async render() {
    return this._view.getTemplate();
  }

  async afterRender() {
    new FavoritePresenter({
      view: this._view,
    });
  }
}
