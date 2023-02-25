import { ref, computed } from "vue";

const data = ref(null);

const Content = {
  set(content) {
    data.value = content;
  },
  reset() {
    data.value = null;
  },
  get: computed(() =>
    data.value && data.value.content ? data.value.content : null
  ),
};

export default Content;
