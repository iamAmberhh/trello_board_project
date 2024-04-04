<template>
  <el-config-provider :locale="lang[language]" namespace="el">
    <router-view />
  </el-config-provider>
</template>

<script setup lang="ts" name="App">
import zhTW from 'element-plus/es/locale/lang/zh-tw'
import en from 'element-plus/es/locale/lang/en'
import { storeToRefs } from 'pinia/dist/pinia'
import { useRoute } from 'vue-router'
import { useBasicStore } from '@/store/basic'
import { useSessionStore } from '@/store/session'
import { useConfigStore } from '@/store/config'

const lang = { en, zhTW }
const { settings } = storeToRefs(useBasicStore())
const { language } = storeToRefs(useConfigStore())
const route = useRoute()

onBeforeMount(() => {
  // set tmp token when setting isNeedLogin false
  if (!settings.value.isNeedLogin) {
    const { setToken } = useSessionStore
    setToken(settings.value.tmpToken)
  }
})

onMounted(() => {
  const { setLanguage, language } = useConfigStore()
  setLanguage(language, route.meta?.title)
})
</script>

<style lang="scss">
#nprogress .bar {
  background: var(--el-color-primary) ;
}
</style>
