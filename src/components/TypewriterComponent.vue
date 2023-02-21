<template>
  {{ animatedText }}
</template>

<script setup>
import { ref, onMounted, defineProps } from "vue";
import TimeOutHelper from "@/helpers/TimeOutHelper.js";

const props = defineProps({
  text: String,
});

onMounted(() => {
  startTypewriteAnimation();
});

let animatedText = ref("");

async function startTypewriteAnimation() {
  let text = props.text;
  let textArray = text.replace(/ /g, " ").toLowerCase().split("");

  for (const character of textArray) {
    await TimeOutHelper.createCustomTimeout(70);
    animatedText.value = animatedText.value + character;
  }
}
</script>
