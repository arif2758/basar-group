import React, { useState, useEffect, useRef } from 'react';

interface StatsCounterProps {
  value: number;
  label: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

const StatsCounter: React.FC<StatsCounterProps> = ({ 
  value, 
  label, 
  suffix = '', 
  duration = 2000, 
  className = '' 
}) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const startValue = 0;
    const endValue = value;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentValue = Math.floor(easeOutExpo * (endValue - startValue) + startValue);
      
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, value, duration]);

  return (
    <div ref={counterRef} className={`text-center animate-counter ${className}`}>
      <div className="text-2xl sm:text-3xl font-bold font-poppins">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm opacity-80 mt-1">
        {label}
      </div>
    </div>
  );
};

export default StatsCounter;