import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createProperty } from '../../store/slices/propertySlice';

const PropertyForm = ({ onSuccess }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'apartment',
    address: { street: '', city: '', state: '', pincode: '' },
    details: { bedrooms: 0, bathrooms: 0, area: 0 },
    rent: { amount: 0, deposit: 0, maintenance: 0 }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: { ...formData[parent], [child]: value }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await dispatch(createProperty(formData));
    if (result.payload) {
      setFormData({
        title: '',
        description: '',
        type: 'apartment',
        address: { street: '', city: '', state: '', pincode: '' },
        details: { bedrooms: 0, bathrooms: 0, area: 0 },
        rent: { amount: 0, deposit: 0, maintenance: 0 }
      });
      if (onSuccess) onSuccess();
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Property Title</label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., Luxury 3BHK Apartment"
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-400 mb-1">Rent Amount (₹)</label>
          <input
            name="rent.amount"
            type="number"
            value={formData.rent.amount}
            onChange={handleChange}
            placeholder="e.g., 50000"
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
            required
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="3"
          placeholder="Describe your property..."
          className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-blue-500"
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">City</label>
          <input
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
            placeholder="e.g., Mumbai"
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-400 mb-1">State</label>
          <input
            name="address.state"
            value={formData.address.state}
            onChange={handleChange}
            placeholder="e.g., Maharashtra"
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-400 mb-1">Area (sq.ft)</label>
          <input
            name="details.area"
            type="number"
            value={formData.details.area}
            onChange={handleChange}
            placeholder="e.g., 1200"
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Bedrooms</label>
          <input
            name="details.bedrooms"
            type="number"
            value={formData.details.bedrooms}
            onChange={handleChange}
            placeholder="e.g., 3"
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
          />
        </div>
        
        <div>
          <label className="block text-sm text-gray-400 mb-1">Bathrooms</label>
          <input
            name="details.bathrooms"
            type="number"
            value={formData.details.bathrooms}
            onChange={handleChange}
            placeholder="e.g., 2"
            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50"
      >
        {loading ? 'Creating...' : 'Create Property'}
      </button>
    </form>
  );
};

export default PropertyForm;