
import { Gift, Zap, Target, Users } from "lucide-react";

const bonuses = [
  {
    icon: <Gift className="w-8 h-8 md:w-12 md:h-12 text-theme-pink-DEFAULT" />,
    title: "🔥 The Swagger Mindset",
    value: "$2,499 VALUE",
    description: "Unleash the mindset of the elite. Learn the inner codes of power, confidence, and limitless success that separate legends from the average."
  },
  {
    icon: <Zap className="w-8 h-8 md:w-12 md:h-12 text-theme-pink-DEFAULT" />,
    title: "🔥 High-Performance Swagger",
    value: "$1,999 VALUE",
    description: "Dominate every day. Master the rituals, routines, and habits that keep top performers at the peak—no off days, no excuses."
  },
  {
    icon: <Target className="w-8 h-8 md:w-12 md:h-12 text-theme-pink-DEFAULT" />,
    title: "🔥 The Swagger Acceleration",
    value: "$2,499 VALUE",
    description: "Success isn’t slow—it’s engineered. Get the blueprint to hyper-growth in business, influence, and personal power."
  },
  {
    icon: <Users className="w-8 h-8 md:w-12 md:h-12 text-theme-pink-DEFAULT" />,
    title: "🔥 The Supreme Confidence",
    value: "$2,999 VALUE",
    description: "Swagger isn’t given—it’s built. Step into unshakable confidence, bulletproof resilience, and an unstoppable presence."
  }
];

const BonusSection = () => {
  return (
    <section className="py-10 md:py-20 bg-purple-gradient">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 text-white">
          FREE Swagger Bonuses (Worth $9,997!)
          </h2>
          <p className="text-lg md:text-xl text-white/80">
          Order today and unlock instant access to these exclusive power-ups—because Swaggerism is more than a book, it’s a lifestyle upgrade.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {bonuses.map((bonus, idx) => (
            <div 
              key={idx}
              className="bg-white p-6 md:p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <div className="mb-3 md:mb-4">{bonus.icon}</div>
              <h3 className="text-xl md:text-3xl font-bold mb-2 text-theme-purple-dark">{bonus.title}</h3>
              <p className="text-theme-pink-DEFAULT font-bold mb-2">{bonus.value}</p>
              <p className="text-gray-600 text-sm md:text-base">{bonus.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BonusSection;
