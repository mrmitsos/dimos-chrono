import React, { useRef } from "react";
import { useScroll, motion } from "framer-motion";
import LiIcon from "./LiIcon";

const experienceData = [
  {
    position: "Personal Trainer",
    company: "Guiness Functional Training Studio",
    companyLink: "Adidas",
    time: "2015-2018",
    address: "Greece",
    work: (
      <>
        {`Develop and execute training programs that align with clients' goals and needs.`}
        <br />
        {`Development and implementation of exercise programs for weight loss, strengthening and improving physical condition.`}
      </>
    ),
  },
  {
    position: "Sports Manager",
    company: "Adidas Runners Athens",
    companyLink: "Adidas",
    time: "2017-Present",
    address: "Greece",
    work: (
      <>
        {`Design and implement running programs tailored to the needs and goals of community members.`}
        <br />
        {`Leading groups of runners, providing motivation and guidance to improve their performance.`}
        <br />
        {`Captain of the coaches and crew, ensuring efficient operation and cooperation of the team.`}
        <br />
        {`Create and publish content on social media, promote the community.`}
      </>
    ),
  },
  {
    position: "Member of the SEGAS Organizing Team",
    company: "Marathon | Athens Half Marathon",
    companyLink: "Adidas",
    time: "2023-2024",
    address: "Greece",
    work: (
      <>
        {`Management of a specific sector of the route, ensuring a smooth and safe running of the race.`}
        <br />
        {`Organizing and coordinating volunteers and staff, ensuring effective placement and operation during the race.`}
      </>
    ),
  },
  {
    position: "Coach of Olympic Sports",
    company: "Experience Park Ellinikon | Visa",
    companyLink: "Adidas",
    time: "2024",
    address: "Greece",
    work: (
      <>
        {`Training children aged 5-17 in a range of Olympic sports.`}
        <br />
        {`Transfer of values, noble rivalry, sportsmanship.`}
        <br />
        {`Cooperation with coaches and organizers, ensuring smooth and coordinated operation of all activities.`}
      </>
    ),
  },
];

const Details = ({ position, company, companyLink, time, address, work }) => {
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
          {position}&nbsp;
          <a
            //href={companyLink}
            target="_blank"
            className="text-primary dark:text-primaryDark capitalize"
          >
            @{company}
          </a>
        </h3>
        <span className="font-medium capitalize text-dark/75 dark:text-light/75 xs:text-sm">
          {time} | {address}
        </span>
        <p className="font-medium w-full md:text-sm">{work}</p>
      </motion.div>
    </li>
  );
};

const Experience = () => {
  let countRef = useRef(null);
  let { scrollYProgress } = useScroll({
    target: countRef,
    offset: ["start end", "center start"],
    layoutEffect: false,
  });

  return (
    <div className="my-64">
      <h2 className="font-bold text-8xl mb-32 w-full text-center md:text-6xl xs:text-4xl md:mb-16">
        Experience
      </h2>
      <div
        ref={countRef}
        className="w-[75%] mx-auto relative lg:w-[90%] md:w-full"
      >
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute left-9 top-0 w-[4px] h-full bg-dark origin-top dark:bg-light md:w-[2px] md:left-[30px] xs:left-[20px]"
        />
        <ul className="w-full flex flex-col items-start justify-between ml-4 xs:ml-2">
          {experienceData.map((exp, index) => (
            <Details
              key={index}
              position={exp.position}
              company={exp.company}
              companyLink={exp.companyLink}
              time={exp.time}
              address={exp.address}
              work={exp.work}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Experience;
