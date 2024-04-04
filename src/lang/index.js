import { createI18n } from 'vue-i18n'
import zhTW from './zh-tw'
import en from './en'
import settings from '@/settings'
const messages = { en,zhTW }

const localeData = {
  globalInjection: true, // 設置true，$t() 函式會註冊到全局
  legacy: false, // 如果想在composition api中使用，需設為 false 
  locale: settings.defaultLanguage,
  messages // set locale messages
}

export const i18n = createI18n(localeData)
export const setupI18n = {
  install(app) {
    app.use(i18n)
  }
}
