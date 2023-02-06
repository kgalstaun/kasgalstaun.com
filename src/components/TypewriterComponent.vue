<template>
  <div>{{ animatedText }}</div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  props: {
    text: String,
  },
  setup(props) {
    onMounted(() => {
      startTypewriteAnimation();
    });

    let animatedText = ref("");

    async function startTypewriteAnimation() {
      let text = props.text;
      let textArray = text.replace(/ /g, " ").toLowerCase().split("");

      for (const character of textArray) {
        await createCustomTimeout(0.07);
        animatedText.value = animatedText.value + character;
      }
    }

    function createCustomTimeout(seconds) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, seconds * 1000);
      });
    }
    return {
      animatedText,
    };
  },
};
</script>
