<template>
  <header>
    <h1 v-if="headerText">
      <TypewriterComponent :text="headerText"></TypewriterComponent>
    </h1>
  </header>
</template>

<script setup>
import TypewriterComponent from "@/components/TypewriterComponent.vue";
import Meta from "@/data/Meta";

const headerText = Meta.getHeader;
</script>

<style lang="scss" scoped>
h1 {
  font-size: 6.5rem;
  text-align: center;
}
</style>
