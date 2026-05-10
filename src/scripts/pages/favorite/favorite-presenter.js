import DBHelper from '../../data/db-helper';

class FavoritePresenter {
  constructor({ view }) {
    this._view = view;
    this._stories = [];

    this._initialize();
  }

  async _initialize() {
    this._stories = await DBHelper.getAllFavorites();
    this._view.showData(this._stories, (id) => this._onRemoveFavorite(id));
    this._view.bindSearch((query) => this._onSearch(query));
  }

  async _onRemoveFavorite(id) {
    await DBHelper.deleteFavorite(id);
    this._stories = this._stories.filter((story) => story.id !== id);
    this._view.showData(this._stories, (id) => this._onRemoveFavorite(id));
  }

  _onSearch(query) {
    const filteredStories = this._stories.filter((story) => 
      story.name.toLowerCase().includes(query.toLowerCase()) || 
      story.description.toLowerCase().includes(query.toLowerCase())
    );
    this._view.showData(filteredStories, (id) => this._onRemoveFavorite(id));
  }
}

export default FavoritePresenter;
