import DetailView from './detail-view';
import DetailPresenter from './detail-presenter';
import { parseActivePathname } from '../../routes/url-parser';

export default class DetailPage {
  constructor() {
    this._view = new DetailView();
  }

  async render() {
    return this._view.getTemplate();
  }

  async afterRender() {
    const { id } = parseActivePathname();
    new DetailPresenter({
      view: this._view,
      id,
    });
  }
}
