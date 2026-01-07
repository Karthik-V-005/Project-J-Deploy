// Import necessary libraries and components
import { useState } from "react";
import { LogOut, Users, FileText, MapPin, Tag } from "lucide-react";
import { VendorManagement } from "./admin/VendorManagement";
import { OfferManagement } from "./admin/OfferManagement";
import { LocationManagement } from "./admin/LocationManagement";
import { PlanManagement } from "./admin/PlanManagement";
import { mockVendors, mockOffers } from "../data/mockData";

interface AdminDashboardProps {
  onLogout: () => void;
}

type AdminTab = "vendors" | "offers" | "locations" | "plans";

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  // State for managing active tab
  const [activeTab, setActiveTab] = useState<AdminTab>("vendors");

  // Calculate stats for dashboard
  const pendingVendors = mockVendors.filter(
    (v) => v.status === "pending"
  ).length;
  const pendingOffers = mockOffers.filter((o) => o.status === "pending").length;
  const activeOffers = mockOffers.filter((o) => {
    const validUntil = new Date(o.validUntil);
    return o.status === "approved" && validUntil >= new Date();
  }).length;

  // Define tabs for navigation
  const tabs = [
    {
      id: "vendors" as AdminTab,
      label: "Vendor Management",
      icon: Users,
      badge: pendingVendors,
    },
    {
      id: "offers" as AdminTab,
      label: "Offer Management",
      icon: FileText,
      badge: pendingOffers,
    },
    { id: "locations" as AdminTab, label: "Locations", icon: MapPin, badge: 0 },
    {
      id: "plans" as AdminTab,
      label: "Subscription Plans",
      icon: Tag,
      badge: 0,
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "var(--bg-primary)" }} // Apply primary background color
    >
      {/* Header Section */}
      <div
        className=""
        style={{ backgroundColor: "var(--bg-medium)" }} // Removed border-b class
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2
                className="text-gray-900"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Admin Dashboard
              </h2>
              <p
                className="text-sm"
                style={{
                  color: "var(--text-muted)",
                  fontFamily: "var(--font-body)",
                }}
              >
                Manage your jewellery marketplace
              </p>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
              style={{
                color: "var(--color-error)",
                backgroundColor: "var(--bg-tertiary)",
                transition: "var(--transition-smooth)",
              }}
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div
        className="border-b"
        style={{
          backgroundColor: "var(--bg-medium)",
          borderColor: "var(--border-color)",
        }}
      >
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div
              className="rounded-xl p-4"
              style={{
                backgroundColor: "var(--color-white)",
                boxShadow: "var(--card-shadow)",
              }}
            >
              <p
                className="text-sm mb-1"
                style={{ color: "var(--text-muted)" }}
              >
                Total Vendors
              </p>
              <p
                className="text-gray-900"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {mockVendors.length}
              </p>
            </div>
            <div
              className="rounded-xl p-4"
              style={{
                backgroundColor: "var(--color-white)",
                boxShadow: "var(--card-shadow)",
              }}
            >
              <p
                className="text-sm mb-1"
                style={{ color: "var(--text-muted)" }}
              >
                Pending Approvals
              </p>
              <p
                className="text-gray-900"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {pendingVendors}
              </p>
            </div>
            <div
              className="rounded-xl p-4"
              style={{
                backgroundColor: "var(--color-white)",
                boxShadow: "var(--card-shadow)",
              }}
            >
              <p
                className="text-sm mb-1"
                style={{ color: "var(--text-muted)" }}
              >
                Active Offers
              </p>
              <p
                className="text-gray-900"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {activeOffers}
              </p>
            </div>
            <div
              className="rounded-xl p-4"
              style={{
                backgroundColor: "var(--color-white)",
                boxShadow: "var(--card-shadow)",
              }}
            >
              <p
                className="text-sm mb-1"
                style={{ color: "var(--text-muted)" }}
              >
                Pending Offers
              </p>
              <p
                className="text-gray-900"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {pendingOffers}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div
        className="border-b"
        style={{
          backgroundColor: "var(--bg-medium)",
          borderColor: "var(--border-color)",
        }}
      >
        <div className="container mx-auto px-4">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-amber-500 text-amber-600"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
                style={{ fontFamily: "var(--font-body)" }}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
                {tab.badge > 0 && (
                  <span
                    className="text-xs px-2 py-1 rounded-full"
                    style={{
                      backgroundColor: "var(--color-plum-light)",
                      color: "var(--color-white)",
                    }}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-8">
        {activeTab === "vendors" && <VendorManagement />}
        {activeTab === "offers" && <OfferManagement />}
        {activeTab === "locations" && <LocationManagement />}
        {activeTab === "plans" && <PlanManagement />}
      </div>
    </div>
  );
}
