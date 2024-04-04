import { defineStore } from 'pinia'

export const useSessionStore = defineStore('session', {
  state: () => {
    return {
      token: '',
    }
  },
  persist: {
    storage: localStorage,
    paths: ['token']
  },
  actions: {
    setToken(data) {
      this.token = data
    },
    resetState() {
      this.$patch((state) => {
        state.token = ''
      })
    }
  }
})