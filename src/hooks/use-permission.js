import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Layout from '@/layout/index.vue'
import router, { asyncRoutes, constantRoutes, roleCodeRoutes } from '@/router'


const buttonCodes = [] 
export const filterAsyncRoutesByMenuList = (menuList) => {
  const filterRouter = []
  menuList.forEach((route) => {
    //button permission
    if (route.category === 3) {
      buttonCodes.push(route.code)
    } else {
      //generator every router item by menuList
      const itemFromReqRouter = getRouteItemFromReqRouter(route)
      if (route.children?.length) {
        //judge  the type is router or button
        itemFromReqRouter.children = filterAsyncRoutesByMenuList(route.children)
      }
      filterRouter.push(itemFromReqRouter)
    }
  })
  return filterRouter
}
const getRouteItemFromReqRouter = (route) => {
  const tmp = { meta: { title: '' } }
  const routeKeyArr = [
    'path',
    'component',
    'redirect',
    'alwaysShow',
    'name',
    'hidden'
  ]
  const metaKeyArr = ['title', 'activeMenu', 'elSvgIcon', 'icon']
  // @ts-ignore
  const modules = import.meta.glob('../views/**/**.vue')
  //generator routeKey
  routeKeyArr.forEach((fItem) => {
    if (fItem === 'component') {
      if (route[fItem] === 'Layout') {
        tmp[fItem] = Layout
      } else {
        //has error , i will fix it through plugins
        //tmp[fItem] = () => import(`@/views/permission-center/test/TestTableQuery.vue`)
        tmp[fItem] = modules[`../views/${route[fItem]}`]
      }
    } else if (fItem === 'path' && route.parentId === 0) {
      tmp[fItem] = `/${route[fItem]}`
    } else if (['hidden', 'alwaysShow'].includes(fItem)) {
      tmp[fItem] = !!route[fItem]
    } else if (['name'].includes(fItem)) {
      tmp[fItem] = route['code']
    } else if (route[fItem]) {
      tmp[fItem] = route[fItem]
    }
  })
  //generator metaKey
  metaKeyArr.forEach((fItem) => {
    if (route[fItem] && tmp.meta) tmp.meta[fItem] = route[fItem]
  })
  //route extra insert
  if (route.extra) {
    Object.entries(route.extra.parse(route.extra)).forEach(([key, value]) => {
      if (key === 'meta' && tmp.meta) {
        tmp.meta[key] = value
      } else {
        tmp[key] = value
      }
    })
  }
  return tmp
}

// 根據 角色權限 過濾非同步路由
export function filterAsyncRoutesByRoles(routes, roles) {
  const res = []
  routes.forEach((route) => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutesByRoles(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}
function hasPermission(roles, route) {
  if (route?.meta?.roles) {
    return roles?.some((role) => route.meta.roles.includes(role))
  } else {
    return true
  }
}

// 根據code編碼 過濾非同步路由
export function filterAsyncRouterByCodes(codesRoutes, codes) {
  const filterRouter = []
  codesRoutes.forEach((routeItem) => {
    if (hasCodePermission(codes, routeItem)) {
      if (routeItem.children)
        routeItem.children = filterAsyncRouterByCodes(routeItem.children, codes)
      filterRouter.push(routeItem)
    }
  })
  return filterRouter
}
function hasCodePermission(codes, routeItem) {
  if (routeItem.meta?.code) {
    return codes.includes(routeItem.meta.code) || routeItem.hidden
  } else {
    return true
  }
}

// 過濾非同步路由
export function filterAsyncRouter({ menuList, roles, codes }) {
  const basicStore = useBasicStore()
  let accessRoutes = []
  const permissionMode = basicStore.settings?.permissionMode
  if (permissionMode === 'rbac') {
    accessRoutes = filterAsyncRoutesByMenuList(menuList) //by menuList
  } else if (permissionMode === 'roles') {
    accessRoutes = filterAsyncRoutesByRoles(roleCodeRoutes, roles) //by roles
  } else {
    accessRoutes = filterAsyncRouterByCodes(roleCodeRoutes, codes) //by codes
  }
  accessRoutes.forEach((route) => router.addRoute(route))
  asyncRoutes.forEach((item) => router.addRoute(item))
  basicStore.setFilterAsyncRoutes(accessRoutes)
}

//重置路由
export function resetRouter() {
  //移除之前存在的路由
  const routeNameSet = new Set()
  router.getRoutes().forEach((fItem) => {
    if (fItem.name) routeNameSet.add(fItem.name)
  })
  routeNameSet.forEach((setItem) => router.removeRoute(setItem))
  //新增constantRoutes
  constantRoutes.forEach((feItem) => router.addRoute(feItem))
}

// 重置登入狀態
export function resetState() {
  resetRouter()
  useBasicStore().resetState()
  useSessionStore().resetState()
}

// 刷新路由
export function freshRouter(data) {
  resetRouter()
  filterAsyncRouter(data)
  // location.reload()
}

NProgress.configure({ showSpinner: false })
export const progressStart = () => {
  NProgress.start()
}

export const progressClose = () => {
  NProgress.done()
}
