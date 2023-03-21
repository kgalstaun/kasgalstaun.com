import TimeOutHelper from "@/helpers/TimeOutHelper.js";

const Typewriter = {
  async startAnimation(animatedText, originalText, config) {
    let text = originalText;
    let textArray = text.replace(/ /g, " ").split("");

    for (const character of textArray) {
      await TimeOutHelper.startTimeout(config.speed);
      if (config.index >= 0) {
        animatedText.value[config.index] =
          animatedText.value[config.index] + character;
      } else {
        animatedText.value = animatedText.value + character;

        if (config.loop) {
          if (originalText == animatedText.value) {
            await TimeOutHelper.startTimeout(500);
            animatedText.value = "";

            await this.startAnimation(animatedText, originalText, {
              speed: config.speed,
              loop: true,
            });
          }
        }
      }
    }
  },
};

export default Typewriter;
