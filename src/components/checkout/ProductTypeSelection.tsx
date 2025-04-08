
import { useState } from 'react';

export type ProductType = 'digital' | 'physical' | 'bundle' | 'dual-books';
export type CoverType = 'softcover' | 'hardcover';

interface ProductTypeSelectionProps {
  productType: ProductType;
  setProductType: (type: ProductType) => void;
  coverType: CoverType;
  handleCoverTypeChange: (type: CoverType) => void;
  timerExpired: boolean;
}

const ProductTypeSelection = ({
  productType,
  setProductType,
  coverType,
  handleCoverTypeChange,
  timerExpired
}: ProductTypeSelectionProps) => {
  
  const calculatePrices = () => {
    const originalPrices = {
      digital: 14.99,
      physical: coverType === 'hardcover' ? 44.99 : 39.99,
      bundle: coverType === 'hardcover' ? (14.99 + 44.99) : (14.99 + 39.99),
      dualBooks: coverType === 'hardcover' ? 69.98 : 59.98
    };

    const discountedPrices = {
      digital: 9.99,
      physical: coverType === 'hardcover' ? 34.99 : 25.99,
      bundle: coverType === 'hardcover' ? (9.99 + 34.99) * 0.95 : (9.99 + 29.99) * 0.95,
      dualBooks: coverType === 'hardcover' ? 62.98 : 53.98
    };

    return {
      original: originalPrices,
      discounted: discountedPrices
    };
  };

  const prices = calculatePrices();

  return (
    <>
      <h3 className="text-2xl font-bold mb-4">
        Select Your Preferred Format
      </h3>
      
      <div className="flex items-center">
        <input
          type="radio"
          id="digital"
          name="productType"
          value="digital"
          checked={productType === 'digital'}
          onChange={() => setProductType('digital')}
          className="mr-3 h-5 w-5"
        />
        <label htmlFor="digital" className="flex flex-col">
          <span className="font-medium">Digital Copy - 
            {!timerExpired ? (
              <span> <span className="line-through text-gray-500">
                ${prices.original.digital.toFixed(2)}
              </span> ${prices.discounted.digital.toFixed(2)}</span>
            ) : (
              <span> ${prices.discounted.digital.toFixed(2)}</span>
            )}
          </span>
          <span className="text-sm text-gray-600">Instant download access</span>
        </label>
      </div>
      <div className="mb-6 space-y-4">
        <div className="flex items-center">
          <input
            type="radio"
            id="physical"
            name="productType"
            value="physical"
            checked={productType === 'physical'}
            onChange={() => setProductType('physical')}
            className="mr-3 h-5 w-5"
          />
          <label htmlFor="physical" className="flex flex-col">
            <span className="font-medium">Physical Book - 
              {!timerExpired ? (
                <span> <span className="line-through text-gray-500">
                  ${prices.original.physical.toFixed(2)}
                </span> ${prices.discounted.physical.toFixed(2)}</span>
              ) : (
                <span> ${prices.discounted.physical.toFixed(2)}</span>
              )}
            </span>
            <span className="text-sm text-gray-600">Plus shipping & handling</span>
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            type="radio"
            id="bundle"
            name="productType"
            value="bundle"
            checked={productType === 'bundle'}
            onChange={() => setProductType('bundle')}
            className="mr-3 h-5 w-5"
          />
          <label htmlFor="bundle" className="flex flex-col">
            <span className="font-medium">Bundle (Digital + Physical) - <span className="text-green-500 font-bold">Save 5%</span></span>
            <span className="text-sm text-gray-600">Get both formats at a special discount!</span>
          </label>
        </div>
        
        <div className="flex items-center relative">
          <input
            type="radio"
            id="dual-books"
            name="productType"
            value="dual-books"
            checked={productType === 'dual-books'}
            onChange={() => setProductType('dual-books')}
            className="mr-3 h-5 w-5"
          />
          <label htmlFor="dual-books" className="flex flex-col">
            <div className="flex items-center">
              <span className="font-medium">Both Books Bundle (Elevate Higher + Swaggerism) - 
                {!timerExpired ? (
                  <span> <span className="line-through text-gray-500">
                    ${prices.original.dualBooks.toFixed(2)}
                  </span> <span className="text-green-500 font-bold">${prices.discounted.dualBooks.toFixed(2)}</span></span>
                ) : (
                  <span> <span className="text-green-500 font-bold">${prices.discounted.dualBooks.toFixed(2)}</span></span>
                )}
              </span>
              <span className="ml-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">10% OFF</span>
            </div>
            <span className="text-sm text-gray-600">Get both physical books with FREE shipping!</span>
          </label>
          <div className="absolute -right-2 -top-2">
            <span className="bg-yellow-400 text-xs font-bold text-black px-2 py-0.5 rounded-full transform rotate-3 shadow">BEST VALUE</span>
          </div>
        </div>
      </div>

      <div className="mb-6 border p-3 rounded-md bg-gray-50">
        <h4 className="font-medium text-sm mb-2">Cover Type:</h4>
        <div className="flex space-x-4">
          <div 
            className={`border p-2 rounded-md cursor-pointer ${coverType === 'softcover' ? 'border-theme-purple-dark bg-purple-50' : ''}`}
            onClick={() => handleCoverTypeChange('softcover')}
          >
            <span className="text-sm">Softcover</span>
          </div>
          <div 
            className={`border p-2 rounded-md cursor-pointer ${coverType === 'hardcover' ? 'border-theme-purple-dark bg-purple-50' : ''}`}
            onClick={() => handleCoverTypeChange('hardcover')}
          >
            <span className="text-sm">Hardcover (+$10.00)</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductTypeSelection;
