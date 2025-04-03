
import { useState, useEffect } from 'react';

interface CountdownTimerProps {
  initialHours?: number;
  initialMinutes?: number;
  initialSeconds?: number;
  onExpire?: () => void;
}

const CountdownTimer = ({ 
  initialHours = 23, 
  initialMinutes = 57, 
  initialSeconds = 0,
  onExpire
}: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: initialHours,
    minutes: initialMinutes,
    seconds: initialSeconds
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          if (onExpire) onExpire();
          clearInterval(interval);
          return { hours: 0, minutes: 0, seconds: 0 };
        }
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [onExpire]);

  return (
    <div className="mt-4 inline-flex items-center justify-center space-x-2 bg-brand-black/90 text-white px-4 py-2 rounded-md">
      <span className="text-sm">Offer ends in:</span>
      <div className="flex items-center space-x-1 font-mono text-sm">
        <span>{String(timeLeft.hours).padStart(2, '0')}</span>
        <span>:</span>
        <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
        <span>:</span>
        <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
      </div>
    </div>
  );
};

export default CountdownTimer;
