<template>
  <div
    class="login-container columnCC"
  >
    <el-form
      ref="refLoginForm"
      class="login-form"
      :model="submitFormRef"
      :rules="formRules"
    >
      <h1
        class="login-title"
      >
        Welcome Back !
      </h1>
      <span
        class="login-message"
      >
        Login to continue using Board.
      </span>
      <el-form-item
      class="mt-10"
        prop="keyword"
        :rules="formRules.isNotNull('Email為必填')"
      >
        <el-input
          v-model="submitFormRef.keyword"
          placeholder="Email"
        >
          <template
            #prepend
          >
            <span>
              <svg-icon icon-class="user" />
            </span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item
        prop="password"
        :rules="formRules.isNotNull('Password為必填')"
      >
        <el-input
          key="password"
          v-model="submitFormRef.password"
          type="password"
          name="password"
          placeholder="Password"
          @keyup.enter="handleLogin"
        >
          <template
            #prepend
          >
            <span>
              <svg-icon icon-class="password" />
            </span>
          </template>
        </el-input>
      </el-form-item>
      <div
        class="tip-message"
      >
        {{ loginTipMessageRef }}
      </div>
        <el-button
          :loading="submitLoadingRef"
          type="primary"
          size="default"
          class="mb-4"
          @click.prevent="handleLogin"
        >
          Log In
        </el-button>
    </el-form>
  </div>
</template>

<script setup>
import { elNotification, useElement } from '@/hooks/use-element'
const router = useRouter()
const route = useRoute()
const formRules = useElement().formRules

// ref元件
const refLoginForm = ref(undefined)
const refForgetPassword = ref(undefined)
// 取資料
const version = ref(undefined)
const submitFormRef = ref({})
const forgetPasswordDialogRef = ref(false)
const forgetPasswordForm = ref({
  email: null
})
// Loading
const submitLoadingRef = ref(false)
const forgetPasswordLoadingRef = ref(false)
// 提示字
const loginTipMessageRef = ref('')
// 取url query
const state = reactive({
  otherQuery: {},
  redirect: undefined
})


// 取url query
const getOtherQuery = (query) => {
  return Object.keys(query).reduce((acc, cur) => {
    if (cur !== 'redirect') {
      acc[cur] = query[cur]
    }
    return acc
  }, {})
}

watch(
  () => route.query,
  (query) => {
    if (query) {
      state.redirect = query.redirect
      state.otherQuery = getOtherQuery(query)
    }
  },
  { immediate: true }
)

const handleLogin = () => {
  refLoginForm.value.validate((valid) => {
    submitLoadingRef.value = true
    if (valid) {
      loginFunction()
    }
    else submitLoadingRef.value = false
  })
}

const loginFunction = () => {
  elNotification('登入成功')
  router.push({ 
    path: state.redirect || '/',
    query: state.otherQuery 
  })
    submitLoadingRef.value = false

}
</script>

<style lang="scss" scoped>
$dark_gray: #3c4b64;

.login-container {
  height: 100vh;
  width: 100%;
  background-color: #ebedef;

  // css 樣式重製，放在login-container內避免全局汙染
  .login-form {
    margin-bottom: 20vh;
    width: 90%;
    padding: 44px;
    text-align: center;
    @media (min-width: 768px) {
      width: 600px;
    }
  }

  .login-title {
    margin-bottom: 8px;
    font-size: 20px;
    color: $dark_gray;
    font-weight: bold;
  }

  .login-message {
    color: #768192;
    margin-bottom: 14px;
  }

  .el-input input {
    background: transparent;
    border: 0px;
    -webkit-appearance: none;
    border-radius: 0px;
    padding: 10px 5px 10px 15px;
    color: $dark_gray;
    height: 42px;
    caret-color: $dark_gray;
  }
}
</style>
