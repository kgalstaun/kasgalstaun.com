<template>
  <header class="flex flex-row items-center justify-center">
    <router-link to="/">
      <h1 class="cursor-pointer text-9xl p-md lowercase">
        <slot></slot>
      </h1>
    </router-link>
  </header>
</template>

<style lang="scss" scoped>
h1 {
  line-height: 3.2rem;
  color: white;
}
header {
  height: 100vh;
}
</style>
