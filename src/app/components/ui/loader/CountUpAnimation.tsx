import React, { useState, useEffect } from "react";

interface CountUpProps {
  value: number;
  className?: string;
} 

const CountUpAnimation: React.FC<CountUpProps> = ({ value, className = "" }) => {
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value; 
    const duration = 500
    const increment = (end - start) / (duration / 50); 

    const interval = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(interval);
        start = end;
      }
      setCurrentValue(Math.floor(start));
    }, 30); 

    return () => clearInterval(interval);
  }, [value]);

  return (
    <span className={className}>{isNaN(currentValue) ? 0 : currentValue}</span>
  );
};

export default CountUpAnimation;
