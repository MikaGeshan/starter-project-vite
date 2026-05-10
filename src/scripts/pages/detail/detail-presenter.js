import { getDetailData } from '../../data/api';

class DetailPresenter {
  constructor({ view, id }) {
    this._view = view;
    this._id = id;

    this._initialize();
  }

  async _initialize() {
    try {
      const response = await getDetailData(this._id);
      if (response.error) {
        throw new Error(response.message);
      }
      this._view.showDetail(response.story);
    } catch (error) {
      console.error('Failed to fetch story detail:', error);
      this._view.showError('Gagal memuat detail cerita.');
    }
  }
}

export default DetailPresenter;
