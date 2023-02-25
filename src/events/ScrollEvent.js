import { ref, computed } from "vue";

const element = ref(null);

const ScrollEvent = {
  emit(scrollElement) {
    element.value = scrollElement;
  },
  listen: computed(() => element.value),
};

export default ScrollEvent;
