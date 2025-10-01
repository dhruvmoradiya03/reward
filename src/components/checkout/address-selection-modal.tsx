import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { useTenantConfig } from "../../hooks/use-tenant-config";

interface Address {
  id: string;
  name: string;
  address: string;
  isSelected: boolean;
}

interface AddressSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAddress: (address: Address) => void;
  onAddNewAddress: () => void;
  onEditAddress: (address: Address) => void;
}

const AddressSelectionModal: React.FC<AddressSelectionModalProps> = ({
  isOpen,
  onClose,
  onSelectAddress,
  onAddNewAddress,
  onEditAddress,
}) => {
  const { theme } = useTenantConfig();
  const [addresses] = useState<Address[]>([
    {
      id: "1",
      name: "Home",
      address:
        "B-102, Business Plaza, Near St. Mary's School, Green Park, Delhi-110122",
      isSelected: true,
    },
    {
      id: "2",
      name: "Work",
      address:
        "H-209, Commercial Complex, Opp. Montfort School, Ashok Nagar, Delhi-110052",
      isSelected: false,
    },
  ]);

  const [selectedAddressId, setSelectedAddressId] = useState("1");

  const handleAddressSelect = (address: Address) => {
    setSelectedAddressId(address.id);
    onSelectAddress(address);
  };

  const handleAddNewAddress = () => {
    onAddNewAddress();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">
            Saved Addresses
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <IoClose className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="space-y-3">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
              >
                <div className="flex items-start space-x-3">
                  {/* Location Icon */}
                  <div className="flex-shrink-0 mt-1">
                    <svg
                      className="w-5 h-5 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.828 0L6.343 16.657m11.314-11.314L13.414 2.9a1.998 1.998 0 00-2.828 0L6.343 5.343m11.314 11.314A9.995 9.995 0 0112 21.995V12h.001v.001z"
                      />
                    </svg>
                  </div>

                  {/* Address Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {address.name}
                    </h3>
                    <p className="text-xs text-gray-600 leading-relaxed mt-1">
                      {address.address}
                    </p>
                    <div className="flex space-x-3 mt-2">
                      <button
                        onClick={() => onEditAddress(address)}
                        className="text-blue-600 hover:text-blue-800 text-xs font-medium"
                      >
                        Edit
                      </button>
                      <button className="text-blue-600 hover:text-blue-800 text-xs font-medium">
                        Delete
                      </button>
                    </div>
                  </div>

                  {/* Radio Button */}
                  <div className="flex-shrink-0">
                    <input
                      type="radio"
                      name="address"
                      checked={selectedAddressId === address.id}
                      onChange={() => handleAddressSelect(address)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add New Address Button */}
          <button
            onClick={handleAddNewAddress}
            className="w-full mt-4 py-3 border-2 rounded-lg hover:opacity-90 transition-colors font-medium"
            style={{
              borderColor: theme?.primaryColor || "#1A60E3",
              color: theme?.primaryColor || "#1A60E3",
              backgroundColor: "transparent",
            }}
          >
            Add New Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressSelectionModal;
