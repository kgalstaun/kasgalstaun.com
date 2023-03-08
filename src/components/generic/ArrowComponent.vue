<template>
  <div
    :style="{ opacity: arrowOpacity }"
    :class="['arrow', config?.direction, config?.size]"
    @click="arrowClick(config?.elementRef)"
  >
    {{ arrow }}
  </div>
</template>

<script setup>
import { defineProps, onMounted, onUnmounted, ref } from "vue";
import ScrollEvent from "@/events/ScrollEvent";

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  config: Object,
});
const arrow = ">";
const arrowOpacityWeak = "10%";
const arrowOpacityFull = "40%";

let arrowBlinkSpeed = 550;
let arrowOpacity = ref(arrowOpacityWeak);
let arrowShowAndHideInterval;

onMounted(() => {
  if (!props.config) {
    return;
  }
  startBlinkingAnimation();
});

onUnmounted(() => {
  clearInterval(arrowShowAndHideInterval);
});

function arrowClick(elementRef) {
  if (!elementRef) {
    return;
  } else {
    ScrollEvent.emit(elementRef);
  }
}

function startBlinkingAnimation() {
  arrowBlinkSpeed = props.config.blinkSpeed
    ? props.config.blinkSpeed
    : arrowBlinkSpeed;

  arrowShowAndHideInterval = setInterval(() => {
    arrowOpacity.value == arrowOpacityWeak
      ? (arrowOpacity.value = arrowOpacityFull)
      : (arrowOpacity.value = arrowOpacityWeak);
  }, arrowBlinkSpeed);
}
</script>

<style lang="scss" scoped>
.arrow {
  display: block;
  color: white;
  cursor: pointer;
  line-height: 5rem;

  &-down {
    transform: rotate(90deg) translateY(25%);
  }
  &-lg {
    font-size: 8rem;
  }
}
</style>
