<template>
  <div class="motivation-letter">
    <div class="real p-lg flex-col justify-center">
      <div v-for="(paragraph, index) in motivationLetterAnimation" :key="index">
        <p>{{ paragraph }}</p>
        <template v-if="isNotTheLastParagraph(index, Motivation.letter)">
          <br /><br />
        </template>
      </div>
    </div>
    <div class="pseudo p-lg">
      <div v-for="(paragraph, index) in Motivation.letter" :key="index">
        <p>{{ paragraph }}</p>
        <template v-if="isNotTheLastParagraph(index, Motivation.letter)">
          <br /><br />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Typewriter from "@/helpers/TypewriterHelper";
import TypewriterEnums from "@/enums/TypewriterEnums";
import TimeOutHelper from "@/helpers/TimeOutHelper.js";
import Motivation from "@/data/Motivation";

const motivationLetterAnimation = ref([]);

onMounted(() => {
  Motivation.value.letter.forEach(() => {
    motivationLetterAnimation.value.push("");
  });
  writeLetter();
});

async function writeLetter() {
  for (let [index, paragraph] of Motivation.value.letter.entries()) {
    await TimeOutHelper.startTimeout(222);
    await Typewriter.startAnimation(
      motivationLetterAnimation,
      paragraph,
      TypewriterEnums.SPEED.FAST,
      index
    );
  }
}

function isNotTheLastParagraph(index, letter) {
  return index + 1 < letter.length;
}
</script>

<style lang="scss" scoped>
.motivation-letter {
  background-color: rgba(255, 255, 255, 0.335);
  border-radius: 0.3rem;

  @media screen and (min-width: $screen-size-md) {
    max-width: 70vw;
  }

  @media screen and (min-width: $screen-size-lg) {
    max-width: 45vw;
  }

  position: relative;

  p {
    padding: 0;
    font-size: 1.6rem;
  }

  .pseudo {
    opacity: 0;
    max-width: 700px;
  }

  .real {
    position: absolute;
    max-width: 700px;
  }
}
</style>
