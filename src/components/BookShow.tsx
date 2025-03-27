
import { useIsMobile } from '@/hooks/use-mobile';

const BookShow = () => {
  const isMobile = useIsMobile();

  return (
    <section className="py-12 md:py-20 bg-[#FFB700] text-black text-center">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {/* Section Title */}
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-extrabold uppercase tracking-wide leading-tight" style={{ color: '#3A0233' }}>
          UNLEASH YOUR BEST SELF. BEGIN NOW.
        </h1>

        {/* Book Introduction */}
        <p className="mt-4 md:mt-6 text-base md:text-lg leading-relaxed">
          I am thrilled to introduce you to my book,{" "}
          <span className="font-bold uppercase">
            ELEVATE HIGHER: CHANGE YOUR LIFE. BE GR8R THAN. EARN MORE.
          </span>{" "}
          This book is designed to help you enhance seven key areas of your life:{" "}
          <strong>Spiritual, Wellness, Knowledge, Relationship, Actions, Financial, and Lifestyle.</strong> 
          By focusing on these areas, you can achieve more abundance and fulfillment than ever before.
        </p>

        {/* Availability Notice */}
        <div className="mt-6 md:mt-8 bg-white text-gray-900 p-4 md:p-6 rounded-lg shadow-lg">
          <p className="text-base md:text-lg font-bold uppercase">
            DUE TO THE HIGH DEMAND FOR THIS TRANSFORMATIVE BOOK, IT MAY TAKE A FEW SECONDS TO LOAD AFTER YOU PLACE YOUR ORDER HERE ONLINE.
          </p>
          <p className="mt-3 md:mt-4 text-base md:text-lg">
            YOUR <span className="text-indigo-700 font-bold">FREE COPY</span> 
            MAY TAKE <strong>14-25 BUSINESS DAYS</strong> TO BE DELIVERED TO YOUR DOORSTEP.  
            I KINDLY ASK FOR YOUR PATIENCE DURING THIS PROCESS…
          </p>
        </div>

        {/* Ordering Options */}
        <div className="mt-6 md:mt-8">
          <p className="text-base md:text-lg">
            Choose from multiple options:
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
              <h3 className="text-lg md:text-xl font-bold mb-2">Digital Version</h3>
              <p className="mb-2">Instant access to the e-book</p>
              <div className="flex items-baseline">
                <span className="line-through text-gray-500 mr-2">$14.99</span>
                <span className="text-xl md:text-2xl font-bold text-red-600">$9.99</span>
              </div>
            </div>
            
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
              <h3 className="text-lg md:text-xl font-bold mb-2">Physical Copy</h3>
              <p className="mb-2">Shipped to your doorstep</p>
              <div className="flex items-baseline">
                <span className="line-through text-gray-500 mr-2">$39.99</span>
                <span className="text-xl md:text-2xl font-bold text-red-600">$29.99</span>
                <span className="text-xs ml-2">+ shipping</span>
              </div>
            </div>
            
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-md border-2 border-green-500 relative">
              <div className="absolute -top-3 right-4 bg-green-500 text-white text-xs px-2 py-1 rounded">BEST VALUE</div>
              <h3 className="text-lg md:text-xl font-bold mb-2">Bundle Deal</h3>
              <p className="mb-2">Get both digital & physical</p>
              <div className="flex items-baseline">
                <span className="text-lg md:text-xl font-bold text-green-600">Save 5%</span>
              </div>
            </div>
          </div>

          {/* Button */}
          <button
            className="bg-red-600 hover:bg-red-700 text-white text-lg md:text-xl px-6 md:px-12 py-4 md:py-6 mt-6 md:mt-8 font-bold uppercase rounded-xl transform transition-all duration-300 hover:scale-105 shadow-xl"
            onClick={() =>
              document.getElementById("order")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Claim Your Copy
          </button>
        </div>

        {/* Closing Message */}
        <p className="mt-8 md:mt-12 italic opacity-80 text-base md:text-lg">
          Thank you for taking the time to read this page. I look forward to hearing from you soon and helping you embark on this journey to elevate your life.
        </p>

        <p className="mt-4 md:mt-6 text-base md:text-lg font-bold">Warm regards,</p>
        <p className="text-lg md:text-xl font-bold text-yellow-600">RQ</p>
        <img 
          src="/lovable-uploads/Screenshot_2025-02-28_231038-removebg-preview.png" 
          alt="Signature" 
          className="mx-auto" 
        />
        <h3 className="text-2xl md:text-3xl font-bold text-red-600">P.S.</h3>
      </div>
    </section>
  );
};

export default BookShow;
