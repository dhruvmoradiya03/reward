import { NextApiRequest, NextApiResponse } from 'next';

// Mock categories data - replace with your actual backend data
const mockCategories = [
  {
    id: "1",
    name: "Gift Cards",
    slug: "gift-cards",
    icon: "gift-cards",
    description: "Digital gift cards for various brands",
    isActive: true,
  },
  {
    id: "2", 
    name: "Experiences",
    slug: "experiences",
    icon: "experiences",
    description: "Travel and experience packages",
    isActive: true,
  },
  {
    id: "3",
    name: "Shopping",
    slug: "shopping", 
    icon: "shopping",
    description: "Online shopping categories",
    isActive: true,
  },
  {
    id: "4",
    name: "Deals",
    slug: "deals",
    icon: "deals", 
    description: "Special offers and discounts",
    isActive: true,
  },
  // Add more categories as needed
  {
    id: "5",
    name: "Electronics",
    slug: "electronics",
    icon: "electronics",
    description: "Electronic devices and gadgets",
    isActive: true,
  },
  {
    id: "6",
    name: "Fashion",
    slug: "fashion",
    icon: "fashion",
    description: "Clothing and fashion items",
    isActive: true,
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Simulate API delay
    setTimeout(() => {
      res.status(200).json({
        success: true,
        categories: mockCategories,
        total: mockCategories.length,
      });
    }, 100);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
