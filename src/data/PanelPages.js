import { ref, computed } from "vue";

const state = ref(null);

const PanelPages = computed({
  get() {
    return state.value;
  },
  set(panelPages) {
    state.value = panelPages;
  },
});

export default PanelPages;
