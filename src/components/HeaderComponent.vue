<template>
  <header>
    <h1 class="text-9xl p-md lowercase">
      <TypewriterComponent :text="getHeaderText"></TypewriterComponent>
    </h1>
  </header>
</template>

<script>
import { getHeaderText } from "@/state/metaDataState";

import TypewriterComponent from "@/components/TypewriterComponent.vue";

export default {
  components: { TypewriterComponent },
  setup() {
    return { getHeaderText };
  },
};
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}
</style>
