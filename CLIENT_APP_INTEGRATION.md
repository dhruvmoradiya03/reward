# Client App Integration Guide

## Overview

This guide explains how client applications (HDFC, AXIS, ICICI banks) can integrate with the multi-tenant rewards platform by redirecting users to the appropriate tenant subdomain.

## Integration Flow

```
Client App → Rewards Platform → User Dashboard
     ↓              ↓              ↓
  Authenticate → Redirect to → Show Rewards
  User         Tenant URL    Based on Config
```

## 1. Redirect URL Structure

### Base URLs
- **HDFC**: `https://hdfc.rewargenix.com`
- **AXIS**: `https://axis.rewargenix.com`
- **ICICI**: `https://icici.rewargenix.com`
- **Demo**: `https://demo.rewargenix.com`

### Redirect Endpoint
```
https://{tenant}.rewargenix.com/redirect-handler
```

## 2. Required Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `tenant` | string | ✅ | Tenant identifier (hdfc, axis, icici) |
| `user_id` | string | ✅ | Unique user identifier from client app |
| `token` | string | ✅ | JWT token for authentication |
| `return_url` | string | ❌ | URL to redirect after processing (default: /) |

## 3. Optional Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `user_email` | string | User's email address |
| `user_name` | string | User's full name |
| `points_balance` | number | User's current points balance |

## 4. Integration Examples

### HDFC Bank Integration

```javascript
// Client app redirect function
function redirectToHDFCRewards(userData) {
  const params = new URLSearchParams({
    tenant: 'hdfc',
    user_id: userData.id,
    token: userData.jwtToken,
    user_email: userData.email,
    user_name: userData.name,
    points_balance: userData.points,
    return_url: '/dashboard'
  });
  
  window.location.href = `https://hdfc.rewargenix.com/redirect-handler?${params}`;
}
```

### AXIS Bank Integration

```javascript
// Client app redirect function
function redirectToAXISRewards(userData) {
  const params = new URLSearchParams({
    tenant: 'axis',
    user_id: userData.id,
    token: userData.jwtToken,
    user_email: userData.email,
    user_name: userData.name,
    points_balance: userData.edgeRewards,
    return_url: '/rewards'
  });
  
  window.location.href = `https://axis.rewargenix.com/redirect-handler?${params}`;
}
```

### ICICI Bank Integration

```javascript
// Client app redirect function
function redirectToICICIRewards(userData) {
  const params = new URLSearchParams({
    tenant: 'icici',
    user_id: userData.id,
    token: userData.jwtToken,
    user_email: userData.email,
    user_name: userData.name,
    return_url: '/shop'
  });
  
  window.location.href = `https://icici.rewargenix.com/redirect-handler?${params}`;
}
```

## 5. Client App Implementation

### Step 1: Add Redirect Button

```html
<!-- HDFC Bank -->
<button onclick="redirectToHDFCRewards(userData)">
  Redeem Rewards
</button>

<!-- AXIS Bank -->
<button onclick="redirectToAXISRewards(userData)">
  Use Edge Rewards
</button>

<!-- ICICI Bank -->
<button onclick="redirectToICICIRewards(userData)">
  Shop Now
</button>
```

### Step 2: Handle User Data

```javascript
// Example user data structure
const userData = {
  id: 'user_12345',
  email: 'user@bank.com',
  name: 'John Doe',
  jwtToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
  points: 5000, // For HDFC/AXIS
  edgeRewards: 7500 // For AXIS specifically
};
```

### Step 3: Error Handling

```javascript
function redirectToRewards(userData, tenant) {
  try {
    // Validate user data
    if (!userData.id || !userData.jwtToken) {
      throw new Error('Missing required user data');
    }
    
    // Build redirect URL
    const baseUrl = `https://${tenant}.rewargenix.com/redirect-handler`;
    const params = new URLSearchParams({
      tenant: tenant,
      user_id: userData.id,
      token: userData.jwtToken,
      user_email: userData.email,
      user_name: userData.name,
      points_balance: userData.points || 0
    });
    
    // Redirect
    window.location.href = `${baseUrl}?${params}`;
    
  } catch (error) {
    console.error('Redirect failed:', error);
    alert('Unable to redirect to rewards platform');
  }
}
```

## 6. Security Considerations

### JWT Token Requirements
- Token must be valid and not expired
- Token should contain user identification
- Token should be signed with shared secret

### HTTPS Only
- All redirects must use HTTPS
- No sensitive data in URL parameters
- Use POST for sensitive data if needed

### Validation
- Validate tenant parameter
- Verify user_id exists in your system
- Check token signature

## 7. Testing

### Local Development
```bash
# Test with localhost
http://localhost:3000/redirect-handler?tenant=demo&user_id=test123&token=test_token
```

### Production Testing
```bash
# Test with production URLs
https://hdfc.rewargenix.com/redirect-handler?tenant=hdfc&user_id=test123&token=test_token
```

## 8. Tenant-Specific Features

### HDFC Bank (Pay + Points)
- Shows both pricing and points
- Hybrid payment options
- Points balance display
- Razorpay integration

### AXIS Bank (Points Only)
- Points-only redemption
- No payment gateway
- Edge Rewards integration
- Points balance display

### ICICI Bank (Pay Only)
- E-commerce style
- Payment gateway only
- No points system
- Standard shopping experience

## 9. Return URL Examples

```javascript
// Dashboard redirect
return_url: '/dashboard'

// Specific product page
return_url: '/product/iphone-15-pro'

// Category page
return_url: '/category/electronics'

// Cart page
return_url: '/cart'
```

## 10. Error Handling

### Common Errors
- `Invalid tenant`: Tenant not supported
- `Missing parameters`: Required parameters missing
- `Invalid token`: JWT token invalid or expired
- `User not found`: User ID not found in system

### Error Response
```json
{
  "error": "Invalid tenant",
  "message": "The specified tenant is not supported",
  "supported_tenants": ["demo", "hdfc", "axis", "icici"]
}
```

## 11. Implementation Checklist

- [ ] Add redirect buttons to client app
- [ ] Implement user data collection
- [ ] Add error handling
- [ ] Test with different tenants
- [ ] Validate JWT tokens
- [ ] Implement return URL handling
- [ ] Add logging for debugging
- [ ] Test in production environment

## 12. Support

For technical support or questions:
- Email: support@rewargenix.com
- Documentation: https://docs.rewargenix.com
- API Reference: https://api.rewargenix.com/docs
