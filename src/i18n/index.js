import translate from './translate';

class I18nService {
  constructor(services, config = {}) {
    const storageLang = window.localStorage.getItem('lang') !== 'undefined' ? window.localStorage.getItem('lang') : undefined

    this.services = services;
    this.config = config;
    this.lang = storageLang || config.defaultLanguage || 'ru';
    this.subscribers = []

    this.notifySubscribers(this.lang)
  }

  getLang() {
    return this.lang
  }

  setLang(lang) {
    this.lang = lang
    window.localStorage.setItem('lang', lang)
    this.notifySubscribers(lang)
  }

  t(text, number) {
    return translate(this.lang, text, number)
  }

  subscribe(listener) {
    this.subscribers.push(listener);
  }

  unsubscribe(listener) {
    this.subscribers = this.subscribers.filter(item => item !== listener);
  }

  notifySubscribers(lang) {
    this.subscribers.forEach(subscriber => subscriber(lang))
  }
}

export default I18nService
