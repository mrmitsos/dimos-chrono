import React, { useRef } from "react";
import { useScroll, motion } from "framer-motion";
import LiIcon from "./LiIcon";

const Details = ({ type, time, place, info }) => {
  const ref = useRef(null);

  return (
    <li
      ref={ref}
      className="my-8 first:mt-0 last:mb-0 w-[60%] mx-auto flex flex-col items-center justify-between md:w-[80%]"
    >
      <LiIcon reference={ref} />
      <motion.div
        initial={{ y: 50 }}
        whileInView={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        <h3 className="font-bold capitalize text-2xl sm:text-xl xs:text-lg">
          {type}
        </h3>
        <span className="font-medium capitalize text-dark/75 dark:text-light/75 xs:text-sm">
          {time} | {place}
        </span>
        <p className="font-medium w-full md:text-sm">{info}</p>
      </motion.div>
    </li>
  );
};

const Education = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center start"],
  });

  return (
    <div className="mt-64 mb-10">
      <h2 className="font-bold text-8xl mb-32 w-full text-center md:text-6xl xs:text-4xl md:mb-16">
        Education
      </h2>
      <div ref={ref} className="w-[75%] mx-auto relative lg:w-[90%] md:w-full">
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute left-9 top-0 w-[4px] h-full bg-dark origin-top dark:bg-light md:w-[2px] md:left-[30px] xs:left-[20px]"
        />
        <ul className="w-full flex flex-col items-start justify-between ml-4 xs:ml-2">
          <Details
            type="SPORTS ADMINISTRATION (AAP)"
            time="2022-2024"
            place="Patra"
            info="(POSTGRADUATE) The aim of this program is to provide a high level specialised
             study of “Sports Management” leading to the award of a postgraduate degree of 
             higher education. The main purpose of the program is to provide students with 
             the knowledge and to equip them with the appropriate tools so that they are able 
             to exercise effective management in the field of sports for-profit, non-profit,
             municipal and public organizations."
          />
          <Details
            type="SCHOOL OF PHYSICAL EDUCATION AND SPORTS SCIENCE (EKPA)"
            time="2014-2019"
            place="Athens"
            info="(UNDERGRADUATE) The School of Physical Education and Sport Science specializes
             in the study, research and teaching of all expressions of Movement of the Human Body
              through a holistic and in depth interdisciplinary program that includes the 
              natural sciences, the social sciences and the humanities."
          />
        </ul>
      </div>
    </div>
  );
};

export default Education;
