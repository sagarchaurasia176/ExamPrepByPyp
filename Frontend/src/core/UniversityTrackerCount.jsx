import React, { useState, useEffect } from 'react';
import { BookOpen, Users, Calendar, Award } from 'lucide-react';
import { AnimatedCounter } from './AnimatedCounter';

export default function UniversityTrackerCount() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const stats = [
    { icon: BookOpen, label: "Papers Available", value: "10,000", suffix: "+" },
    { icon: Users, label: "Active Students", value: "50,000", suffix: "+" },
    { icon: Calendar, label: "Years of Papers", value: "15", suffix: "+" },
    { icon: Award, label: "Universities", value: "100", suffix: "+" }
  ];

  return (
    <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-3/4 left-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl animate-float-slow"></div>
      </div>
        {/* Stats Section */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 transform transition-all duration-1000 delay-300 ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-8 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-3xl border border-white/10 group hover:scale-105 hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl">
              <div className="p-4 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl w-fit mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                <stat.icon className="w-10 h-10 text-indigo-400 group-hover:text-indigo-300 transition-colors duration-300" />
              </div>
              <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              <div className="text-sm text-slate-400 font-inter font-medium mt-2">{stat.label}</div>
            </div>
          ))}
        </div> 
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-3deg); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }

        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes slide-in {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes bounce-in {
          0% { opacity: 0; transform: scale(0.3) translateY(20px); }
          50% { transform: scale(1.1) translateY(-5px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        @keyframes text-shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
        .animate-slide-in { animation: slide-in 0.6s ease-out; }
        .animate-bounce-in { animation: bounce-in 0.8s ease-out; }
        .animate-text-shimmer { 
          background-size: 400% 100%;
          animation: text-shimmer 3s ease-in-out infinite;
        }
      `}</style>
      </div>

    
  );
}