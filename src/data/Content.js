import { ref, computed } from "vue";

const state = ref(null);

const Content = computed({
  get() {
    return state.value;
  },
  set(content) {
    state.value = content;
  },
});

export default Content;
