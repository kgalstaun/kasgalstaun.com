import { ref, computed } from "vue";

const header = ref(null);
const footer = ref(null);

const Meta = {
  set(headerText, footerText) {
    header.value = headerText;
    footer.value = footerText;
  },
  getHeader: computed(() => header.value),
  getFooter: computed(() => footer.value),
};

export default Meta;
