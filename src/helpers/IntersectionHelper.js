const options = { root: null, rootMargin: "0px", threshold: 0.1 };

const IntersectionHelper = {
  createObserver(elementRef, inViewport, index) {
    return new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (index != null && Number.isInteger(index)) {
            inViewport[index] = true;
          } else {
            inViewport.value = true;
          }
          observer.unobserve(elementRef);
        }
      });
    }, options);
  },
};

export default IntersectionHelper;
