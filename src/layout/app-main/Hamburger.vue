<template>
  <div
    style="padding: 0 12px"
    @click="toggleClick"
  >
    <svg-icon
      icon-class="hamburger"
      class="hamburger-style"
    />
  </div>
</template>

<script setup>
const emit = defineEmits(['toggleClick'])

const toggleClick = () => {
  emit('toggleClick')
}
</script>

<style scoped lang="scss">
.hamburger-style {
  color: var(--hamburger-color);
  width: var(--hamburger-width);
  height: var(--hamburger-height);
  cursor: pointer;
}
</style>
