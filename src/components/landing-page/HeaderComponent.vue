<template>
  <header v-if="animatedText">
    <h1 class="real">
      {{ animatedText }}
    </h1>
    <h1 class="pseudo">
      {{ Header.getText.value }}
    </h1>
  </header>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Typewriter from "@/helpers/TypewriterHelper";
import TypewriterEnums from "@/enums/TypewriterEnums";
import Header from "@/data/Header";

onMounted(() => {
  Typewriter.startAnimation(animatedText, Header.getText.value, {
    speed: TypewriterEnums.SPEED.NORMAL,
  });
});

let animatedText = ref("");
</script>

<style lang="scss" scoped>
h1 {
  font-size: 5.2rem;
  text-align: center;

  &.pseudo {
    opacity: 0;
  }

  &.real {
    position: absolute;
  }

  @media screen and (min-width: $screen-size-sm) {
    font-size: 7.2rem;
  }

  @media screen and (min-width: $screen-size-xl) {
    font-size: 6.2rem;
  }
}
</style>
