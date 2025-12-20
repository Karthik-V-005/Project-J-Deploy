import { useState } from 'react';
import { LogOut, Users, FileText, MapPin, Settings, Tag } from 'lucide-react';
import { VendorManagement } from './admin/VendorManagement';
import { OfferManagement } from './admin/OfferManagement';
import { LocationManagement } from './admin/LocationManagement';
import { PlanManagement } from './admin/PlanManagement';
import { mockVendors, mockOffers } from '../data/mockData';

interface AdminDashboardProps {
  onLogout: () => void;
  isDarkMode: boolean;
}

type AdminTab = 'vendors' | 'offers' | 'locations' | 'plans';

export function AdminDashboard({ onLogout, isDarkMode }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>('vendors');

  const pendingVendors = mockVendors.filter(v => v.status === 'pending').length;
  const pendingOffers = mockOffers.filter(o => o.status === 'pending').length;
  const activeOffers = mockOffers.filter(o => {
    const validUntil = new Date(o.validUntil);
    return o.status === 'approved' && validUntil >= new Date();
  }).length;

  const tabs = [
    { id: 'vendors' as AdminTab, label: 'Vendor Management', icon: Users, badge: pendingVendors },
    { id: 'offers' as AdminTab, label: 'Offer Management', icon: FileText, badge: pendingOffers },
    { id: 'locations' as AdminTab, label: 'Locations', icon: MapPin, badge: 0 },
    { id: 'plans' as AdminTab, label: 'Subscription Plans', icon: Tag, badge: 0 },
  ];

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-black' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${isDarkMode ? 'bg-black border-b border-amber-500/20' : 'bg-white border-b border-gray-200'}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className={isDarkMode ? 'text-white' : 'text-gray-900'}>Admin Dashboard</h2>
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Manage your jewellery marketplace</p>
            </div>
            <button
              onClick={onLogout}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isDarkMode 
                  ? 'text-red-400 hover:bg-red-500/10' 
                  : 'text-red-600 hover:bg-red-50'
              }`}
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className={isDarkMode ? 'bg-black border-b border-amber-500/20' : 'bg-white border-b border-gray-200'}>
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className={`${isDarkMode ? 'bg-zinc-900 border border-amber-500/20' : 'bg-gray-50'} rounded-xl p-4`}>
              <p className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Vendors</p>
              <p className={isDarkMode ? 'text-white' : 'text-gray-900'}>{mockVendors.length}</p>
            </div>
            <div className={`${isDarkMode ? 'bg-zinc-900 border border-amber-500/20' : 'bg-gray-50'} rounded-xl p-4`}>
              <p className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Pending Approvals</p>
              <p className={isDarkMode ? 'text-white' : 'text-gray-900'}>{pendingVendors}</p>
            </div>
            <div className={`${isDarkMode ? 'bg-zinc-900 border border-amber-500/20' : 'bg-gray-50'} rounded-xl p-4`}>
              <p className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Active Offers</p>
              <p className={isDarkMode ? 'text-white' : 'text-gray-900'}>{activeOffers}</p>
            </div>
            <div className={`${isDarkMode ? 'bg-zinc-900 border border-amber-500/20' : 'bg-gray-50'} rounded-xl p-4`}>
              <p className={`text-sm mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Pending Offers</p>
              <p className={isDarkMode ? 'text-white' : 'text-gray-900'}>{pendingOffers}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className={`${isDarkMode ? 'bg-black border-b border-amber-500/20' : 'bg-white border-b border-gray-200'}`}>
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? isDarkMode 
                      ? 'border-amber-500 text-amber-500' 
                      : 'border-amber-500 text-amber-600'
                    : isDarkMode 
                      ? 'border-transparent text-gray-400 hover:text-white' 
                      : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
                {tab.badge > 0 && (
                  <span className="bg-amber-500 text-black text-xs px-2 py-1 rounded-full">
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === 'vendors' && <VendorManagement isDarkMode={isDarkMode} />}
        {activeTab === 'offers' && <OfferManagement isDarkMode={isDarkMode} />}
        {activeTab === 'locations' && <LocationManagement isDarkMode={isDarkMode} />}
        {activeTab === 'plans' && <PlanManagement isDarkMode={isDarkMode} />}
      </div>
    </div>
  );
}
