import React from "react";
import { useNavigate } from "react-router-dom";
import student from "../img/rem.png";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiBookOpen,
  FiAward,
  FiUsers,
  FiDownload,
} from "react-icons/fi";
import About from "../Components/About";
import SamplePaper from "../Components/SamplePaper";
import Testimonials from "../Components/Testimonials";
import Footer from "../Components/Footer";
import { useUser } from "../context/UserContext";
import Avatar from "react-avatar";
import UniversityTrackerCount from "../core/UniversityTrackerCount";
import { BookOpen } from "lucide-react";
import ChatBot from "../Components/ChatBot";
// This is the Home component that serves as the landing page of the application.
function Home() {
  const { isAuthenticated } = useUser();
  const navigate = useNavigate();
  const API_URL = "http://localhost:5000";

  // Handle view papers button click
  const handleViewPapers = () => {
    if (isAuthenticated) {
      navigate("/papers");
    } else {
      window.location.href = `${API_URL}/auths/auth/google`;
      console.log("Redirecting to Google login...");
    }
  };
  // Features data
  const features = [
    {
      icon: <FiBookOpen className="w-8 h-8" />,
      title: "Comprehensive Collection",
      description:
        "Access thousands of question papers from various subjects and years.",
    },
    {
      icon: <FiAward className="w-8 h-8" />,
      title: "Curated Content",
      description:
        "Expertly selected papers to match your academic needs and level.",
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Community Verified",
      description: "Content reviewed and rated by students and educators.",
    },
    {
      icon: <FiDownload className="w-8 h-8" />,
      title: "Easy Downloads",
      description: "One-click downloads in multiple formats for offline study.",
    },
  ];

  const users = [
    { id: 1, name: "Alice", src: "https://i.pravatar.cc/150?img=1" },
    { id: 2, name: "Bob", src: "https://i.pravatar.cc/150?img=2" },
    { id: 3, name: "Charlie", src: "https://i.pravatar.cc/150?img=3" },
    { id: 4, name: "David", src: "https://i.pravatar.cc/150?img=4" },
    { id: 5, name: "Eva", src: "https://i.pravatar.cc/150?img=5" },
  ];

  return (
    <div className=" bg-slate-950  text-white min-h-screen font-sans">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-purple-600 rounded-full filter blur-3xl opacity-70 mix-blend-multiply animate-blob"></div>
          <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-600 rounded-full filter blur-3xl opacity-70 mix-blend-multiply animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-teal-600 rounded-full filter blur-3xl opacity-70 mix-blend-multiply animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-6 py-24 md:py-32 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Master Your &nbsp;
                <span className=" text-teal-200 bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">
                  Exams
                </span>
                {/* /-100 bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-800">Exams</span> */}
                <br />
                With Confidence
              </h1>

              <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl">
                Access the largest collection of previous year question papers,
                curated by top educators and verified by thousands of successful
                students.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleViewPapers}
                  className="px-8 py-4 animate-bounce bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Explore Papers <FiArrowRight />
                </button>
              </div>

              <div className="mt-10 flex items-center gap-4">
                {/* First install: npm install react-random-avatar */}
                <div className="flex -space-x-2">
                  {users.map((user) => (
                    <Avatar
                      key={user.id}
                      size={40}
                      src={user.src}
                      alt={user.name}
                      className="rounded-full border-2 border-gray-800"
                    />
                  ))}
                </div>
                <span className="text-zinc-100 text-center">
                  <strong>1000</strong> Students Transformed. Yours Could Be
                  Next!
                </span>
              </div>
            </motion.div>

            <motion.div
              className="lg:w-1/2"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative">
                <div className="absolute -top-6 -left-6 w-full h-full border-2 border-blue-400 rounded-2xl"></div>
                <img
                  src={student}
                  alt="Student studying"
                  className="relative rounded-2xl shadow-2xl transform hover:scale-[1.02] transition duration-500"
                />
                <div className="absolute -bottom-6 -right-6 bg-gray-800 p-4 rounded-xl shadow-lg">
                  <div className="text-yellow-400 text-2xl">★ ★ ★ ★ ★</div>
                  <p className="text-sm mt-1">Rated 4.9/5 by students</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/*stats  */}
      <div className=" container mx-auto px-6 mt-20 mb-20  ">
        <UniversityTrackerCount/>
        {/* <UniversityTrackerCount /> */}
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose Our Platform
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              We provide everything you need to prepare effectively for your
              exams
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/50 p-8 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:-translate-y-2"
                whileHover={{ scale: 1.03 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="text-blue-400 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="py-20">
        <div className="container mx-auto px-6">
          <About />
        </div>
      </div>

      {/* Chat bot components */}
          <ChatBot/>
      {/* Sample Papers Section */}
      <div className="py-20 bg-gray-800/50">
        <div className="container mx-auto px-6">
          <SamplePaper />
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-20">
        <div className="container mx-auto px-6">
          <Testimonials />
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Ace Your Exams?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of students who improved their grades with our
            question bank
          </p>
          <button
            onClick={handleViewPapers}
            className="px-8 py-4 bg-slate-950 text-blue-600 hover:bg-gray-100 rounded-lg font-bold flex items-center justify-center gap-2 mx-auto transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Get Started Now <FiArrowRight />
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Global Styles */}
      <style jsx global>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}

export default Home;
