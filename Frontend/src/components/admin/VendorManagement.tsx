import { useState } from "react";
import { mockVendors } from "../../data/mockData";
import { Vendor, VendorStatus } from "../../types";
import { CheckCircle, XCircle, Ban, Search, Eye } from "lucide-react";

export function VendorManagement() {
  const [vendors, setVendors] = useState(mockVendors);
  const [filterStatus, setFilterStatus] = useState<VendorStatus | "all">("all");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);

  const filteredVendors = vendors.filter((vendor) => {
    const matchesStatus =
      filterStatus === "all" || vendor.status === filterStatus;
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleApprove = (vendorId: string) => {
    setVendors(
      vendors.map((v) => (v.id === vendorId ? { ...v, status: "approved" } : v))
    );
    setSelectedVendor(null);
  };

  const handleReject = (vendorId: string) => {
    setVendors(
      vendors.map((v) => (v.id === vendorId ? { ...v, status: "rejected" } : v))
    );
    setSelectedVendor(null);
  };

  const handleSuspend = (vendorId: string) => {
    setVendors(
      vendors.map((v) =>
        v.id === vendorId ? { ...v, status: "suspended" } : v
      )
    );
    setSelectedVendor(null);
  };

  const getStatusBadge = (status: VendorStatus) => {
    switch (status) {
      case "approved":
        return (
          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
            Approved
          </span>
        );
      case "pending":
        return (
          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
            Pending
          </span>
        );
      case "rejected":
        return (
          <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">
            Rejected
          </span>
        );
      case "suspended":
        return (
          <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
            Suspended
          </span>
        );
    }
  };

  const statusOptions: (VendorStatus | "all")[] = [
    "all",
    "pending",
    "approved",
    "rejected",
    "suspended",
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h3 className="text-gray-900">Vendor Management</h3>
      <p className="text-gray-600 mb-6">Manage vendor details and statuses</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Search Vendors */}
        <div>
          <label className="block text-sm mb-2 text-gray-600">
            Search Vendors
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, business, or email..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300"
            />
          </div>
        </div>

        {/* Filter by Status */}
        <div>
          <label className="block text-sm mb-2 text-gray-600">
            Filter by Status
          </label>
          <div className="relative">
            <button
              onClick={() => setIsFilterOpen((prev) => !prev)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 flex items-center justify-between"
            >
              {filterStatus === "all"
                ? "All Statuses"
                : filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)}
              <span>▾</span>
            </button>

            {isFilterOpen && (
              <div className="absolute left-0 top-full mt-2 z-50 w-full rounded-lg shadow-lg border bg-white">
                {statusOptions.map((status) => (
                  <button
                    key={status}
                    onClick={() => {
                      setFilterStatus(status);
                      setIsFilterOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    {status === "all"
                      ? "All Statuses"
                      : status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Vendors Table */}
      <div className="overflow-x-auto mt-6">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-300">
              <th className="text-left py-3 px-4 text-gray-600">Vendor</th>
              <th className="text-left py-3 px-4 text-gray-600">
                Business Name
              </th>
              <th className="text-left py-3 px-4 text-gray-600">Email</th>
              <th className="text-left py-3 px-4 text-gray-600">Status</th>
              <th className="text-left py-3 px-4 text-gray-600">
                Remaining Posts
              </th>
              <th className="text-left py-3 px-4 text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVendors.map((vendor) => (
              <tr key={vendor.id} className="border-b border-gray-300">
                <td className="py-3 px-4">
                  <p className="text-gray-900 font-medium">{vendor.name}</p>
                  <p className="text-sm text-gray-600">{vendor.phone}</p>
                </td>
                <td className="py-3 px-4 text-gray-900">
                  {vendor.businessName}
                </td>
                <td className="py-3 px-4 text-gray-900">{vendor.email}</td>
                <td className="py-3 px-4">{getStatusBadge(vendor.status)}</td>
                <td className="py-3 px-4 text-gray-900">
                  {vendor.remainingPosts}
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => setSelectedVendor(vendor)}
                    className="text-blue-600 hover:text-blue-700 text-sm"
                  >
                    <Eye className="w-4 h-4" /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredVendors.length === 0 && (
          <div className="text-center py-8 text-gray-500">No vendors found</div>
        )}
      </div>

      {/* Vendor Details Modal */}
      {selectedVendor && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/30">
          <div className="rounded-2xl shadow-xl border w-full max-w-3xl bg-white max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 p-6 flex items-center justify-between border-b border-gray-300 bg-white">
              <h2 className="text-lg font-medium text-gray-900">
                Vendor Details
              </h2>
              <button
                onClick={() => setSelectedVendor(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <XCircle className="w-6 h-6 text-gray-900" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between p-4 rounded-xl border bg-gray-50 border-gray-300">
                <span className="text-gray-600">Current Status</span>
                {getStatusBadge(selectedVendor.status)}
              </div>

              {/* Personal Information */}
              <div>
                <h3 className="text-amber-400 mb-3">Personal Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="text-foreground">{selectedVendor.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="text-foreground">{selectedVendor.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="text-foreground">{selectedVendor.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Registered On
                    </p>
                    <p className="text-foreground">
                      {new Date(selectedVendor.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Business Information */}
              <div>
                <h3 className="text-amber-400 mb-3">Business Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Business Name
                    </p>
                    <p className="text-foreground">
                      {selectedVendor.businessName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">GST Number</p>
                    <p className="text-foreground">
                      {selectedVendor.gstNumber}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Remaining Posts
                    </p>
                    <p className="text-foreground">
                      {selectedVendor.remainingPosts}
                    </p>
                  </div>
                </div>
              </div>

              {/* KYC Documents */}
              <div>
                <h3 className="text-amber-400 mb-3">KYC Documents</h3>
                <div className="space-y-2">
                  {selectedVendor.kycDocuments.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg border bg-gray-100 border-gray-200"
                    >
                      <span className="text-foreground">{doc}</span>
                      <button className="text-blue-600 hover:text-blue-700 text-sm">
                        View
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                {selectedVendor.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleApprove(selectedVendor.id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Approve Vendor
                    </button>
                    <button
                      onClick={() => handleReject(selectedVendor.id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600"
                    >
                      <XCircle className="w-5 h-5" />
                      Reject Vendor
                    </button>
                  </>
                )}

                {selectedVendor.status === "approved" && (
                  <button
                    onClick={() => handleSuspend(selectedVendor.id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600"
                  >
                    <Ban className="w-5 h-5" />
                    Suspend Vendor
                  </button>
                )}

                {selectedVendor.status === "suspended" && (
                  <button
                    onClick={() => handleApprove(selectedVendor.id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Reactivate Vendor
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
