<template>
  <header
    class="landing-page-wrapper flex flex-col items-center justify-center"
  >
    <h1 class="m-auto text-8xl p-md lowercase">
      <TypewriterComponent :text="headerText"></TypewriterComponent>
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
import Meta from "@/state/Meta";
import ScrollEvent from "@/events/ScrollEvent";
import ArrowEnums from "@/enums/ArrowEnums";
import ElementEnums from "@/enums/ElementEnums";

onMounted(() => {
  startBlinkingAnimation(arrowBlinkSpeed);
});

const arrowBlinkSpeed = 550;
const arrowOpacityWeak = "20%";
const arrowOpacityFull = "100%";

let arrowStyling = ref(`${ArrowEnums.DIRECTION.DOWN} ${ArrowEnums.SIZE.LG}`);
let arrowOpacity = ref(arrowOpacityWeak);
let arrowVisibility = ref("visibile");
let arrowShowAndHideInterval;
const headerText = Meta.getHeader;

function arrowClick() {
  clearInterval(arrowShowAndHideInterval);
  arrowVisibility.value = "hidden";
  ScrollEvent.emit(ElementEnums.MAIN);
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
