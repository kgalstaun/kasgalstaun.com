const IntersectionHelper = {
  createOptions() {
    return { root: null, rootMargin: "0px", threshold: 0.1 };
  },
  createCallback(viewPortRef) {
    return (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          viewPortRef.value = true;
        }
      });
    };
  },
};

export default IntersectionHelper;
