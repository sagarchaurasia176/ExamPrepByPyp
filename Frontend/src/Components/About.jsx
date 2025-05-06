import React from "react";
import founder from "../../public/founder.png"; // Add your image in the img folder

const About = () => {
  return (
    <div className=" text-white py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Image Section */}
          <div className="flex-1">
            <img
              src={founder}
              alt="Study illustration"
              className="w-full rounded-xl shadow-lg transform hover:scale-105 transition duration-500"
            />
          </div>

          {/* Text Section */}
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-300 to-blue-400 bg-clip-text text-transparent">
              About PYP | Exam_Prep
            </h2>
            <div className="w-16 h-1 bg-green-300 mb-4"></div>
            
            <p className="text-lg opacity-90 leading-7">
              <b>PYP | Exam_Prep</b> was born from our own struggles as engineering students at CASE. 
              We're <span className="text-green-300">Sagar and Ankit</span>, two B.Tech students who 
              know firsthand how challenging it can be to find quality study materials.
            </p>
            
            <p className="text-lg opacity-90 leading-7">
              During our exam preparations, we noticed how previous year papers made the difference between 
              <span className="font-bold"> memorizing</span> and truly <span className="font-bold">understanding</span> concepts. 
              Yet, these papers were scattered across different platforms, often incomplete or poorly organized.
            </p>
            
            <p className="text-lg opacity-90 leading-7">
              We built this platform to:
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>Centralize all previous year papers in one accessible place</li>
                <li>Save students countless hours of searching</li>
                <li>Help identify recurring question patterns</li>
                <li>Provide a realistic simulation of actual exams</li>
              </ul>
            </p>

            
            <div className="pt-4">
              <p className="text-green-300 font-medium">
                "We're building the study tool we needed - and we hope it helps you as much as it's helping us."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;