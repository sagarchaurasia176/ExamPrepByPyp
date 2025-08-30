import React from "react";

const About = () => {
  return (
    <div className=" text-white py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          {/* Image Section */}
          <div className="flex-1">
            <img
              src="https://res.cloudinary.com/dc3mdr2ol/image/upload/v1756511462/1551e401-f363-40a5-8df9-da7630461939_bax2ps.jpg"
              alt="Study illustration"
              className="w-full rounded-xl shadow-lg transform hover:scale-105 transition duration-500"
            />
          </div>

          {/* Text Section */}
          <div className="flex-1 space-y-8">
            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-green-400 to-orange-500 bg-clip-text">
              About | PYP
            </h2>
            <div className="w-20 h-1 bg-white"></div>

            {/* Intro */}
            <p className="text-base md:text-lg leading-relaxed text-gray-300">
              <b className="text-white">PYP | Exam_Prep</b> was created by three
              passionate B.Tech students —{" "}
              <span className="text-green-300">Sagar, Ankit, and Raunak</span>.
              As Computer Science engineers, we’ve faced the same struggles
              every student encounters: finding reliable, well-structured, and
              accessible study resources.
            </p>

            {/* Story */}
            <p className="text-base md:text-lg leading-relaxed text-gray-300">
              During our exam preps, we realized how powerful{" "}
              <span className="font-semibold text-blue-300">
                previous year papers
              </span>{" "}
              are. They don’t just test memory; they help bridge the gap between{" "}
              <span className="font-semibold text-green-300">
                rote learning
              </span>{" "}
              and{" "}
              <span className="font-semibold text-green-300">
                deep understanding
              </span>
              . Unfortunately, most papers were scattered, incomplete, or hard
              to find.
            </p>

            {/* Why we built it */}
            <div>
              <p className="text-base md:text-lg leading-relaxed text-gray-300">
                That’s why we built{" "}
                <b className="text-white">PYP | Exam_Prep</b> — a platform that
                helps students prepare smarter:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2 text-gray-300 leading-relaxed">
                <li>
                  <span className="text-green-300 font-medium">
                    Centralizes
                  </span>{" "}
                  all previous year papers in one place
                </li>
                <li>
                  <span className="text-green-300 font-medium">Saves</span>{" "}
                  hours of searching for study material
                </li>
                <li>
                  <span className="text-green-300 font-medium">Highlights</span>{" "}
                  recurring question patterns
                </li>
                <li>
                  <span className="text-green-300 font-medium">Simulates</span>{" "}
                  real exam-like experiences
                </li>
              </ul>
            </div>

            {/* Closing Note */}
            <div className="pt-6">
              <p className="text-lg text-green-300 font-medium italic leading-relaxed">
                “We’re building the study companion we always wished we had —
                and we hope it makes your exam prep journey easier, faster, and
                more effective.”
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
