import { ref, computed } from "vue";

const text = ref(null);

const Header = {
  set(newText) {
    text.value = newText;
  },
  getText: computed(() => text.value),
};

export default Header;
