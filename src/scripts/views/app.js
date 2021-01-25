import HeaderInitiator from '../utils/header-initiator';
import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';
import User from '../data/user';

class App {
  constructor({
    header, content,
  }) {
    this._header = header;
    this._content = content;

    this._initialAppShell();
  }

  async _initialAppShell() {
    HeaderInitiator.init({
      header: this._header,
      page: UrlParser.parseActiveUrlWithoutCombiner().resource,
    });

    if (!(await User.isExist())) await User.syncronUser();
    await this._changeContentClass();
  }

  async _changeContentClass() {
    const { resource, verb } = UrlParser.parseActiveUrlWithoutCombiner();
    const page = verb ? `${resource}-verb` : resource || 'home';

    this._content.setAttribute('class', page);
  }

  async renderPage() {
    const url = UrlParser.parseActiveUrlWithCombiner();
    // const page = routes[url]; // Dev mode only
    const page = routes[url] || routes['/'];
    this._content.innerHTML = await page.render();
    await page.afterRender();
    await this._removeLoading();
  }

  // eslint-disable-next-line class-methods-use-this
  async _removeLoading() {
    const loading = document.querySelector('#loading');
    document.body.removeChild(loading);
  }
}

export default App;
