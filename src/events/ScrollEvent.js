import { ref } from "vue";

const element = ref(null);
const ScrollEvent = {
  emit(scrollElement) {
    if (element.value) element.value = null;
    element.value = scrollElement;
  },
  listen: element,
};

export default ScrollEvent;
