<template>
  <div
    ref="motivation"
    v-if="Motivation"
    class="h-screen p-lg flex flex-row justify-around items-start"
  >
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
    <div class="py-md px-xl mx-xl">side bar</div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import QueryService from "@/service/QueryService";
import MotivationQuery from "@/queries/MotivationQuery";
import Motivation from "@/data/Motivation";
import ScrollEvent from "@/events/ScrollEvent";
import ScrollHelper from "@/helpers/ScrollHelper";
import ElementEnums from "@/enums/ElementEnums";

const motivation = ref(null);
let loaded = ref(false);
let error = ref(false);

onMounted(() => {
  fetchMotivationData();
});

watch(
  ScrollEvent.listen,
  () => {
    const elementRef = ScrollEvent.listen.value;
    if (!elementRef) return;
    scrollToElement(elementRef);
  },
  { deep: true }
);

function scrollToElement(elementRef) {
  if (elementRef.section === ElementEnums.MOTIVATION) {
    ScrollHelper.scrollToElement(motivation.value);
  }
}

async function fetchMotivationData() {
  QueryService.fetch(MotivationQuery)
    .then((data) => {
      let motivationData = data.motivations[0];
      Motivation.value = motivationData;
      loaded.value = true;
    })
    .catch(() => (error.value = true));
}

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
