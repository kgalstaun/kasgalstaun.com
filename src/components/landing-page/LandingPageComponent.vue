<template>
  <Transition>
    <div
      v-if="mounted"
      ref="headerWrapper"
      :style="{ height: dynamicHeight }"
      class="h-screen p-md lg:p-lg flex justify-center items-end"
    >
      <div class="header-component-wrapper">
        <HeaderComponent />
      </div>
      <ArrowComponent v-if="arrowConfig" :config="arrowConfig" />
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted, nextTick } from "vue";
import HeaderComponent from "@/components/landing-page/HeaderComponent";
import ArrowComponent from "@/components/generic/ArrowComponent";
import ArrowEnums from "@/enums/ArrowEnums";
import ElementEnums from "@/enums/ElementEnums";

const headerWrapper = ref(null);
const mounted = ref(false);
const dynamicHeight = ref("");

onMounted(() => {
  mounted.value = true;
  nextTick(() => {
    // This fixes the height on mobile with the url bar at the bottom
    updateLandingPageHeight();
  });
});

const arrowConfig = {
  elementRef: { section: ElementEnums.PANEL_PAGE_WRAPPER, value: 0 },
  direction: ArrowEnums.DIRECTION.DOWN,
  size: ArrowEnums.SIZE.LG,
};

function updateLandingPageHeight() {
  dynamicHeight.value = `${window.innerHeight}px`;
}
</script>

<style lang="scss" scoped>
.header-component-wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
