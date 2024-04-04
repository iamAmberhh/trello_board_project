<template>
  <div
    class="app-main"
  >
    <router-view
      v-slot="{ Component }"
    >
      <transition
        v-if="settings.mainNeedAnimation"
        name="fade-transform"
        mode="out-in"
      >
        <component
          :is="Component"
          :key="key"
        />
      </transition>
    </router-view>
    <div
      class="fixed-footer"
    >
      <el-divider/>
      <el-row
        justify="center"
        class="p-5 pt-0"
      >
        本專案僅作為 side project 使用，無商業用途
      </el-row>
    </div>
  </div>
  <div
    v-show="showScrollBtnRef"
    class="scroll-top-btn"
  >
    <el-button
      :icon="Top"
      type="warning"
      circle
      @click="scrollToTop"
    />
  </div>
</template>

<script setup>
const { settings } = storeToRefs(useBasicStore())
import { Top } from '@element-plus/icons-vue'
import dayjs from 'dayjs'

const route = useRoute()
const key = computed(() => route.path)

const removeDeepChildren = (deepOldRouter) => {
  deepOldRouter.children?.forEach((fItem) => {
    useBasicStore().delCacheViewDeep(fItem.name)
  })
}

const showScrollBtnRef = ref(false)

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
})

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  showScrollBtnRef.value = scrollTop > 100;
}
</script>

<style scoped lang="scss">
.app-main {
  padding: var(--app-main-padding);
  padding-bottom: 100px;
  /*50 = navbar  */
  position: relative;
  // overflow: hidden;
  // background-color: #efeff0;
  background-color: #f1f6f9;
  min-height: calc(100dvh - 50px);
}
.show-tag-view {
  height: calc(
    100vh - #{var(--nav-bar-height)} - #{var(--tag-view-height)}
  ) !important;
}
.fixed-header + .app-main {
  padding-top: 50px;
}
.fixed-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  right:0;
  color:gray;
}
.scroll-top-btn{
  .el-button{
    padding: 10px
  }
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 200;
}
</style>
