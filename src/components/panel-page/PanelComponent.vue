<template>
  <div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front flex items-center justify-center">
        <div class="mb-lg panel-text-wrapper block">
          <h1 class="m-auto">{{ panel.title }}</h1>
          <ul v-if="panel.role || panel.period">
            <li>{{ panel.role }}</li>
            <li>{{ panel.period }}</li>
          </ul>
        </div>
      </div>
      <div class="flip-card-back p-md">
        <div class="panel-text-wrapper" v-html="panel.text.html"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  panel: Object,
});
</script>

<style scoped lang="scss">
// Flip card effect by W3Schools: https://www.w3schools.com/howto/howto_css_flip_card.asp
.flip-card {
  background-color: transparent;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */

  @media screen and (min-width: $screen-size-sm) {
    display: flex;
    justify-content: center;
  }
}

/* This container is needed to position the front and back side */
.flip-card-inner {
  position: relative;

  width: 100%;

  @media screen and (min-width: $screen-size-sm) {
    width: 80%;
  }

  @media screen and (min-width: $screen-size-md) {
    width: 60%;
  }

  @media screen and (min-width: $screen-size-lg) {
    width: 28rem;
  }

  @media screen and (min-width: $screen-size-xl) {
    width: 35rem;
  }

  height: 65vh;

  @media screen and (min-width: $screen-size-lg) {
    height: 60vh;
  }
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

/* Do an horizontal flip when you move the mouse over the flip box container */
.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

/* Position the front and back side */
.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
  border-radius: 0.3rem;
}

/* Style the front side (fallback if image is missing) */
.flip-card-front {
  background-color: rgba(255, 255, 255, 0.335);
}

/* Style the back side */
.flip-card-back {
  background-color: rgba(255, 255, 255, 0.335);
  transform: rotateY(180deg);
}

li,
h1 {
  text-transform: lowercase;
}
</style>
