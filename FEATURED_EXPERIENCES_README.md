# Featured Experiences Component

A responsive component for displaying featured experiences with both web and mobile optimized layouts.

## 🎯 **Features**

### **Web View:**
- ✅ **3-column grid layout** for desktop
- ✅ **Responsive card design** with hover effects
- ✅ **Clean typography** and spacing
- ✅ **Optimized for large screens**

### **Mobile View:**
- ✅ **Horizontal scrollable cards** (320px width)
- ✅ **Touch-friendly interactions**
- ✅ **Scroll indicator** at bottom
- ✅ **Smooth scrolling** with hidden scrollbars

## 🏗️ **Component Structure**

### **Experience Card Features:**
- **Image**: High-quality experience photos
- **Duration Badge**: Shows experience duration
- **Title**: Experience name
- **Description**: Brief description (3 lines max)
- **Location**: City/location with icon
- **Pricing**: Points + Currency format
- **Book Now Button**: Call-to-action button

### **Responsive Design:**
```css
/* Web View */
.md:grid-cols-3  /* 3 columns on medium screens and up */

/* Mobile View */
.flex.overflow-x-auto  /* Horizontal scroll */
.w-80  /* Fixed 320px width per card */
```

## 📱 **Usage Examples**

### **Basic Usage:**
```tsx
import FeaturedExperiences from '@containers/featured-experiences';

<FeaturedExperiences 
  sectionHeading="Featured Experiences"
  className="mb-12"
/>
```

### **With Custom Limit:**
```tsx
<FeaturedExperiences 
  sectionHeading="Top Experiences"
  limit={2}
  className="mb-8"
/>
```

### **Multiple Sections:**
```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
  <FeaturedExperiences 
    sectionHeading="Adventure Tours"
    limit={2}
  />
  <FeaturedExperiences 
    sectionHeading="City Experiences"
    limit={2}
  />
</div>
```

## 🎨 **Design Specifications**

### **Card Dimensions:**
- **Web**: Responsive grid (33.33% width)
- **Mobile**: Fixed 192px width (matching product cards)
- **Height**: Auto-adjusts to content

### **Typography (Matching Product Feature):**
- **Title**: `text-sm sm:text-base md:text-sm lg:text-base xl:text-lg font-semibold text-heading`
- **Description**: `text-body text-xs lg:text-sm leading-normal xl:leading-relaxed`
- **Location**: `text-body text-xs` with location icon
- **Pricing**: `font-semibold text-sm sm:text-base lg:text-lg text-heading`

### **Colors (Matching Product Feature):**
- **Background**: White with shadow-sm
- **Text**: `text-heading` for titles, `text-body` for descriptions
- **Accent**: blue-600 for icons
- **Badge**: black with opacity for duration
- **Hover**: shadow and translate-y-1 effect

## 🔧 **Customization Options**

### **Props:**
```typescript
interface FeaturedExperiencesProps {
  sectionHeading?: string;  // Default: "Featured Experiences"
  className?: string;       // Default: "mb-12 md:mb-14 xl:mb-16"
  limit?: number;          // Default: 3
}
```

### **Experience Data Structure:**
```typescript
interface Experience {
  id: string;
  title: string;
  description: string;
  image: string;
  points: number;
  currency: number;
  slug: string;
  duration?: string;
  location?: string;
}
```

## 📊 **Mock Data**

The component includes 5 sample experiences:
1. **New York City 90 min Cruise** - 20,000 points + ₹2,206
2. **Los Angeles 2 Hour Tour** - 15,000 points + ₹2,800
3. **Chicago Architectural Boat Tour** - 25,000 points + ₹3,500
4. **Paris City Walking Tour** - 18,000 points + ₹1,950
5. **Tokyo Food Experience** - 22,000 points + ₹3,200

## 🚀 **Integration**

### **1. Add to Home Page:**
```tsx
// In src/pages/index.tsx
import FeaturedExperiences from '@containers/featured-experiences';

<FeaturedExperiences 
  sectionHeading="Featured Experiences"
  className="mb-12"
/>
```

### **2. Create Demo Page:**
```tsx
// Visit /experiences-demo to see the component in action
```

### **3. Customize Styling:**
```css
/* Add custom styles in tailwind.css */
.experience-card {
  /* Custom card styles */
}

.experience-scroll {
  /* Custom scroll styles */
}
```

## 📱 **Mobile Optimization**

### **Touch Interactions:**
- **Smooth scrolling** with momentum
- **Hidden scrollbars** for clean appearance
- **Fixed card width** (192px) matching product cards
- **Product-style layout** with image on left, content on right

### **Performance:**
- **Lazy loading** for images
- **Optimized images** with Next.js Image component
- **Efficient scrolling** with CSS transforms

## 🎯 **Accessibility**

### **Features:**
- ✅ **Semantic HTML** structure
- ✅ **Alt text** for images
- ✅ **Keyboard navigation** support
- ✅ **Screen reader** friendly
- ✅ **High contrast** text and backgrounds

### **ARIA Labels:**
```tsx
<button aria-label="Book New York City 90 min Cruise">
  Book Now
</button>
```

## 🔍 **Browser Support**

- ✅ **Chrome** 90+
- ✅ **Firefox** 88+
- ✅ **Safari** 14+
- ✅ **Edge** 90+
- ✅ **Mobile browsers** (iOS Safari, Chrome Mobile)

## 🛠️ **Development**

### **File Structure:**
```
src/
├── containers/
│   └── featured-experiences.tsx
├── pages/
│   └── experiences-demo.tsx
└── styles/
    └── tailwind.css (with utilities)
```

### **CSS Utilities Added:**
```css
.scrollbar-hide     /* Hide scrollbars */
.line-clamp-2      /* 2-line text clamp */
.line-clamp-3      /* 3-line text clamp */
```

---

**Ready to use!** 🎉

The Featured Experiences component is now fully functional with responsive design for both web and mobile views, matching the design specifications you provided.
