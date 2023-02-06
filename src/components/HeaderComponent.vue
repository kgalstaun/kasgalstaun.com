<template>
  <header class="flex flex-row items-center justify-center">
    <router-link to="/">
      <h1 class="cursor-pointer text-9xl p-md lowercase">
        <TypewriterComponent :text="text"></TypewriterComponent>
      </h1>
    </router-link>
  </header>
</template>

<script>
import TypewriterComponent from "@/components/TypewriterComponent.vue";

export default {
  props: {
    text: String,
  },
  components: { TypewriterComponent },
};
</script>

<style lang="scss" scoped>
h1 {
  line-height: 3.2rem;
  color: white;
}
header {
  height: 100vh;
}
</style>
