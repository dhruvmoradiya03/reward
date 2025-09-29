# Multi-Tenant Rewards Platform Implementation

## Overview

This implementation provides a complete multi-tenant rewards redemption platform that supports different client configurations (HDFC, AXIS, ICICI banks) with subdomain-based tenant detection and conditional UI rendering.

## Key Features Implemented

### 1. Multi-Tenant Architecture
- **Subdomain Detection**: Automatically detects tenant based on subdomain (hdfc.rewargenix.com, axis.rewargenix.com, etc.)
- **Tenant Configuration**: Each tenant has unique branding, payment options, and feature flags
- **Dynamic Client Switching**: Easy switching between different bank configurations

### 2. Payment Configuration Types
- **Only Points** (AXIS Bank): Pure rewards redemption with points only
- **Only Pay** (ICICI Bank): E-commerce style with payment gateway only  
- **Points + Pay** (HDFC Bank): Hybrid mode with both points and payment options

### 3. Conditional UI Components
- **ConditionalPricing**: Shows pricing/points based on tenant configuration
- **ConditionalPaymentOptions**: Displays appropriate payment methods
- **ConditionalLoginForm**: Shows relevant authentication options (OTP, Password, SSO)

### 4. Tenant-Specific Features
- **Theme Customization**: Each tenant has unique colors and branding
- **Feature Flags**: Granular control over UI elements
- **Authentication Options**: Different login methods per tenant
- **Payment Integration**: Configurable payment gateways and points systems

## File Structure

```
src/
├── contexts/
│   └── tenant.context.tsx          # Main tenant context and configuration
├── hooks/
│   └── use-tenant-config.ts        # Helper hook for tenant configuration
├── components/
│   ├── common/
│   │   ├── conditional-pricing.tsx # Conditional pricing display
│   │   └── subdomain-switcher.tsx  # Tenant switching component
│   ├── cart/
│   │   └── conditional-payment-options.tsx # Payment method selection
│   └── auth/
│       └── conditional-login-form.tsx     # Authentication options
├── pages/
│   ├── tenant-demo.tsx             # Demo page showcasing all features
│   └── index.tsx                   # Homepage with tenant switcher
└── types/
    └── tenant.ts                   # TypeScript definitions
```

## How to Test

### 1. Local Development
```bash
npm run dev
```

### 2. Access Different Tenants
- **Demo**: http://localhost:3000 (default)
- **HDFC**: http://hdfc.localhost:3000
- **AXIS**: http://axis.localhost:3000  
- **ICICI**: http://icici.localhost:3000

### 3. Production URLs
- **HDFC**: https://hdfc.rewargenix.com
- **AXIS**: https://axis.rewargenix.com
- **ICICI**: https://icici.rewargenix.com

### 4. Demo Page
Visit `/tenant-demo` to see all features in action:
- Tenant information display
- Conditional pricing examples
- Payment options demonstration
- Authentication options
- Theme customization

## Tenant Configurations

### HDFC Bank (hdfc.rewargenix.com)
- **Type**: Pay + Points
- **Features**: Both payment gateway and points redemption
- **Theme**: HDFC Red (#E30613)
- **Authentication**: OTP, Password, SSO
- **Payment**: Razorpay integration

### AXIS Bank (axis.rewargenix.com)
- **Type**: Points Only
- **Features**: Pure rewards redemption
- **Theme**: AXIS Orange (#FF6B35)
- **Authentication**: OTP, Password, SSO
- **Payment**: No payment gateway

### ICICI Bank (icici.rewargenix.com)
- **Type**: Pay Only
- **Features**: E-commerce style with payment gateway
- **Theme**: ICICI Orange (#FF6B00)
- **Authentication**: OTP, Password, SSO
- **Payment**: PayU integration

## Key Implementation Details

### 1. Subdomain Detection
```typescript
const getSubdomain = () => {
  const hostname = window.location.hostname;
  const parts = hostname.split('.');
  
  if (hostname === 'localhost') return 'demo';
  if (parts.length >= 3) return parts[0];
  return null;
};
```

### 2. Conditional UI Rendering
```typescript
const { canUsePoints, canUsePayment, isOnlyPoints, isOnlyPay } = useTenantConfig();

// Show pricing only if not points-only
{shouldShowPricing() && !isOnlyPoints && (
  <div>Price: {formatPrice(price)}</div>
)}

// Show points only if not payment-only
{shouldShowPoints() && !isOnlyPay && (
  <div>Points: {formatPoints(points)}</div>
)}
```

### 3. Payment Options Logic
```typescript
// Points Only Mode
{isOnlyPoints && canUsePoints && (
  <div>Redeem with {formatPoints(requiredPoints)} points</div>
)}

// Payment Only Mode  
{isOnlyPay && canUsePayment && (
  <div>Pay {formatPrice(totalAmount)} with card/UPI</div>
)}

// Hybrid Mode
{canUsePointsAndPay && (
  <div>
    <div>Use Points + Pay Remaining</div>
    <div>Pay Full Amount</div>
  </div>
)}
```

## Backend Integration Points

### 1. Tenant Configuration API
```typescript
// GET /api/tenant/{subdomain}
// Returns tenant configuration based on subdomain
```

### 2. Points System API
```typescript
// GET /api/points/balance
// POST /api/points/debit
// POST /api/points/credit
```

### 3. Payment Gateway API
```typescript
// POST /api/payment/create-order
// POST /api/payment/verify
```

## Environment Setup

### 1. Local Development
Add to your `/etc/hosts` file:
```
127.0.0.1 hdfc.localhost
127.0.0.1 axis.localhost  
127.0.0.1 icici.localhost
```

### 2. Production DNS
Configure DNS records:
```
hdfc.rewargenix.com -> Your server IP
axis.rewargenix.com -> Your server IP
icici.rewargenix.com -> Your server IP
```

## Next Steps

1. **Backend API Integration**: Connect to real tenant configuration API
2. **Payment Gateway Integration**: Implement actual payment processing
3. **Points System Integration**: Connect to bank points APIs
4. **SSO Integration**: Implement SAML 2.0 and OAuth 2.0
5. **Admin Panel**: Create super admin interface for tenant management
6. **Analytics**: Add tenant-specific analytics and reporting

## Testing Checklist

- [ ] Subdomain detection works correctly
- [ ] Tenant switching updates UI appropriately
- [ ] Conditional pricing shows/hides based on configuration
- [ ] Payment options display correctly for each tenant type
- [ ] Authentication options match tenant configuration
- [ ] Theme colors apply correctly
- [ ] Feature flags control UI elements properly
- [ ] Mobile responsiveness maintained
- [ ] Error handling for invalid subdomains
- [ ] Loading states during tenant switching
