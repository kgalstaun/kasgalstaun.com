<template>
  <div
    :style="{ opacity: arrowOpacity }"
    :class="['arrow', config?.direction, config?.size]"
    @click="scrollDownByViewportHeight()"
  >
    {{ arrow }}
  </div>
</template>

<script setup>
import { defineProps, onMounted, onUnmounted, ref } from "vue";

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

function scrollDownByViewportHeight() {
  window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
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
  color: $color-white;
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
