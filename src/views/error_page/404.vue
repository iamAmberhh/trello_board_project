<template>
  <div
    class="wscn-http404-container"
  >
    <div
      class="wscn-http404"
    >
      <div
        class="error-message"
      >
        <h1
          class="error-message__oops"
        >
          Oops!
        </h1>
        <p
          class="error-message__headline"
        >
          找不到此頁面
        </p>
        <p
          class="error-message__info"
        >
          請檢查您輸入的網址是否正確
          <br />
          或點擊下方按鈕返回首頁
        </p>
        <router-link
          to="/"
        >
          <el-button
            type="primary"
            class="error-message__return-home"
          >
            回到概覽
          </el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wscn-http404-container {
  transform: translate(-50%, -50%);
  position: absolute;
  top: 40%;
  left: 70%;
    @media  (min-width: 996px) {
      left: 50%;
    }
}
.wscn-http404 {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  .error-message {
    width: 300px;
    margin: 30px 50px;
    overflow: hidden;
    &__oops {
      font-size: 60px;
      color: #484848;
      font-weight: bold;
      line-height: 40px;
      opacity: 0;
      margin-bottom: 40px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
    }
    &__headline {
      font-size: 20px;
      line-height: 24px;
      color: #222;
      font-weight: bold;
      opacity: 0;
      margin-bottom: 10px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.1s;
      animation-fill-mode: forwards;
    }
    &__info {
      line-height: 21px;
      color: grey;
      opacity: 0;
      margin-bottom: 30px;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.2s;
      animation-fill-mode: forwards;
    }
    &__return-home {
      display: block;
      float: left;
      opacity: 0;
      font-size: 14px;
      cursor: pointer;
      animation-name: slideUp;
      animation-duration: 0.5s;
      animation-delay: 0.3s;
      animation-fill-mode: forwards;
    }
    @keyframes slideUp {
      0% {
        transform: translateY(60px);
        opacity: 0;
      }
      100% {
        transform: translateY(0);
        opacity: 1;
      }
    }
  }
  @media  (min-width: 996px) {
    flex-direction: row;
    .error-message{
      margin: 50px 0px;
    }
  }
}
</style>
