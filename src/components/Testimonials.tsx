import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "../../data/testimonialstexts";
import { motion, AnimatePresence } from "framer-motion";

// Gradient colors for each testimonial
const gradientColors = [
  "from-purple-400 to-pink-400",
  "from-cyan-400 to-blue-400",
  "from-green-400 to-emerald-400",
  "from-orange-400 to-red-400",
  "from-indigo-400 to-purple-400",
  "from-rose-400 to-pink-400",
];

export default function PlayfulTestimonials() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    if (currentSlide < testimonials.length - 1) {
      setDirection(1);
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide(currentSlide - 1);
    }
  };

  const currentTestimonial = testimonials[currentSlide];
  const currentColor = gradientColors[currentSlide % gradientColors.length];

  // Animation variants for slide transitions
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-5xl w-full">
        {/* Title with gradient */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl mb-4 bg-gradient-to-r from-purple-600 via-cyan-500 to-pink-500 bg-clip-text text-transparent">
            Athletes Who Love Me
          </h1>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto rounded-full"
          />
        </motion.div>

        {/* Main testimonial card */}
        <div className="relative">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
              }}
              className="bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              {/* Decorative gradient bar */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5 }}
                className={`h-2 bg-gradient-to-r ${currentColor} origin-left`}
              />

              <div className="p-6 sm:p-8 md:p-12">
                <div className="grid gap-6 md:gap-12 items-center">
                  {/* Left side - Profile */}
                  <div className="text-center space-y-6">
                    {/* Animated profile image */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                        delay: 0.1,
                      }}
                      className="relative inline-block group"
                    >
                      <div
                        className={`absolute inset-0 bg-gradient-to-r ${currentColor} rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-300`}
                      />
                      <div
                        className={`relative border-4 border-transparent bg-gradient-to-r ${currentColor} rounded-full p-1 transform group-hover:scale-105 transition-transform duration-300`}
                      >
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden bg-gray-200">
                          <img
                            src={currentTestimonial.img}
                            alt={currentTestimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </motion.div>

                    {/* Name and profession */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h2 className="text-2xl font-bold text-gray-800 mb-1">
                        {currentTestimonial.name}
                      </h2>
                      <p
                        className={`text-sm font-medium bg-gradient-to-r ${currentColor} bg-clip-text text-transparent`}
                      >
                        {currentTestimonial.profession}
                      </p>
                    </motion.div>

                    {/* Progress dots */}
                    <div className="flex justify-center gap-2 pt-4">
                      {testimonials.map((_, idx) => (
                        <motion.button
                          key={idx}
                          onClick={() => {
                            setDirection(idx > currentSlide ? 1 : -1);
                            setCurrentSlide(idx);
                          }}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                          className={`transition-all duration-300 rounded-full ${
                            idx === currentSlide
                              ? `w-8 h-2 bg-gradient-to-r ${currentColor}`
                              : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Right side - Testimonial */}
                  <div className="relative">
                    {/* Quote icon top */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 0.2, scale: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Quote className="absolute -top-4 -left-4 w-12 h-12 text-purple-500" />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="relative z-10 space-y-4"
                    >
                      <p className="text-gray-700 text-base sm:text-lg leading-relaxed">
                        {currentTestimonial.testimonial}
                      </p>
                    </motion.div>

                    {/* Quote icon bottom */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 0.2, scale: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <Quote className="absolute -bottom-4 -right-4 w-12 h-12 text-cyan-500 rotate-180" />
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <motion.button
            onClick={prevSlide}
            disabled={currentSlide === 0}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-full md:left-4 bg-white rounded-full p-3 shadow-lg transition-all duration-300 ${
              currentSlide === 0
                ? "opacity-0 pointer-events-none"
                : "opacity-100 hover:shadow-xl"
            }`}
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </motion.button>

          <motion.button
            onClick={nextSlide}
            disabled={currentSlide === testimonials.length - 1}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-full md:right-4 bg-white rounded-full p-3 shadow-lg transition-all duration-300 ${
              currentSlide === testimonials.length - 1
                ? "opacity-0 pointer-events-none"
                : "opacity-100 hover:shadow-xl"
            }`}
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </motion.button>
        </div>

        {/* Counter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8 text-gray-500"
        >
          <span className="font-semibold text-gray-700">{currentSlide + 1}</span> /{" "}
          {testimonials.length}
        </motion.div>
      </div>
    </div>
  );
}