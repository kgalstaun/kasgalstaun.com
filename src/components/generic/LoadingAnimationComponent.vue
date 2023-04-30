<template>
  <span>{{ animatedText }}</span>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Typewriter from "@/helpers/TypewriterHelper";
import TypewriterEnums from "@/enums/TypewriterEnums";

let dots = "...";
let animatedText = ref("");

onMounted(() => {
  Typewriter.startAnimation(animatedText, dots, {
    speed: TypewriterEnums.SPEED.SLOW,
    loop: true,
  });
});
</script>

<style lang="scss" scoped>
span {
  font-size: 5rem;
}
</style>
