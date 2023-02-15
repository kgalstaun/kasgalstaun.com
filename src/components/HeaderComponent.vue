<template>
  <header
    class="landing-page-wrapper flex flex-col items-center justify-center"
  >
    <h1 class="m-auto text-9xl p-md lowercase">
      <TypewriterComponent :text="getHeaderText"></TypewriterComponent>
    </h1>
    <div class="mb-lg">
      <ArrowComponent
        @click="arrowClick"
        :style="{ visibility: arrowVisibility }"
        :class="{ 'cursor-pointer': arrowIsClickable }"
        :arrowStyling="arrowStyling"
      />
    </div>
  </header>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import ArrowComponent from "@/components/ArrowComponent.vue";
import TypewriterComponent from "@/components/TypewriterComponent.vue";
import { getHeaderText } from "@/state/metaDataState";
import arrowConfig from "@/enums/arrowConfig.js";

export default {
  components: { TypewriterComponent, ArrowComponent },
  setup() {
    onMounted(() => {
      startBlinkingAnimation();
    });

    let arrowStyling = ref(
      `${arrowConfig.DIRECTION.DOWN} ${arrowConfig.SIZE.LG}`
    );
    let arrowVisibility = ref("hidden");
    const arrowIsClickable = computed(() => {
      return arrowVisibility.value === "visible";
    });
    let arrowShowAndHideInterval;

    function arrowClick() {
      clearInterval(arrowShowAndHideInterval);
    }

    function startBlinkingAnimation() {
      arrowShowAndHideInterval = setInterval(() => {
        arrowVisibility.value == "hidden"
          ? (arrowVisibility.value = "visible")
          : (arrowVisibility.value = "hidden");
      }, 700);
    }

    return {
      arrowStyling,
      arrowVisibility,
      arrowClick,
      arrowIsClickable,
      getHeaderText,
    };
  },
};
</script>

<style lang="scss" scoped>
header {
  height: 100vh;
}
h1 {
  text-align: center;
}
</style>
