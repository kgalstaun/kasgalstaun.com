const ScrollHelper = {
  scrollToElement(elementRef) {
    elementRef.scrollIntoView({ behavior: "smooth" });
  },
};

export default ScrollHelper;
