const options = { root: null, rootMargin: "0px", threshold: 0.1 };

const IntersectionHelper = {
  createObserver(elementRef, inViewport) {
    return new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          inViewport.value = true;
          observer.unobserve(elementRef);
        }
      });
    }, options);
  },
};

export default IntersectionHelper;
