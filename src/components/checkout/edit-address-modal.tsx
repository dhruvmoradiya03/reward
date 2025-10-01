import React, { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";

interface EditAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveAddress: (address: any) => void;
  addressToEdit: any;
}

const EditAddressModal: React.FC<EditAddressModalProps> = ({
  isOpen,
  onClose,
  onSaveAddress,
  addressToEdit,
}) => {
  const [formData, setFormData] = useState({
    addressName: "",
    aptSuite: "",
    streetName: "",
    state: "",
    city: "",
  });

  // Update form data when addressToEdit changes
  useEffect(() => {
    if (addressToEdit) {
      setFormData({
        addressName: addressToEdit.name || "",
        aptSuite: addressToEdit.aptSuite || "",
        streetName: addressToEdit.streetName || "",
        state: addressToEdit.state || "",
        city: addressToEdit.city || "",
      });
    }
  }, [addressToEdit]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveAddress = () => {
    if (
      formData.addressName &&
      formData.streetName &&
      formData.state &&
      formData.city
    ) {
      onSaveAddress({
        ...formData,
        id: addressToEdit?.id,
      });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Edit Address</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <IoClose className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="space-y-4">
            {/* Address Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address Name
              </label>
              <input
                type="text"
                name="addressName"
                value={formData.addressName}
                onChange={handleInputChange}
                placeholder="e.g., Home, Work"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Apt, Suite, Building */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Apt, Suite, Building
              </label>
              <input
                type="text"
                name="aptSuite"
                value={formData.aptSuite}
                onChange={handleInputChange}
                placeholder="Apt, Suite, Building"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Street Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Street Name
              </label>
              <input
                type="text"
                name="streetName"
                value={formData.streetName}
                onChange={handleInputChange}
                placeholder="Street Name"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* State and City */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  placeholder="State"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder="City"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Save Address Button */}
          <button
            onClick={handleSaveAddress}
            className="w-full mt-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium"
          >
            Save Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAddressModal;
