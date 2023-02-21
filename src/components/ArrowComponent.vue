<template>
  <div :class="['arrow', arrowStyling]">{{ arrow }}</div>
</template>

<script setup>
import { defineProps } from "vue";
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  arrowStyling: String,
});
const arrow = ">";
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
