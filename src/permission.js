import router from '@/router'
import {
  filterAsyncRouter,
  progressClose,
  progressStart
} from '@/hooks/use-permission'


//路由進入前攔截
router.beforeEach(async (to) => {
  // 頁面上方顯示目前loading的進度條
  progressStart()

  const basicStore = useBasicStore()
  const sessionStore = useSessionStore()

  if (!basicStore.getUserInfo) {
    try {

      const userName = 'amber'
      const userEmail = 'amber.huang@gmail.com'
      basicStore.setUserInfo(
        userName,
        userEmail,
      )

      filterAsyncRouter({
        menuList: [],
        codes: []
      })

      // perform routes again
      return { ...to, replace: true }
    } catch (err) {
      elNotification(err.response.data.message, 'error')
      basicStore.resetState()
      sessionStore.resetState()

      progressClose()
      return `/login?redirect=${to.path}`
    }
  }
})

//路由進入後攔截
router.afterEach(() => {
  // 關閉進度條
  progressClose()
})
