<template>
  <el-breadcrumb
    class="app-breadcrumb"
    separator="/"
  >
    <transition-group
      name="breadcrumb"
    >
      <!--  根據router 產生麵包屑連結  -->
      <el-breadcrumb-item
        key="index"
      > 
        <router-link to="/">
          首頁
        </router-link>
      </el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="(item, index) in levelList"
        :key="item.path"
      >
        <span
          v-if="
            item.redirect === 'noRedirect' || index === levelList.length - 1
          "
          class="no-redirect"
        >
          {{ langTitle(item.meta?.title) }}
        </span>
        <a
          v-else
          @click.prevent="handleLink(item)"
        >
          {{ langTitle(item.meta?.title) }}
        </a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { compile } from 'path-to-regexp'
import type { RouterTypes } from '~/basic'
import { langTitle } from '@/hooks/use-common'

const levelList = ref()
const route = useRoute()

const getBreadcrumb = () => {
  // only show routes with has  meta.title
  const matched: RouterTypes = route.matched.filter((item) => item.meta?.title)
  levelList.value = matched.filter(
    (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false
  )
}

//頁面跳轉處理
const pathCompile = (path) => {
  const { params } = route
  const toPath = compile(path)
  return toPath(params)
}
const router = useRouter()
//如果有redirect就直接跳轉，没有就跳轉path
const handleLink = (item) => {
  const { redirect, path } = item
  if (redirect) {
    router.push(redirect)
    return
  }
  if (path) router.push(pathCompile(path))
}
// 監聽路由 更新麵包屑
watch(
  () => route.path,
  () => getBreadcrumb(),
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  
  .no-redirect {
    color: var(--breadcrumb-no-redirect);
    cursor: text;
  }
}
</style>
