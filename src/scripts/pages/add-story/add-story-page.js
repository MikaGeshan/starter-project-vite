import AddStoryView from './add-story-view';
import AddStoryPresenter from './add-story-presenter';
import { postStory } from '../../data/api';

export default class AddStoryPage {
  constructor() {
    this._view = new AddStoryView();
  }

  async render() {
    return this._view.getTemplate();
  }

  async afterRender() {
    new AddStoryPresenter({
      view: this._view,
      model: { postStory },
    });
  }
}
