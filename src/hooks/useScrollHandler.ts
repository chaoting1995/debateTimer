import React from "react";
import { useLocation } from "react-router-dom";

const useScrollHandler = () => {
  const location = useLocation();

  React.useEffect(() => {
    const element = document.getElementById(location.hash.replace("#", ""));

    setTimeout(() => {
      window.scrollTo({
        behavior: element ? "smooth" : "auto",
        top: element ? element.offsetTop : 0
      });
    }, 100);
  }, [location]);
};

export default useScrollHandler;