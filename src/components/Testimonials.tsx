import React, { useRef, useState } from "react";
import Image from "next/image";
import { testimonials } from "../../data/testimonialstexts";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

export default function Testimonial() {
  const sliderRef = useRef<any>();

  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  const sliderSettings = {
    ...settings,
    afterChange: (index) => setCurrentSlide(index),
  };

  return (
    <>
      <section className="flex items-center justify-center min-h-screen">
        <div className="max-w-[1200px] w-full mx-auto">
          <h1 className="text-center text-2xl font-bold sm:text-3xl pb-8">
            Athletes who Love me
          </h1>
          <div className="max-w-[1100px] mx-auto w-full rounded-xl relative overflow-hidden">
            <Slider {...sliderSettings} ref={sliderRef}>
              {testimonials.map((ui, index) => (
                <div key={index} className="h-full">
                  <div className="mx-auto bg-white p-5 sm:p-12 grid grid-cols-2 sm:grid-cols-1 md:grid-cols-[1fr_2fr] items-center gap-5 md:gap-8 rounded-xl overflow-hidden">
                    <div className="space-y-5 text-center">
                      <div className="border-8 inline-block rounded-full border-purple-200 p-2.5">
                        <div className="mx-auto w-[100px] h-[100px] rounded-full bg-gray-200 overflow-hidden">
                          <Image
                            src={ui.img}
                            alt="Boy"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div>
                        <h2 className="text-xl font-medium dark:text-black">
                          {ui.name}
                        </h2>
                        <p className="text-gray-600 dark:text-black">
                          {ui.profession}
                        </p>
                      </div>
                    </div>

                    <div className="text-[16px] sm:text-[18px] space-y-3">
                      <div className="text-[#58E6D9] text-[40px]">
                        <FaQuoteLeft />
                      </div>
                      <p className="leading-[30px] font-bold dark:text-black md:text-sm md:leading-5">
                        {ui.testimonial}
                      </p>
                      <div className="text-[#58E6D9] text-[40px]">
                        <FaQuoteRight className="ml-auto" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
            <button
              className={`absolute top-[50%] left-[10px] z-10 text-2xl text-gray-600 ${
                currentSlide === 0 ? "hidden" : ""
              }`}
              onClick={() => sliderRef?.current?.slickPrev()}
            >
              <MdOutlineArrowBackIos />
            </button>
            <button
              className={`absolute top-[50%] right-[10px] z-10 text-2xl text-gray-600 ${
                currentSlide === testimonials.length - 1 ? "hidden" : ""
              }`}
              onClick={() => sliderRef?.current?.slickNext()}
            >
              <MdOutlineArrowForwardIos />
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
