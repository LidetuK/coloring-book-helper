
import { Gift, Zap, Target, Users } from "lucide-react";

const bonuses = [
  {
    icon: <Gift className="w-8 h-8 md:w-12 md:h-12 text-primary" />,
    title: "The Elevation Mindset Blueprint",
    value: "$1,997 VALUE",
    description: "Unlock the secrets to developing a success-driven mindset and achieving your full potential."
  },
  {
    icon: <Zap className="w-8 h-8 md:w-12 md:h-12 text-primary" />,
    title: "Peak Performance Habits",
    value: "$1,497 VALUE",
    description: "Master daily routines and habits that empower you to stay focused, productive, and motivated."
  },
  {
    icon: <Target className="w-8 h-8 md:w-12 md:h-12 text-primary" />,
    title: "The Growth Acceleration Guide",
    value: "$1,697 VALUE",
    description: "Discover proven strategies to accelerate personal and professional growth for lasting success."
  },
  {
    icon: <Users className="w-8 h-8 md:w-12 md:h-12 text-primary" />,
    title: "Confidence & Resilience Masterclass",
    value: "$1,997 VALUE",
    description: "Build unshakable confidence and resilience to overcome setbacks and reach new heights in life."
  }
];

const BonusSection = () => {
  return (
    <section className="py-10 md:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 text-red-600">
            FREE Bonuses (Worth $7,188)
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            Order today and get instant access to these exclusive bonuses!
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {bonuses.map((bonus, idx) => (
            <div 
              key={idx}
              className="bg-white p-6 md:p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <div className="mb-3 md:mb-4">{bonus.icon}</div>
              <h3 className="text-xl md:text-3xl font-bold mb-2 text-red-600">{bonus.title}</h3>
              <p className="text-primary font-bold mb-2">{bonus.value}</p>
              <p className="text-gray-600 text-sm md:text-base">{bonus.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BonusSection;
