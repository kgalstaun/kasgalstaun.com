<template>
  <header v-if="animatedText">
    <h1 class="real">
      {{ animatedText }}
    </h1>
    <h1 class="pseudo">
      {{ Meta.getHeader.value }}
    </h1>
  </header>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Typewriter from "@/helpers/TypewriterHelper";
import TypewriterEnums from "@/enums/TypewriterEnums";
import Meta from "@/data/Meta";

onMounted(() => {
  startAnimation();
});

async function startAnimation() {
  Typewriter.startAnimation(
    animatedText,
    Meta.getHeader.value,
    TypewriterEnums.SPEED.NORMAL
  );
}

let animatedText = ref("");
</script>

<style lang="scss" scoped>
h1 {
  font-size: 6.2rem;
  text-align: center;

  &.pseudo {
    opacity: 0;
  }

  &.real {
    position: absolute;
  }

  @media screen and (max-width: 1200px) {
    font-size: 7.2rem;
  }

  @media screen and (max-width: 576px) {
    font-size: 5.2rem;
  }
}
</style>
