<template>
  <div class="motivation-letter">
    <div class="real p-lg">
      <div v-for="(paragraph, index) in Motivation.letter" :key="index">
        <p>{{ paragraph }}</p>
        <template v-if="isTheLastParagraph(index, Motivation.letter)">
          <br /><br />
        </template>
      </div>
    </div>
    <div class="pseudo p-lg">
      <div v-for="(paragraph, index) in Motivation.letter" :key="index">
        <p>{{ paragraph }}</p>
        <template v-if="isTheLastParagraph(index, Motivation.letter)">
          <br /><br />
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import Motivation from "@/data/Motivation";

function isTheLastParagraph(index, letter) {
  return index + 1 < letter.length;
}
</script>

<style lang="scss" scoped>
.motivation-letter {
  background-color: rgba(255, 255, 255, 0.335);
  border-radius: 0.3rem;
  max-width: 45vw;
  position: relative;

  p {
    padding: 0;
    font-size: 1.7rem;
  }

  .pseudo {
    opacity: 0;
  }

  .real {
    position: absolute;
  }
}
</style>
