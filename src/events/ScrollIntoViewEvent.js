import { ref, computed } from "vue";

const element = ref(null);

const ScrollIntoViewEvent = {
  emit(scrollElement) {
    element.value = scrollElement;
  },
  listen: computed(() => element.value),
};

export default ScrollIntoViewEvent;
