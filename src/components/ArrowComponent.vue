<template>
  <div :class="['arrow', styling]" @click="arrowClick()">
    {{ arrow }}
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import ScrollEvent from "@/events/ScrollEvent";

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  styling: String,
  elementRef: String,
});
const arrow = ">";

function arrowClick() {
  if (!props.elementRef) {
    return;
  } else {
    ScrollEvent.emit(props.elementRef);
  }
}
</script>

<style lang="scss" scoped>
.arrow {
  color: white;
  cursor: pointer;

  &-down {
    transform: rotate(90deg);
  }
  &-lg {
    scale: 7;
  }
}
</style>
