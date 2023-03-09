<template>
  <header>
    <h1 v-if="animatedText">
      {{ animatedText }}
    </h1>
  </header>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Typewriter from "@/helpers/TypewriterHelper";
import Meta from "@/data/Meta";

onMounted(() => {
  Typewriter.startAnimation(animatedText, Meta.getHeader.value);
});

let animatedText = ref("");
</script>

<style lang="scss" scoped>
h1 {
  font-size: 6.2rem;
  text-align: center;
}
</style>
