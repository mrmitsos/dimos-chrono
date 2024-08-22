import React from "react";
import ScrollToTop from "react-scroll-to-top";
import { FaCat } from "react-icons/fa";

const BuScrollToTop = () => {
  return (
    <>
      <ScrollToTop
        className="flex justify-center items-center dark:text-black"
        smooth
        component={<FaCat />}
      />
    </>
  );
};

export default BuScrollToTop;
