# 🚀 Localhost Testing Guide

## Complete Login Flow Testing

### **Step 1: Start the Development Server**
```bash
npm run dev
# or
yarn dev
```

### **Step 2: Test Different Client Scenarios**

#### **🔵 Demo Client (Default)**
- **URL**: `http://localhost:3000`
- **Client Type**: Pay + Points
- **Features**: Both points redemption and payment options

#### **🏦 HDFC Bank**
- **URL**: `http://hdfc.localhost:3000`
- **Client Type**: Pay + Points
- **Features**: Combined payment and points system

#### **🏦 AXIS Bank**
- **URL**: `http://axis.localhost:3000`
- **Client Type**: Points Only
- **Features**: Only points redemption, no payment options

#### **🏦 ICICI Bank**
- **URL**: `http://icici.localhost:3000`
- **Client Type**: Pay Only
- **Features**: Only payment options, no points

### **Step 3: Complete User Flow Testing**

#### **📱 Login Flow**
1. **Visit any subdomain** (e.g., `http://hdfc.localhost:3000`)
2. **Click "Login"** button
3. **Fill login form** with any email/password
4. **Submit** → Automatically redirects to home page
5. **See client-specific catalog** based on bank type

#### **🛍️ Catalog Testing**
- **Points Only (AXIS)**: Shows only points-based products
- **Pay Only (ICICI)**: Shows only payment-based products  
- **Pay + Points (HDFC/Demo)**: Shows both options

#### **🎨 Theme Testing**
- Each client has different colors and branding
- HDFC: Blue theme
- AXIS: Green theme
- ICICI: Orange theme
- Demo: Default blue theme

### **Step 4: Subdomain Switching**

#### **🔄 Switch Between Clients**
1. **Use Subdomain Switcher** in the header
2. **Or manually change URL**:
   - `localhost:3000` → Demo
   - `hdfc.localhost:3000` → HDFC
   - `axis.localhost:3000` → AXIS
   - `icici.localhost:3000` → ICICI

### **Step 5: Authentication Testing**

#### **🔐 Login States**
- **Not Logged In**: Shows login prompt and limited catalog
- **Logged In**: Shows full personalized catalog
- **Logout**: Returns to login state

#### **🧪 Test Users**
- **Email**: `test@example.com`
- **Password**: `password123`
- **Any email/password combination works** (mock authentication)

### **Step 6: Client Configuration Testing**

#### **📊 Check Client Info**
Each client shows:
- **Client Type**: Points Only / Pay Only / Pay + Points
- **Payment Options**: Available payment methods
- **Subdomain**: Current client subdomain
- **Theme**: Client-specific colors and branding

### **Step 7: Error Handling Testing**

#### **🚫 Test Edge Cases**
- **Invalid subdomain**: Falls back to demo client
- **No authentication**: Shows login prompts
- **Network errors**: Graceful fallbacks
- **SSR issues**: ClientOnly wrappers prevent hydration errors

## 🎯 **Expected Results**

### **✅ What Should Work**
1. **Login page** shows with client-specific branding
2. **After login** → Redirects to home page
3. **Home page** shows client-specific catalog
4. **Subdomain switching** works seamlessly
5. **No hydration errors** in console
6. **Responsive design** on all screen sizes

### **🔍 What to Check**
- **Console errors**: Should be minimal
- **Network requests**: Should be successful
- **UI consistency**: No layout shifts
- **Authentication state**: Persists across page refreshes
- **Client detection**: Works correctly for all subdomains

## 🐛 **Troubleshooting**

### **Common Issues**
1. **Hydration errors**: Check console for SSR/client mismatches
2. **Subdomain not detected**: Check browser URL and localhost setup
3. **Login not working**: Check authentication state in UI context
4. **Catalog not showing**: Check client configuration and authentication

### **Quick Fixes**
- **Refresh page**: Clears any state issues
- **Clear localStorage**: Resets authentication state
- **Check console**: Look for error messages
- **Verify subdomain**: Ensure URL format is correct

## 🎉 **Success Criteria**

Your implementation is working correctly if:
- ✅ Login page shows client-specific branding
- ✅ Login redirects to home page
- ✅ Home page shows appropriate catalog based on client type
- ✅ Subdomain switching works
- ✅ No console errors
- ✅ Responsive design works
- ✅ Authentication state persists

## 📝 **Next Steps**

Once basic flow is working:
1. **Add real authentication** (replace mock)
2. **Connect to backend APIs** for catalog data
3. **Add payment gateway integration**
4. **Implement points system**
5. **Add user account management**
6. **Deploy to production** with real subdomains

---

**Happy Testing! 🚀**
