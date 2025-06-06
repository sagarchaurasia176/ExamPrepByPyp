import React from 'react'
import { useState, useEffect } from 'react';


export const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
      const [count, setCount] = useState(0);
      const [isVisible, setIsVisible] = useState(false);
      useEffect(() => {
        if (isVisible) {
          let startTime = null;
          const startValue = 0;
          const endValue = parseInt(end.replace(/\D/g, ''));
    
          const animate = (currentTime) => {
            if (startTime === null) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            
            setCount(Math.floor(progress * endValue));
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
    
          requestAnimationFrame(animate);
        }
      }, [isVisible, end, duration]);
    
      useEffect(() => {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
            }
          },
          { threshold: 0.3 }
        );
    
        const element = document.getElementById(`counter-${end}`);
        if (element) observer.observe(element);
    
        return () => observer.disconnect();
      }, [end]);
          
      return (
    <div>
       <div id={`counter-${end}`} className="text-3xl font-bold text-white font-inter">
          {count.toLocaleString()}{suffix}
        </div>
    </div>
  )

};
  

