import { nextTick } from 'vue'
import { defineStore } from 'pinia'
import defaultSettings from '@/settings'
import router, { constantRoutes } from '@/router'
export const useBasicStore = defineStore('basic', {
  state: () => {
    return {
      // router
      allRoutes: [],
      buttonCodes: [],
      filterAsyncRoutes: [],
      rolesObject: undefined,
      roles: [],
      codes: [],
      // axios req collection
      axiosPromiseArr: [],
      settings: defaultSettings,
      // user info
      getUserInfo: false,
      userName:'',
      userCompany:'',
      userCompanyID: undefined,
      userCompanyUUID: undefined,
      userEmail:'',
      // other
      sidebar: { 
        opened: true,  // sidebar 全部展開
        collapse: false,  // sidebar 變小欄
        hide: false,  // sidebar 完全隱藏
        drawer: false,  // 手機版展開抽屜 menu
        show: true  // 文字是否展開
     },  
     
    //  showDrawerMenu: false
    }
  },
  persist: {
    storage: sessionStorage,
    paths: []
  },
  actions: {
    // router
    remotePromiseArrByReqUrl(reqUrl) {
      this.$patch((state) => {
        state.axiosPromiseArr.forEach((fItem, index) => {
          if (fItem.url === reqUrl) {
            state.axiosPromiseArr.splice(index, 1)
          }
        })
      })
    },
    setFilterAsyncRoutes(routes) {
      this.$patch((state) => {
        state.filterAsyncRoutes = routes
        state.allRoutes = constantRoutes.concat(routes)
      })
    },
    // user info
    setUserInfo(userName, userEmail, userCompany,userCompanyID, ) {
      this.$patch((state) => {
        state.getUserInfo = true
        state.userName = userName
        state.userEmail = userEmail
        state.userCompany = userCompany
        state.userCompanyID = userCompanyID
      })
    },
    resetState() {
      this.$patch((state) => {
        state.roles = []
        state.codes = []
        //reset router
        state.allRoutes = []
        state.buttonCodes = []
        state.filterAsyncRoutes = []
        //reset userInfo
        state.userName = ''
        state.userCompany = ''
        state.userCompanyID = null
        state.userEmail = ''
      })
      this.getUserInfo = false
    },
    resetStateAndToLogin() {
      this.resetState()
      nextTick(() => {
        router.push({ path: '/login' })
      })
    },
    // other
    setSidebarOpen(data) {
      this.$patch((state) => {
        if( data === 'open') {
          state.sidebar.opened = true
          state.sidebar.show = true
          state.sidebar.collapse = false
          state.sidebar.hide = false
        } else if (data === 'collapse'){
          state.sidebar.opened = false
          state.sidebar.show = false
          state.sidebar.collapse = true
          state.sidebar.hide = false
        } else if(data === 'hide'){
          state.sidebar.opened = false
          state.sidebar.show = false
          state.sidebar.collapse = false
          state.sidebar.hide = true
        }
      })
    },
    setToggleSideBar() {
      this.$patch((state) => {
        state.sidebar.opened = !state.sidebar.opened
        state.sidebar.show = !state.sidebar.show
        state.sidebar.collapse = !state.sidebar.collapse
      })
    },
    setDrawerSidebar() {
      this.$patch((state) => {
        state.sidebar.drawer = !state.sidebar.drawer 
        state.sidebar.show = true
      })
    }
  }
})
