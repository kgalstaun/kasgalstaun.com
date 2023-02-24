import { ref, computed } from "vue";

const data = ref(null);

function setContent(content) {
  data.value = content;
}

function resetContent() {
  data.value = null;
}

const getContent = computed(() =>
  data.value && data.value.content ? data.value.content : null
);

export { setContent, resetContent, getContent };
