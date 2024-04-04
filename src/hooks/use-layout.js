// 判斷是否為外部連結
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

// 依據視窗大小，自動判斷 sidebar 的收合
export function resizeHandler() {
  const { body } = document
  const padWidth = 992
  const mobileWidth = 768
  const basicStore = useBasicStore()
  const isPad = () => {
    const rect = body.getBoundingClientRect()
    return rect.width - 1 < padWidth &&  rect.width - 1 >= mobileWidth
  }
  const isMobile = () => {
    const rect = body.getBoundingClientRect()
    return rect.width - 1 < mobileWidth
  }
  const resizeHandler = () => {
    if (!document.hidden) {
      if (isPad()) {
        basicStore.setSidebarOpen('collapse')
      } else if(isMobile()){
        basicStore.setSidebarOpen('hide')
      } else {
        basicStore.setSidebarOpen('open')
      }
    }
  }
  onBeforeMount(() => {
    window.addEventListener('resize', resizeHandler)
  })
  onMounted(() => {
    if (isPad()) {
      basicStore.setSidebarOpen('collapse')
    } else if(isMobile()){
      basicStore.setSidebarOpen('hide')
    } else {
      basicStore.setSidebarOpen('open')
    }
  })
  onBeforeUnmount(() => {
    window.removeEventListener('resize', resizeHandler)
  })
}
