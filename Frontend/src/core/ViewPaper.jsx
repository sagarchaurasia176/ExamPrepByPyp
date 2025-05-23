import React from "react";
import { motion } from "framer-motion";
import Footer from "../Components/Footer";

const UniversityPaper = () => {
  return (
    <div className="bg-slate-950 min-h-screen">
      
      <div className="container mx-auto px-4 py-16 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Question Papers
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">
            Browse through our collection of previous year question papers to
            help you prepare effectively for your exams.
          </p>
        </motion.div>

        {/* Search and filter options could go here */}
        {/* <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-center">
          <select className="px-4 py-2 rounded-lg bg-slate-800 text-black border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            {Branches.map((branch) => (
              <option key={branch.value} value={branch.value}>
                {branch.label}
              </option>
            ))}
          </select>
          {/* semester  */}
          <select className="px-4 py-2 rounded-lg bg-slate-800 text-black border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            {semesters.map((sem) => (
              <option key={sem.value} value={sem.value}>
                {sem.label}
              </option>
            ))}
          </select>

          {/* Years */}
          <select className="px-4 py-2 rounded-lg bg-slate-800 text-black border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            {years.map((year) => (
              <option key={year.value} value={year.value}>
                {year.label}
              </option>
            ))}
          </select>
        {/* </div>  */}

        {/* Papers grid */}
        {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {papers.map((paper) => (
            <motion.div
              key={paper.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: paper.id * 0.1 }}
              className="bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:translate-y-[-5px]"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold text-black">
                    {paper.title}
                  </h3>
                  <span className="bg-indigo-600 text-xs text-black px-2 py-1 rounded-full">
                    {paper.year}
                  </span>
                </div>
                <p className="text-slate-300 mb-4">{paper.subject}</p>
                <div className="flex justify-between items-center">
                  <a
                    href={paper.downloadLink}
                    className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                      />
                    </svg>
                    Download PDF
                  </a>
                  <button className="text-slate-300 hover:text-black">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div> */}
      </div>




      <div className="bg-slate-950 w-full">
        <div className="mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-12">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default UniversityPaper;
