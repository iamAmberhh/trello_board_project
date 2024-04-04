<template>
  <component
    :is="type"
    v-bind="linkProps(to)"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { isExternal } from '@/hooks/use-layout'

const props = defineProps({
  to: { type: String, required: true }
})

// 判斷是否為外部連結 true 使用<a/>標籤 false 使用<router-link/>
const type = computed(() => {
  if (isExternal(props.to)) return 'a'
  return 'router-link'
})

// 判斷是否為外部連結 true 使用<a/>標籤跳轉 false 使用當前路徑
const linkProps = (to) => {
  if (isExternal(props.to)) {
    return {
      href: to,
      target: '_blank',
      rel: 'noopener'
    }
  }
  return { to }
}
</script>
