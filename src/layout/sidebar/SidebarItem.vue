<template>
  <template
    v-if="!item.hidden"
  >
    <template
      v-if="showSidebarItem(item.children, item)"
    >
      <!-- 判斷巢狀menu -> 沒有其他子路由要顯示 -->
      <Link
        v-if="onlyOneChild.meta"
        :to="resolvePath(onlyOneChild.path)"
      >
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <MenuIcon
            :meta="onlyOneChild.meta || item.meta"
          />
          <template
            #title
          >
            {{ langTitle(onlyOneChild.meta?.title) }}
          </template>
        </el-menu-item>
      </Link>
    </template>
    <!-- 判斷巢狀menu -> 要顯示其他子路由 需用sub menu -->
    <el-sub-menu
      v-else
      :index="resolvePath(item.path)"
    >
      <template
        v-if="item.meta"
        #title
      >
        <MenuIcon
          :meta="item.meta"
        />
        <span>
          {{ langTitle(item.meta.title) }}
        </span>
      </template>
      <!-- 巢狀內部會再跑一次自己的 sidebaritem 邏輯 -->
      <SidebarItem
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
      />
    </el-sub-menu>
  </template>
</template>

<script setup lang="ts">
import { resolve } from 'path-browserify'
import Link from './Link.vue'
import MenuIcon from './MenuIcon.vue'
import type { RouteRawConfig } from '~/basic'
import { isExternal } from '@/hooks/use-layout'
import { langTitle } from '@/hooks/use-common'

const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  isNest: {
    type: Boolean,
    default: false
  },
  basePath: {
    type: String,
    default: ''
  }
})

const onlyOneChild = ref()
const showSidebarItem = (children = [], parent) => {
  const showingChildren = children.filter((item: RouteRawConfig) => {
    if (item.hidden) {
      return false
    } else {
      return true
    }
  })
  if (showingChildren.length === 1 && !parent?.alwaysShow) {
    onlyOneChild.value = showingChildren[0]
    return true
  }
  // 沒有子路由要顯示
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, path: '', noChildren: true }
    return true
  }
  return false
}

// 判斷是否為外部連結
const resolvePath = (routePath) => {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }
  return resolve(props.basePath, routePath)
}
</script>
