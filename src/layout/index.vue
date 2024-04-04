<template>
  <div
    :class="classObj"
    class="layout-wrapper"
  >
    <Sidebar
      v-if="settings.showLeftMenu"
      class="sidebar-container"
    />
    <el-drawer
      v-model="showDrawerMenu"
      direction="ltr"
      size="256px"
      :before-close="handleDrawerClose"
    >
      <Sidebar
        class="drawer-container"
      />
    </el-drawer>
    <div
      class="main-container"
    >
      <Navbar />
      <AppMain />
    </div>
  </div>
</template>

<script setup>
import { computed, defineComponent } from 'vue'
import Sidebar from './sidebar/index.vue'
import AppMain from './app-main/index.vue'
import Navbar from './app-main/Navbar.vue'
import { resizeHandler } from '@/hooks/use-layout'
const { sidebar, settings, setDrawerSidebar } = useBasicStore()


const classObj = computed(() => {
  return {
    collapseSidebar: sidebar.collapse,
    hideSidebar: sidebar.hide,
    drawerSidebar: sidebar.drawer
  }
})
resizeHandler()

const showDrawerMenu = ref(false)

watch(
  () => sidebar.drawer,
  (value) => {
    showDrawerMenu.value = sidebar.drawer
})

const handleDrawerClose = (done) => {
  setDrawerSidebar()
  done()
}
</script>

<style lang="scss" scoped>
.main-container {
  min-height: 100%;
  transition: margin-left var(--sideBar-switch-duration);
  // margin-left: var(--side-bar-width);
  margin-left: 256px;
  position: relative;
}
.sidebar-container {
  transition: width var(--sideBar-switch-duration);
  // width: var(--side-bar-width) !important;
  width: 256px;
  background-color: #4a4e58;
  height: 100%;
  position: fixed;
  font-size: 0;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  border-right: 0.5px solid var(--side-bar-border-right-color);
}
.collapseSidebar {
  .sidebar-container {
    width: 56px !important;
  }
  .main-container {
    margin-left: 56px !important;
  }
}
.hideSidebar {
  .sidebar-container {
    width: 0 !important;
  }
  .main-container {
    margin-left: 0;
  }
}
.drawer-container {
  transition: width var(--sideBar-switch-duration);
  width: 256px;
  background-color: #4a4e58;
  height: 100%;
  position: fixed;
  font-size: 0;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 1001;
  overflow: hidden;
  border-right: 0.5px solid var(--side-bar-border-right-color);
  .sidebar-container {
    width: 256px !important;
  }
  .main-container {
    margin-left: 0;
  }
}
</style>
