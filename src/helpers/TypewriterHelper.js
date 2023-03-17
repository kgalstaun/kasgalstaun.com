import TimeOutHelper from "@/helpers/TimeOutHelper.js";

const Typewriter = {
  async startAnimation(animatedText, originalText, speed, index) {
    let text = originalText;
    let textArray = text.replace(/ /g, " ").split("");

    for (const character of textArray) {
      await TimeOutHelper.startTimeout(speed);
      if (index >= 0) {
        animatedText.value[index] = animatedText.value[index] + character;
      } else {
        animatedText.value = animatedText.value + character;
      }
    }
  },
};

export default Typewriter;
