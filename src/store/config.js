import { defineStore } from 'pinia'
import settings from '@/settings'
import { i18n } from '@/lang'
const { locale } = i18n.global
export const useConfigStore = defineStore('config', {
  state: () => {
    return {
      language: settings.defaultLanguage,
    }
  },
  persist: {
    storage: localStorage,
    paths: ['language']
  },
  actions: {
    setLanguage(lang) {
      this.language = lang
      locale.value = lang
    }
  }
})
