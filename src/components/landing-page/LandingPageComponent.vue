<template>
  <Transition>
    <div
      v-if="mounted"
      class="h-screen p-sm sm:p-lg flex justify-center items-end"
    >
      <div class="header-wrapper">
        <HeaderComponent />
      </div>
      <ArrowComponent v-if="arrowConfig" :config="arrowConfig" />
    </div>
  </Transition>
</template>

<script setup>
import { ref, onMounted } from "vue";
import HeaderComponent from "@/components/landing-page/HeaderComponent";
import ArrowComponent from "@/components/generic/ArrowComponent";
import ArrowEnums from "@/enums/ArrowEnums";
import ElementEnums from "@/enums/ElementEnums";

const mounted = ref(false);

onMounted(() => {
  mounted.value = true;
});

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
