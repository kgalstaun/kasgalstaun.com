<template>
  <div class="h-screen p-lg flex justify-center items-end">
    <div class="header-wrapper">
      <HeaderComponent />
    </div>
    <ArrowComponent v-if="arrowConfig" :config="arrowConfig" />
  </div>
</template>

<script setup>
import HeaderComponent from "@/components/landing-page/HeaderComponent";
import ArrowComponent from "@/components/generic/ArrowComponent";
import ArrowEnums from "@/enums/ArrowEnums";
import ElementEnums from "@/enums/ElementEnums";

const arrowConfig = {
  elementRef: { section: ElementEnums.CONTENT, value: 0 },
  direction: ArrowEnums.DIRECTION.DOWN,
  size: ArrowEnums.SIZE.LG,
};
</script>

<style lang="scss" scoped>
.header-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
