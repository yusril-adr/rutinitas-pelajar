const UrlParser = {
  parseActiveUrlWithCombiner() {
    const url = window.location.pathname.slice(1).toLowerCase();
    const splitedUrl = this._urlSplitter(url);
    return this._urlCombiner(splitedUrl);
  },

  parseActiveUrlWithoutCombiner() {
    const url = window.location.pathname.slice(1).toLowerCase();
    return this._urlSplitter(url);
  },

  _urlSplitter(url) {
    const urlsSplits = url.split('/');
    return {
      resource: urlsSplits[0].split('.')[0] || null,
      verb: urlsSplits[1] || null,
      id: urlsSplits[2] || null,
    };
  },

  _urlCombiner(splitedUrl) {
    return (splitedUrl.resource ? `/${splitedUrl.resource}` : '/')
      + (splitedUrl.verb ? '/verb' : '')
      + (splitedUrl.id ? '/:id' : '');
  },
};

export default UrlParser;
