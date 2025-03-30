
import { Check, Target, Users, Award, Zap, Gift, Sparkles } from "lucide-react";

const audience = [
  {
    icon: <Target className="w-8 h-8 md:w-10 md:h-10 text-theme-pink-DEFAULT" />,
    title: "Future Tycoons",
    description: "Visionaries ready to build their empire, dominate their industry, and turn big ideas into unstoppable success."
  },
  {
    icon: <Zap className="w-8 h-8 md:w-10 md:h-10 text-theme-pink-DEFAULT" />,
    title: "Career Hustlers",
    description: "Professionals looking to level up, break limits, and own their career path with confidence and skill."
  },
  {
    icon: <Users className="w-8 h-8 md:w-10 md:h-10 text-theme-pink-DEFAULT" />,
    title: "Self-Mastery Seekers",
    description: "Individuals dedicated to personal growth, mindset shifts, and unlocking their fullest potential."
  },
  {
    icon: <Award className="w-8 h-8 md:w-10 md:h-10 text-theme-pink-DEFAULT" />,
    title: "Next-Gen Leaders", 
    description: "Students and graduates preparing to step into greatness, navigate their path, and build a future of impact."
  },
  {
    icon: <Gift className="w-8 h-8 md:w-10 md:h-10 text-theme-pink-DEFAULT" />,
    title: "Wellness Warriors",
    description: "Those committed to mastering their physical and mental well-being for peak performance in all aspects of life."
  },
  {
    icon: <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-theme-pink-DEFAULT" />,
    title: "Spiritual Alchemists",
    description: "Seekers looking to connect deeply, align their energy, and elevate their spiritual journey."
  },
  {
    icon: <Target className="w-8 h-8 md:w-10 md:h-10 text-theme-pink-DEFAULT" />,
    title: "Money Mavericks",
    description: "Hustlers ready to take charge of their finances, master wealth-building, and secure financial freedom."
  },
  {
    icon: <Users className="w-8 h-8 md:w-10 md:h-10 text-theme-pink-DEFAULT" />,
    title: "Connection Architects",
    description: "Individuals focused on building unshakable relationships, both personally and professionally."
  },
  {
    icon: <Zap className="w-8 h-8 md:w-10 md:h-10 text-theme-pink-DEFAULT" />,
    title: "Ambition Fuelers",
    description: "Dream chasers looking for the fire, strategies, and mindset to conquer their goals with swagger."
  },
  {
    icon: <Award className="w-8 h-8 md:w-10 md:h-10 text-theme-pink-DEFAULT" />,
    title: "Life Designers",
    description: "Creators of their own reality, crafting a life that blends success, fulfillment, and undeniable style."
  },
  {
    icon: <Gift className="w-8 h-8 md:w-10 md:h-10 text-theme-pink-DEFAULT" />,
    title: "Business Builders",
    description: "Entrepreneurs looking to scale, sustain, and transform their ventures into legacy businesses."
  },
  {
    icon: <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-theme-pink-DEFAULT" />,
    title: "Creators and Innovators",
    description: "Digital storytellers, content creators, and innovators pushing boundaries and making an impact."
  }
];
  
const Benefit = () => {
  return (
    <section className="py-20 bg-purple-gradient text-center">
      <div className="max-w-6xl mx-auto px-4">
        {/* Title */}
        <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-[#DC2626] mb-2 md:mb-4 whitespace-nowrap">
  TIRED OF CONFORMITY?
</h2>

        {/* Subtitle */}
        <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-black mb-4 md:mb-8 px-2">
  Embrace Swaggerism and live life to your full potential. 
  Resk 'Que, lifestyle magnate, shares his guidance, wisdom, and life experiences to help you define and embody your own 'Swaggerism.'
</h3>
  
        {/* Image */}
        <div className="flex justify-center mb-8 md:mb-16">
          <img src="/ques.png" alt="Who Needs This?" className="w-auto max-w-full h-auto" />
        </div>
  
        {/* Audience List */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 text-white">
            WHO NEEDS THIS BOOK?
          </h2>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
            Find your tribe and unlock your full potential with guidance tailored to your journey.
          </p>
        </div>
        
        {/* Using the same grid structure as BonusSection */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {audience.map((item, idx) => (
            <div 
              key={idx}
              className="bg-white p-6 md:p-8 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <div className="mb-3 md:mb-4 flex justify-center">{item.icon}</div>
              <h3 className="text-xl md:text-2xl font-bold mb-2 text-theme-purple-dark">{item.title}</h3>
              <p className="text-gray-600 text-sm md:text-base">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
  
export default Benefit;
