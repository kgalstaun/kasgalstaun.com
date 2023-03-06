<template>
  <header class="flex flex-col items-center justify-center">
    <h1 v-if="headerText" class="m-auto text-8xl p-md lowercase">
      <TypewriterComponent :text="headerText"></TypewriterComponent>
    </h1>
    <div v-if="arrowConfig" class="mb-lg">
      <ArrowComponent :config="arrowConfig" />
    </div>
  </header>
</template>

<script setup>
import ArrowComponent from "@/components/ArrowComponent.vue";
import TypewriterComponent from "@/components/TypewriterComponent.vue";
import Meta from "@/data/Meta";
import ArrowEnums from "@/enums/ArrowEnums";
import ElementEnums from "@/enums/ElementEnums";

const arrowConfig = {
  elementRef: ElementEnums.MAIN,
  direction: ArrowEnums.DIRECTION.DOWN,
  size: ArrowEnums.SIZE.LG,
};

const headerText = Meta.getHeader;
</script>

<style lang="scss" scoped>
header {
  height: 100vh;
}
h1 {
  text-align: center;
  transform: translateY(25%);
}
</style>
