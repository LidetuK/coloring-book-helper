
import { useState } from "react";

const BookOne = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section className="py-20 bg-gray-900 text-white text-center">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Heading */}
        <h1 className="text-5xl font-extrabold uppercase tracking-wide leading-tight">
          
        </h1>

        {/* New Big Content Section */}
        <div className="mt-8 bg-white text-gray-900 p-6 md:p-12 rounded-lg shadow-lg">
          <h2 className="text-2xl md:text-4xl font-extrabold uppercase tracking-wide text-center">
            BOOK A ONE-ON-ONE <br />
            VIRTUAL / IN-PERSON CONSULTATION <br />
            TODAY.
          </h2>
        </div>

        {/* Call-To-Action Button */}
        <button
          className="mt-8 bg-yellow-500 hover:bg-yellow-600 text-gray-900 text-lg px-8 md:px-12 py-4 md:py-6 font-bold uppercase rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
          onClick={() => setIsModalOpen(true)}
        >
          Book One-to-One 📞
        </button>

        {/* Modal Popup */}
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full relative">
              {/* Close Button */}
              <button
                className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-2xl"
                onClick={() => setIsModalOpen(false)}
              >
                &times;
              </button>

              {/* Embedded Form */}
              <iframe
                src="https://bookingsssss.vercel.app/"
                className="w-full h-[600px] rounded-lg"
              ></iframe>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BookOne;
