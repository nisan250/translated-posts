import { useEffect, useRef } from "react";

export const useIntersectionObserver = (callback, enabled = true) => {
  const ref = useRef(null);
  console.log(ref.current);
  useEffect(() => {
    const options = {
      threshold: 1,
      rootMargin: "0px",
    };

    let observer = new IntersectionObserver(executeJob, options);
    if (ref.current && enabled) {
      console.log("observe ");
      observer.observe(ref.current);
    }

    return () => {
      console.log("disconnect ");
      observer.disconnect();
    };
  }, [callback, enabled]); // eslint-disable-line react-hooks/exhaustive-deps

  function executeJob(entries) {
    console.log("executeJob ");
    entries.forEach((entry) => {
      console.log(entry);
      if (entry.isIntersecting) {
        console.log("working ");
        callback(entry);
      }
    });
  }

  return ref;
};
