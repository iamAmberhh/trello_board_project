<template>
  <div
    class="sidebar-logo-container"
    :class="{ collapse: collapse }"
  >
    <transition
      name="sidebar-logo-fade"
    >
      <router-link
        class="sidebar-logo-link"
        to="/"
      >
      <div
        v-if="sidebar.show"
        class="rowSC mt-3 ms-2"
      >
        <img
          src="@/assets/img/amberhh_logo.png"
          alt="logo"
          class="sidebar-logo"
        />
      </div>
        <img
          v-else
          src="@/assets/img/small_logo.png"
          alt="small logo"
          class="sidebar-logo"
        />
      </router-link>
    </transition>
  </div>
</template>

<script setup lang="ts">
const { sidebar } = storeToRefs(useBasicStore())
 
defineProps({
  collapse: {
    type: Boolean,
    required: true
  }
})
</script>

<style lang="scss">
  .sidebar-logo-container {
    position: relative;
    width: 100%;
    // height: 70px;
    object-fit: cover;
    padding: 10px;
    padding-left: 14px;
    line-height: 50px;
    text-align: left;
    background-color: #4a4e58;
    color: white;
    & .sidebar-logo-link {
      height: 100%;
      width: 100%;
      & .sidebar-logo {
        width:150px;
        object-fit: contain;
        vertical-align: middle;
      }
    }
    &.collapse {
      height: 50px;
      padding: 5px;
      padding-left: 10px;
      .sidebar-logo {
        margin-right: 0;
        width:35px;
        
      }
    }
  }
</style>
