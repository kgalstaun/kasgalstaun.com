<template>
  <div class="landing-page-wrapper flex flex-col items-center justify-center">
    <HeaderComponent class="m-auto" />
    <div class="mb-lg">
      <ArrowComponent
        @click="arrowClick"
        :style="{ visibility: arrowVisibility }"
        :class="{ 'cursor-pointer': arrowIsClickable }"
        :arrowStyling="arrowStyling"
      />
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import ArrowComponent from "@/components/ArrowComponent.vue";
import arrowConfig from "@/enums/arrowConfig.js";

export default {
  components: { HeaderComponent, ArrowComponent },
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
    };
  },
};
</script>

<style lang="scss" scoped>
.landing-page-wrapper {
  height: 100vh;
}
</style>
