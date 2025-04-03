
interface OrderCompleteProps {
  successMessage: string;
  onNewOrder: () => void;
}

const OrderComplete = ({ successMessage, onNewOrder }: OrderCompleteProps) => {
  return (
    <section id="claim" className="py-20 bg-gradient-to-b from-brand-gray to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-xl">
          <div className="text-center">
            <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-4">Order Successful!</h2>
            <p className="mb-6">{successMessage}</p>
            <button 
              onClick={onNewOrder}
              className="cta-button justify-center"
            >
              Place Another Order
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderComplete;
