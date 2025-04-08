
import { ChangeEvent } from 'react';
import { ProductType } from './ProductTypeSelection';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

interface AddressFormProps {
  formData: FormData;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  setFormData: (data: FormData) => void;
  productType: ProductType;
}

const AddressForm = ({ formData, handleChange, setFormData, productType }: AddressFormProps) => {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
            className="w-full px-4 py-2 border border-brand-black/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red/50"
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
            className="w-full px-4 py-2 border border-brand-black/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red/50"
            required
          />
        </div>
      </div>
      
      <div>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="w-full px-4 py-2 border border-brand-black/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red/50"
          required
        />
      </div>
      
      {(productType === 'physical' || productType === 'dual-books') && (
        <>
          <div>
            <select
              name="country"
              value={formData.country}
              onChange={(e) => {
                const updatedData = { ...formData, country: e.target.value };
                setFormData(updatedData);
              }}
              className="w-full px-4 py-2 border border-brand-black/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red/50"
              required
            >
              <option value="United States">United States</option>
              <option value="Canada">Canada</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="France">France</option>
              <option value="Germany">Germany</option>
              <option value="Italy">Italy</option>
              <option value="Spain">Spain</option>
            </select>
          </div>
          <div>
            <input
              type="text"
              name="address1"
              value={formData.address1}
              onChange={handleChange}
              placeholder="Address Line 1"
              className="w-full px-4 py-2 border border-brand-black/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red/50"
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="address2"
              value={formData.address2}
              onChange={handleChange}
              placeholder="Address Line 2 (optional)"
              className="w-full px-4 py-2 border border-brand-black/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red/50"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="City"
                className="w-full px-4 py-2 border border-brand-black/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red/50"
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleChange}
                placeholder="ZIP Code"
                className="w-full px-4 py-2 border border-brand-black/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red/50"
                required
              />
            </div>
          </div>
          
          <div>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              placeholder="State/Province"
              className="w-full px-4 py-2 border border-brand-black/20 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-red/50"
              required
            />
          </div>
          
          <div className="text-sm">
            <p className="font-medium">Shipping Information:</p>
            <ul className="list-disc pl-5 mt-1 text-gray-600">
              {productType === 'dual-books' ? (
                <li className="text-green-600 font-medium">FREE shipping and handling on both books bundle!</li>
              ) : (
                <>
                  <li>USA & Canada: $11.99 + $2.98 handling</li>
                  <li>Europe: $14.99+ $3.98 handling</li>
                </>
              )}
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default AddressForm;
