import React from "react";
import Head from "next/head";
import Layout from "@/components/Layout";
import AnimatedText from "@/components/AnimatedText";
import Link from "next/link";
import Image from "next/image";
import project1 from "../../public/images/projects/move2024.webp";
import project2 from "../../public/images/projects/move2023.webp";
import project3 from "../../public/images/projects/ocean2022.jpg";
import project4 from "../../public/images/projects/ocean2021.jpg";
import project5 from "../../public/images/projects/ocean2019.jpg";
import project6 from "../../public/images/projects/ocean2018.webp";
import { motion } from "framer-motion";
import TransitionEffect from "@/components/TransitionEffect";
import BuScrollToTop from "@/components/BuScrollToTop";

const FramerImage = motion(Image);

const FeaturedProject = ({ type, title, summary, img, link }) => {
  return (
    <article
      className="w-full flex items-center justify-between rounded-3xl border
     border-solid border-dark bg-light shadow-2xl p-12 relative rounded-br-2xl dark:bg-dark dark:border-light 
     lg:flex-col lg:p-8 xs:rounded-2xl xs:rounded-br-3xl xs:p-4"
    >
      <div
        className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2.5rem]
       bg-dark rounded-br-3xl dark:bg-light xs:-right-2 sm:h-[102%] xs:w-full xs:rounded-[1.5rem]"
      />
      <Link
        href={link}
        target={"_blank"}
        className="w-1/2 cursor-pointer overflow-hidden rounded-lg lg:w-full"
      >
        <FramerImage
          src={img}
          alt={title}
          className="w-full h-auto"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
          priority
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
        />
      </Link>
      <div className="w-1/2 flex flex-col items-start justify-between pl-6 lg:w-full lg:pl-0 lg:pt-6">
        <span className="text-primary font-medium text-xl dark:text-primaryDark xs:text-base">
          {type}
        </span>
        <Link
          href={link}
          target={"_blank"}
          className="hover:underline underline-offset-2"
        >
          <h2 className="my-2 w-full text-left text-4xl font-bold dark:text-light sm:text-sm">
            {title}
          </h2>
        </Link>
        <p className="my-2 font-medium text-dark dark:text-light sm:text-sm">
          {summary}
        </p>
        <div className="mt-2 flex items-center">
          <Link
            href={link}
            target={"_blank"}
            className="ml-4 rounded-lg bg-dark text-light p-2 px-6 text-lg font-semibold dark:bg-light dark:text-dark sm:px-4 sm:text-base"
          >
            Visit Project
          </Link>
        </div>
      </div>
    </article>
  );
};

const Project = ({ type, title, img, link }) => {
  return (
    <article
      className="h-full w-full flex flex-col items-center justify-center
     rounded-2xl border border-solid border-dark bg-light p-6 relative
     dark:bg-dark dark:border-light xs:p-4"
    >
      <div
        className="absolute top-0 -right-3 -z-10 w-[101%] h-[103%] rounded-[2rem]
       bg-dark rounded-br-3xl dark:bg-light md:-right-2 md:w-[101%] xs:h-[102%] xs:rounded-[1.5rem]"
      />
      <Link
        href={link}
        target={"_blank"}
        className="w-full cursor-pointer overflow-hidden rounded-lg"
      >
        <FramerImage
          src={img}
          alt={title}
          className="w-full h-auto"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        />
      </Link>
      <div className="w-full flex flex-col items-start justify-between mt-4">
        <span className="text-primary font-medium text-xl dark:text-primaryDark lg:text-lg md:text-base">
          {type}
        </span>
        <Link
          href={link}
          target={"_blank"}
          className="hover:underline underline-offset-2"
        >
          <h2 className="my-2 w-full text-left text-3xl font-bold lg:text-2xl">
            {title}
          </h2>
        </Link>
        <div className="mt-2 flex items-center justify-between w-full">
          <Link
            href={link}
            target={"_blank"}
            className="text-lg font-semibold underline md:text-base"
          >
            Visit
          </Link>
        </div>
      </div>
    </article>
  );
};

