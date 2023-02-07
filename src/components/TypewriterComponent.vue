<template>
  {{ animatedText }}
</template>

<script>
import { ref, onMounted } from "vue";
import TimeOutHelper from "@/helpers/TimeOutHelper.js";

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
        await TimeOutHelper.createCustomTimeout(70);
        animatedText.value = animatedText.value + character;
      }
    }
    return {
      animatedText,
    };
  },
};
</script>
