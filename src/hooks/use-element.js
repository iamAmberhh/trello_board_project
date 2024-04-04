import { ElMessageBox, ElNotification } from 'element-plus'
export const useElement = () => {
  // 正數(+小數點)
  const upZero = (rule, value, callback, msg) => {
    // if (!value) {
    //   callback(new Error(`${msg}為必填`))
    // }
    if (/^(0*(?:[1-9]\d*|0)\.\d{1,3}|[1-9]\d*)$/.test(value)) {
      callback()
    } else {
      callback(new Error(`${msg}須大於零(小數點以下三位)`))
    }
  }

  // 正整數（包括0）
  const zeroInt = (rule, value, callback, msg) => {
    if (!value) {
      callback(new Error(`${msg}為必填`))
    }
    if (/^\+?[0-9]\d*$/.test(value)) {
      callback()
    } else {
      callback(new Error(`${msg}格式錯誤`))
    }
  }

  // Email
  const email = (rule, value, callback, msg) => {
    if (!value) {
      callback(new Error(`${msg}為必填`))
    }
    if ( /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value)) {
      callback()
    } else {
      callback(new Error(`${msg}格式錯誤`))
    }
  }
  // 密碼
  const password = (rule, value, callback, msg) => {
    if (!value) {
      callback(new Error(`${msg}為必填`))
    }
    if (/^.{6,}$/.test(value)) {
      callback()
    } else {
      callback(new Error(`${msg}不得小於6個字`))
    }
  }
  // 密碼 非必填
  const unnecessaryPassword = (rule, value, callback, msg) => {
    if (value !== ''){
      if (/^.{6,}$/.test(value)) {
        callback()
      } else {
        callback(new Error(`${msg}不得小於6個字`))
      }
    }
  }
  // 統一編號
  const tax = (rule, value, callback, msg) => {
    if (!value) {
      callback(new Error(`${msg}為必填`))
    }
    if ( /^[0-9]{8}$/.test(value)) {
      callback()
    } else {
      callback(new Error(`${msg}格式錯誤`))
    }
  }

  const state = reactive({
    // 表單驗證規則
    formRules: {
      //非空
      isNull: (msg) => [{ required: false, message: `${msg}`, trigger: 'blur' }],
      isNotNull: (msg) => [{ required: true, message: `${msg}`, trigger: 'blur' }],
      // 正整数
      upZero: (msg) => [
        { required: true, validator: (rule, value, callback) => upZero(rule, value, callback, msg), trigger: 'blur' }
      ],
      // 正整数（包括0）
      zeroInt: (msg) => [
        { required: true, validator: (rule, value, callback) => zeroInt(rule, value, callback, msg), trigger: 'blur' }
      ],
      email: (msg) => [
        { required: true, validator: (rule, value, callback) => email(rule, value, callback, msg), trigger: 'blur' }
      ],
      password: (msg) => [
        { required: true, validator: (rule, value, callback) => password(rule, value, callback, msg), trigger: 'blur' }
      ],
      unnecessaryPassword: (msg) => [
        { required: false, validator: (rule, value, callback) => unnecessaryPassword(rule, value, callback, msg), trigger: 'blur' }
      ],
      //統一編號
      tax: (msg) => [
        { required: true, validator: (rule, value, callback) => tax(rule, value, callback, msg), trigger: 'blur' }
      ]
    },
    // 日期相關
    datePickerOptions: {
      // 選擇今天以後的日期(含今天)
      disabledDate: (time) => {
        return time.getTime() < Date.now() - 86400000
      }
    },
  })
  return {
    ...toRefs(state)
  }
}

// 彈跳通知 (message：通知的内容 / type：通知類型)
export const elNotification = (message, type) => {
  ElNotification({
    showClose: true,
    message: message || '',
    type: type || 'success',
    center: false
  })
}

// 刪除確認框(沒有取消按鈕)，會 return Promise
export const elConfirmNoCancelBtn = (title, message) => {
  return ElMessageBox({
    message: message || '確定要刪除嗎',
    title: title || '確認',
    customClass:'message-box-style',
    confirmButtonText: '確定',
    confirmButtonClass:'el-button--info',
    showCancelButton: false,
  })
}

// 確認框 會 return Promise
export const elConfirm = (title, message) => {
  return ElMessageBox({
    message: message || '確定要刪除嗎',
    title: title || '確認',
    confirmButtonText: '確定',
    cancelButtonText: '取消',
    type: 'warning'
  })
}