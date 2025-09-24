# Gift Card Images Directory

This directory contains all the images for gift cards. The structure should be organized as follows:

## Directory Structure:
```
public/assets/images/gift-cards/
├── README.md (this file)
├── bata-gift-card.png
├── bata-banner.jpg
├── amazon-gift-card.png
├── amazon-banner.jpg
├── cultfit-gift-card.png
├── cultfit-banner.jpg
├── croma-gift-card.png
├── croma-banner.jpg
├── flipkart-gift-card.png
├── flipkart-banner.jpg
├── myntra-gift-card.png
├── myntra-banner.jpg
├── zomato-gift-card.png
├── zomato-banner.jpg
├── swiggy-gift-card.png
├── swiggy-banner.jpg
├── netflix-gift-card.png
├── netflix-banner.jpg
├── uber-gift-card.png
├── uber-banner.jpg
├── bookmyshow-gift-card.png
├── bookmyshow-banner.jpg
├── paytm-gift-card.png
└── paytm-banner.jpg
```

## Image Specifications:

### Gift Card Images (gift-card.png):
- **Size**: 300x200px (3:2 aspect ratio)
- **Format**: PNG with transparent background
- **Content**: Clean, professional gift card design
- **Style**: Modern, branded design matching the brand

### Banner Images (banner.jpg):
- **Size**: 600x300px (2:1 aspect ratio)
- **Format**: JPG
- **Content**: Hero/banner style images showcasing the brand
- **Style**: High-quality, engaging visuals

## Brand Logos:
Brand logos are stored in: `public/assets/images/brands/`

## Usage in Components:
The images are referenced in the data structure as:
- `logo`: Brand logo path
- `image`: Gift card image path  
- `bannerImage`: Banner/hero image path

## Sample Data Structure:
```typescript
{
  id: "1",
  name: "Bata Gift Card",
  logo: "/assets/images/brands/bata-logo.png",
  image: "/assets/images/gift-cards/bata-gift-card.png",
  bannerImage: "/assets/images/gift-cards/bata-banner.jpg",
  // ... other properties
}
```

## Notes:
- All images should be optimized for web use
- Use consistent naming convention: `{brand-name}-gift-card.png`
- Ensure images are high quality but web-optimized
- Consider using WebP format for better performance (with fallbacks)
