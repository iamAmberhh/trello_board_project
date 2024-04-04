<template>
  <div>
    <div
      class="rowBC navbar pe-3"
    >
      <Hamburger
        v-if="sidebar.opened || sidebar.collapse"
        class="hamburger-container"
        @toggle-click="toggleSideBar"
      />
      <Hamburger
        v-if="sidebar.hide"
        @toggle-click="openSidebarDrawer"
      />
      <el-dropdown
        ref="dropdownMenu"
        trigger="click"
        size="medium"
      >
        <div
          class="avatar-wrapper"
        >
          <img
            src="@/assets/img/user.png"
            class="user-avatar"
          />
        </div>
        <template
          #dropdown
        >
          <el-dropdown-menu>
            <el-dropdown-item
              @click="signOut"
            >
              <el-icon><Unlock /></el-icon>
              {{ langTitle('Logout') }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    
  </div>
</template>

<script setup>
import Breadcrumb from './Breadcrumb.vue'
import Hamburger from './Hamburger.vue'
import { langTitle } from '@/hooks/use-common'
import { elNotification } from '@/hooks/use-element'

const basicStore = useBasicStore()
const sessionStore = useSessionStore()
const { sidebar, setToggleSideBar, setDrawerSidebar,showDrawerMenu } = basicStore

const configStore = useConfigStore()

const route = useRoute()
const router = useRouter()

const dropdownMenu = ref()
const dropdownMenuVisible = ref(false)


const showDropdown = () => {
  if (!dropdownMenu.value) return
  if (dropdownMenuVisible.value) {
    dropdownMenu.value.handleClose()
    dropdownMenuVisible.value = false
  } else {
    dropdownMenu.value.handleOpen()
    dropdownMenuVisible.value = true
  }
}

const openSidebarDrawer = () => {
  setDrawerSidebar()
}

const toggleSideBar = () => {
  setToggleSideBar()
}

const handleLanguageCommand = (command) => {
  configStore.setLanguage(command)
  const route = router.currentRoute
  document.title = langTitle(route.value.meta?.title) // i18 page title
}

const signOut = () => {
  basicStore.resetState()
  sessionStore.resetState()
  router.push('/login')
  elNotification('登出成功')
}
</script>

<style lang="scss" scoped>
  .navbar {
    min-height: var(--nav-bar-height);
    padding-top: 5px;
    padding-bottom: 5px;
    // height: var(--nav-bar-height);
    overflow: hidden;
    position: relative;
    background: var(--nav-bar-background);
    box-shadow: var(--nav-bar-box-shadow);
    z-index: 1;
  }

 .cursor-pointer{
  cursor: pointer;
 }
  .avatar-wrapper {
    margin-top: 5px;
    // position: relative;
    cursor: pointer;

    .user-avatar {
      cursor: pointer;
      width: 30px;
      height: 30px;
      border-radius: 10px;
      // margin-left: 20px;
      // display: none;
      // @media (min-width: 768px) {
      //   display: block;
      // }
    }

    .el-icon-caret-bottom {
      cursor: pointer;
      position: absolute;
      right: -20px;
      top: 25px;
      font-size: 12px;
    }
  }

  //center-title
  .heardCenterTitle {
    text-align: center;
    position: absolute;
    top: 50%;
    left: 46%;
    font-weight: 600;
    font-size: 20px;
    transform: translate(-50%, -50%);
  }
</style>