const projects = () => {
  return (
    <>
      <Head>
        <title>Dimos | Projects</title>
        <meta name="description" content="" />
      </Head>
      <TransitionEffect />
      <main className="w-full mb-16 flex flex-col items-center justify-center dark:text-light">
        <Layout className="pt-16">
          <AnimatedText
            text="Impossible Is Nothing!"
            className="mb-16 lg:!text-7xl sm:!mb-8 sm:!text-6xl xs:!text-4xl"
          />
          <div className="grid grid-cols-12 gap-24 gap-y-32 xl:gap-x-16 lg:gap-x-8 md:gap-y-24 sm:gap-x-0">
            <div className="col-span-12">
              <FeaturedProject
                title="MOVE FOR THE PLANET 2024"
                summary="H adidas ανακοίνωσε την επιστροφή του Move for the Planet, της παγκόσμιας πρωτοβουλίας που αξιοποιεί τη συλλογική κίνηση για να δημιουργήσει ένα συλλογικό αντίκτυπο. Η adidas καλεί αθλητές κάθε επιπέδου από όλο τον κόσμο να καταγράψουν τη φυσική τους δραστηριότητα σε διάφορα αθλήματα για να συγκεντρώσουν χρήματα για έργα σε περιοχές που πλήττονται από καύσωνες, πλημμύρες και άλλες ακραίες καιρικές συνθήκες."
                link="https://themagicbus.gr/service/adidas-move-for-the-planet/"
                type="Featured Project"
                img={project1}
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                title="RUN FOR THE OCEANS 2022"
                summary="H Παγκόσμια Ημέρα Ωκεανών στις 8 Ιουνίου πλησιάζει..."
                link="https://themagicbus.gr/service/run-for-the-oceans-2022-plastic-free-running-event/"
                type="Featured Project"
                img={project3}
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                title="RUN FOR THE OCEANS 2021"
                summary="Το Run For The Oceans, η παγκόσμια πρωτοβουλία της adidas και της Parley για τη βιωσιμότητα, επιστρέφει για 4η χρονιά και σηματοδοτεί το δεύτερο κεφάλαιο των Parley Missions για το 2021."
                link="https://takeaction.parley.tv/missions/run-for-the-oceans-2021/"
                type="Featured Project"
                img={project4}
              />
            </div>
            <div className="col-span-12">
              <FeaturedProject
                title="MOVE FOR THE PLANET 2023"
                summary="H adidas, με τη νέα της πρωτοβουλία Move For The Planet 2023 για τη βιωσιμότητα, μετέτρεψε τη δραστηριότητα σε δράση καταγράφοντας εντυπωσιακά αποτελέσματα."
                link="https://themagicbus.gr/service/adidas-move-for-the-planet/"
                type="Featured Project"
                img={project2}
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                title="RUN FOR THE OCEANS 2019"
                summary="Για μία ακόμα χρονιά η adidas μας κάλεσε να τρέξουμε στο Run For The Oceans 2019."
                link="https://www.lifo.gr/thegoodlifo/well-being/run-oceans-2019-trexame-me-fonto-tin-athinaiki-thalassa-gia-ton-pio"
                type="Featured Project"
                img={project5}
              />
            </div>
            <div className="col-span-6 sm:col-span-12">
              <Project
                title="RUN FOR THE OCEANS 2018"
                summary="Σχεδόν ένα εκατομμύριο δρομείς σε όλο τον κόσμο συμμετείχαν στο μεγαλύτερο running κίνημα της adidas και της Parley For The Oceans, το “Run For The Oceans 2018”."
                link="https://parley.tv/journal/2018/7/13/a-record-shattering-run-for-the-oceans"
                type="Featured Project"
                img={project6}
              />
            </div>
          </div>
        </Layout>
        <BuScrollToTop />
      </main>
    </>
  );
};

export default projects;
