const ScrollIntoViewHelper = {
  scroll(elementRef) {
    elementRef.value.scrollIntoView({ behavior: "smooth" });
  },
};

export default ScrollIntoViewHelper;
