# 🏆 JewelDeals Admin Panel

A premium admin control panel for managing the JewelDeals jewellery marketplace platform.

## 🎯 Overview

This is a standalone admin panel application for managing vendors, offers, subscription plans, and locations in the JewelDeals marketplace.

## ✨ Features

### 📊 Dashboard
- Real-time analytics and statistics
- Total vendors, offers, and users count
- Revenue tracking
- Platform overview

### 👥 Vendor Management
- Approve/Reject vendor registrations
- Review KYC documents
- Suspend/Activate vendor accounts
- View subscription details
- Track vendor activity

### 💎 Offer Management
- Review and approve jewellery offers
- Moderate content
- Edit offer details
- Delete inappropriate content
- View offer images and details

### 💳 Subscription Plan Management
- Create and edit subscription plans
- Manage pricing (₹299, ₹699, ₹999 tiers)
- Set post limits per plan
- Control plan visibility
- Track plan performance

### 📍 Location Management
- Add/Edit States
- Add/Edit Cities
- Manage Pincodes
- Organize location hierarchy
- Search and filter locations

## 🔐 Default Login Credentials

**For Testing Only:**
- Email: `admin@jeweldeals.com`
- Password: `admin123`

⚠️ **IMPORTANT:** Change these credentials before production deployment!

## 🚀 Quick Start

### Prerequisites
- Node.js v16 or higher
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Install required packages
npm install lucide-react clsx tailwind-merge class-variance-authority

# Install UI components
npm install @radix-ui/react-accordion @radix-ui/react-alert-dialog @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-dialog @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-progress @radix-ui/react-scroll-area @radix-ui/react-select @radix-ui/react-separator @radix-ui/react-slot @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-tooltip

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
```

### Run Development Server

```bash
npm run dev
```

The admin panel will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
jeweldeals-admin/
├── App.tsx                          # Main application entry
├── types/
│   └── index.ts                     # TypeScript type definitions
├── data/
│   └── mockData.ts                  # Mock data store
├── styles/
│   └── globals.css                  # Global styles & Tailwind config
└── components/
    ├── AdminLogin.tsx               # Login page
    ├── AdminDashboard.tsx           # Main dashboard
    ├── admin/
    │   ├── VendorManagement.tsx     # Vendor approval & management
    │   ├── OfferManagement.tsx      # Offer moderation
    │   ├── PlanManagement.tsx       # Subscription plans
    │   └── LocationManagement.tsx   # Location data management
    └── ui/                          # Reusable UI components
        └── (50+ UI components)
```

## 🎨 Tech Stack

- **Framework:** React 18 + TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** Radix UI
- **Icons:** Lucide React
- **Build Tool:** Vite

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_APP_NAME=JewelDeals Admin
VITE_API_URL=your_api_url
```

### Tailwind Configuration

The project uses Tailwind CSS v4 with configuration in `/styles/globals.css`

## 🚀 Deployment

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Traditional Hosting

```bash
npm run build
# Upload the /dist folder to your hosting
```

## 🔒 Security Recommendations for Production

### Essential Security Measures:

1. **Authentication**
   - [ ] Change default admin credentials
   - [ ] Implement real authentication (JWT, OAuth)
   - [ ] Add two-factor authentication
   - [ ] Use secure password policies

2. **Access Control**
   - [ ] Implement IP whitelisting
   - [ ] Require VPN for admin access
   - [ ] Add session timeout
   - [ ] Use HTTPS only

3. **Backend Integration**
   - [ ] Connect to Supabase or custom backend
   - [ ] Implement Row Level Security (RLS)
   - [ ] Add role-based access control
   - [ ] Use environment variables for secrets

4. **Monitoring**
   - [ ] Add audit logging for all admin actions
   - [ ] Set up alerts for suspicious activities
   - [ ] Track login attempts
   - [ ] Monitor performance

## 🗄️ Backend Integration

### Option 1: Supabase (Recommended)

```bash
npm install @supabase/supabase-js
```

Replace mock data in `/data/mockData.ts` with Supabase queries.

### Option 2: Custom API

Update the data layer to connect to your existing backend API.

## 📊 Features by Tab

### Vendors Tab
- View all registered vendors
- Approve/Reject registrations
- View KYC documents
- Suspend/Activate accounts
- Track subscription status

### Offers Tab
- View all submitted offers
- Approve/Reject offers
- Edit offer details
- View images
- Delete content

### Plans Tab
- Create new subscription plans
- Edit existing plans
- Set pricing and limits
- Manage plan features

### Locations Tab
- Manage States
- Manage Cities under states
- Manage Pincodes under cities
- Add/Edit/Delete locations

## 🎯 Current Status

**Mode:** Mock Data (Development)

The admin panel currently uses mock data from `/data/mockData.ts`. For production, connect to a real database.

## 📱 Responsive Design

Fully responsive design optimized for:
- Desktop (1920px+)
- Laptop (1024px+)
- Tablet (768px+)
- Mobile (375px+)

## 🎨 Design System

**Color Scheme:** Premium amber/gold aesthetic
- Primary: Amber (500-900)
- Secondary: Orange
- Accent: Gold gradient

**Typography:** System defaults defined in `globals.css`

## 🐛 Troubleshooting

### Common Issues:

**Module not found errors**
```bash
npm install
```

**Tailwind styles not working**
- Ensure `globals.css` is imported
- Check `tailwind.config.js` is configured

**TypeScript errors**
- Verify `types/index.ts` exists
- Check all imports are correct

## 📈 Roadmap

- [ ] Real-time notifications
- [ ] Advanced analytics
- [ ] Export reports (PDF/Excel)
- [ ] Bulk actions
- [ ] Email notifications
- [ ] Activity logs
- [ ] Role management
- [ ] Custom permissions

## 📄 License

Private - JewelDeals Marketplace Platform

## 👥 Support

For issues or questions, contact the development team.

---

**Version:** 1.0  
**Last Updated:** December 2024  
**Status:** Production Ready (requires backend connection)

---

## 🎉 Ready to Use!

Your admin panel is now clean and ready for deployment. Login with the test credentials and start managing your marketplace!
