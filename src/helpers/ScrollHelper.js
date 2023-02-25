const ScrollHelper = {
  scrollToElement(elementRef) {
    elementRef.value.scrollIntoView({ behavior: "smooth" });
  },
};

export default ScrollHelper;
