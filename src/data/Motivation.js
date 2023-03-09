import { ref, computed } from "vue";

const state = ref([]);

const Motivation = computed({
  get() {
    return state.value;
  },
  set(motivation) {
    state.value = motivation;
  },
});

export default Motivation;
