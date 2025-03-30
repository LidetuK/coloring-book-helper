
import { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const Countdown = () => {
  const isMobile = useIsMobile();
  const [timeLeft, setTimeLeft] = useState(() => {
    // Try to get saved time from localStorage, otherwise start with default values
    const savedTime = localStorage.getItem('countdownTime');
    if (savedTime) {
      const parsedTime = JSON.parse(savedTime);
      return parsedTime;
    }
    return {
      hours: 23,
      minutes: 59,
      seconds: 59
    };
  });

  useEffect(() => {
    // Save current time to localStorage whenever it changes
    localStorage.setItem('countdownTime', JSON.stringify(timeLeft));
    
    const timer = setInterval(() => {
      setTimeLeft(current => {
        if (current.seconds > 0) {
          return { ...current, seconds: current.seconds - 1 };
        }
        if (current.minutes > 0) {
          return { ...current, minutes: current.minutes - 1, seconds: 59 };
        }
        if (current.hours > 0) {
          return { hours: current.hours - 1, minutes: 59, seconds: 59 };
        }
        // Reset when it reaches zero
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div className={`fixed bottom-2 md:bottom-4 right-2 md:right-4 glass-card p-3 md:p-4 rounded-lg shadow-lg z-40 bg-white/95 ${isMobile ? 'max-w-[150px]' : ''}`}>
      <p className="text-xs md:text-sm font-semibold text-primary mb-1 md:mb-2">Limited Time Offer</p>
      <div className="flex gap-1 md:gap-2 text-xl md:text-2xl font-bold">
        <div>{String(timeLeft.hours).padStart(2, '0')}:</div>
        <div>{String(timeLeft.minutes).padStart(2, '0')}:</div>
        <div>{String(timeLeft.seconds).padStart(2, '0')}</div>
      </div>
    </div>
  );
};

export default Countdown;
