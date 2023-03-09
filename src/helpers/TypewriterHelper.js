import TimeOutHelper from "@/helpers/TimeOutHelper.js";

const animationSpeed = 65;

const Typewriter = {
  async startAnimation(animatedText, originalText) {
    let text = originalText;
    let textArray = text.replace(/ /g, " ").toLowerCase().split("");

    for (const character of textArray) {
      await TimeOutHelper.createCustomTimeout(animationSpeed);
      animatedText.value = animatedText.value + character;
    }
  },
};

export default Typewriter;
