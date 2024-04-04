<template>
  <div
    id="Sidebar"
    class="reset-menu-style"
  >
    <el-scrollbar>
    <el-affix
      :offset="0"
    >
      <Logo
        v-if="settings.sidebarLogo"
        :collapse="!sidebar.show"
      />
    </el-affix>
      <el-menu
        class="el-menu-vertical"
        :collapse="!sidebar.show"
        :default-active="activeMenu"
        :collapse-transition="false"
        mode="vertical"
        text-color="#fff"
        active-text-color="#1ca1c1"
        style="letter-spacing: 3px;"
      >
        <sidebar-item
          v-for="route in allRoutes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia/dist/pinia'
import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'

const routeInstance = useRoute()
const basicStore = useBasicStore()
const { setToggleSideBar } = basicStore
const { settings, allRoutes, sidebar, roles } = storeToRefs(useBasicStore())

const activeMenu = computed(() => {
  const { meta, path } = routeInstance
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})

const toggleSideBar = () => {
  setToggleSideBar()
}

</script>
<style lang="scss">
//fix open the item style issue
.el-menu-vertical {
  width: 256px;
  padding-top: 20px;
}
.reset-menu-style {
  border-right: 1px solid var(--side-bar-border-right-color);
}
</style>
