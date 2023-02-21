<template>
  <header
    class="landing-page-wrapper flex flex-col items-center justify-center"
  >
    <h1 class="m-auto text-8xl p-md lowercase">
      <TypewriterComponent :text="getHeaderText"></TypewriterComponent>
    </h1>
    <div class="mb-lg">
      <ArrowComponent
        @click="arrowClick"
        :style="{ opacity: arrowOpacity, visibility: arrowVisibility }"
        :arrowStyling="arrowStyling"
      />
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from "vue";
import ArrowComponent from "@/components/ArrowComponent.vue";
import TypewriterComponent from "@/components/TypewriterComponent.vue";
import { getHeaderText } from "@/state/metaDataState";
import arrowConfig from "@/enums/arrowConfig.js";

onMounted(() => {
  startBlinkingAnimation(arrowBlinkSpeed);
});

const arrowBlinkSpeed = 550;
const arrowOpacityWeak = "20%";
const arrowOpacityFull = "100%";

let arrowStyling = ref(`${arrowConfig.DIRECTION.DOWN} ${arrowConfig.SIZE.LG}`);
let arrowOpacity = ref(arrowOpacityWeak);
let arrowVisibility = ref("visibile");
let arrowShowAndHideInterval;
const main = ref(null);

function arrowClick() {
  clearInterval(arrowShowAndHideInterval);
  arrowVisibility.value = "hidden";
  main.value?.scrollIntoView({ behavior: "smooth" });
}

function startBlinkingAnimation(blinkSpeed) {
  arrowShowAndHideInterval = setInterval(() => {
    arrowOpacity.value == arrowOpacityWeak
      ? (arrowOpacity.value = arrowOpacityFull)
      : (arrowOpacity.value = arrowOpacityWeak);
  }, blinkSpeed);
}
</script>

<style lang="scss" scoped>
header {
  height: 100vh;
}
h1 {
  text-align: center;
}
</style>
