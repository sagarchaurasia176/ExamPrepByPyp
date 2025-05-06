import React from "react";
import student from "../img/rem.png";
import Shap from "./Shap";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import About from "../Components/About";
import SamplePaper from "../Components/SamplePaper";
import Testimonials from "../Components/Testimonials";
import Footer from "../Components/Footer";

function Home() {
  return (
    <div className="bg-slate-950">
      {/* Main hero section */}
      <div className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-12 sm:px-6 md:px-8 lg:px-12 xl:px-16 flex flex-col items-center justify-center min-h-[80vh] md:min-h-[90vh]">
          {/* Centered content container */}
          <div className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16">
            {/* Text section with motion - centered content */}
            <motion.div
              className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="font-semibold text-4xl sm:text-5xl md:text-6xl leading-tight text-white">
                Question Paper
              </h1>

              <div className="w-12 h-1.5 bg-green-50 my-4"></div>

              <p className="text-lg sm:text-xl md:text-xl leading-relaxed text-slate-300 max-w-lg">
                Embark on your quest for excellence with access to a goldmine of
                questions that hold the key to unlocking your academic{" "}
                <span className="font-bold text-white">Potential</span>.{" "}
                <span className="font-bold text-white">Prepare</span> with{" "}
                <span className="font-bold text-white">
                  Precision, Practice with Purpose and achieve remarkable results.
                </span>
              </p>
              
              <div className="mt-6 md:mt-8">
                <Link to="/view/paper">
                  <button className="px-8 py-3 sm:px-10 sm:py-3.5 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105">
                    View Question Papers
                  </button>
                </Link>
              </div>
            </motion.div>
            
            {/* Image with motion - centered */}
            <motion.div 
              className="w-full md:w-1/2 flex justify-center"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7 }}
            >
              <img
                className="w-full max-w-md md:max-w-lg  lg:max-w-xl  lg:w-full rounded-lg shadow-lg transform hover:scale-105 transition duration-500"
                src={student}
                alt="Student studying"
              />
            </motion.div>
          </div>
          <Shap />
        </div>
      </div>

      {/* About section */}
      <div className="bg-slate-950">
        <div className=" mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 md:py-16">
          <About />
        </div>
      </div>
      {/*  */}
      <div className="bg-slate-950">
        <div className=" mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 md:py-16">
          <SamplePaper/>
        </div>
      </div>
      <div className="bg-slate-950 w-full">
        <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 md:py-16">
          <Testimonials/>
        </div>
      </div>
      {/* Footer section */}
      <div className="bg-slate-950 w-full">
        <div className=" mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12 md:py-16">
          <Footer/>
        </div>
      </div>

    </div>
  );
}

export default Home;