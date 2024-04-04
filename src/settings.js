export const settings = {
  title: 'Trello Board Project',
  // 布局相關
  sidebarLogo: true,
  showNavbarTitle: false,
  ShowDropDown: true,
  showHamburger: true,
  showLeftMenu: true,
  showTagsView: false,
  tagsViewNum: 6,
  // 動畫相關
  mainNeedAnimation: true,
  isNeedNprogress: true,
  // 登入 & 權限
  isNeedLogin: true,
  permissionMode: 'roles',
  tmpToken: 'tmp_token',  // isNeedLogin 為 false 時，設置 dev token
  // 其他設定
  openProdMock: true,  // 其他環境下 是否可使用 mock 數據
  errorLog: [],  // 定義哪個環境下會收集錯誤訊息 ['prod','test','dev']
  delWindowHeight: '210px',  // table 的動態高度
  viteBasePath: './',
  // 預設樣式
  defaultLanguage: 'zhTW',
  defaultTheme: 'base-theme',
  defaultSize: 'default',
}

export default settings
