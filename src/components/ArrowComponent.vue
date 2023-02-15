<template>
  <div :class="['arrow', arrowStyling]">{{ arrow }}</div>
</template>

<script>
export default {
  props: {
    arrowStyling: String,
  },
  setup() {
    const arrow = ">";

    return {
      arrow,
    };
  },
};
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
