import { useState } from "react";
import { mockOffers } from "../../data/mockData";
import { Offer, OfferStatus } from "../../types";
import { CheckCircle, XCircle, Search, Eye, Trash2 } from "lucide-react";

export function OfferManagement() {
  const [offers, setOffers] = useState(mockOffers);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<OfferStatus | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  const filteredOffers = offers.filter((offer) => {
    const matchesStatus =
      filterStatus === "all" || offer.status === filterStatus;
    const matchesSearch =
      offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      offer.vendorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleApprove = (offerId: string) => {
    setOffers(
      offers.map((o) =>
        o.id === offerId ? { ...o, status: "approved" as OfferStatus } : o
      )
    );
    setSelectedOffer(null);
  };

  const handleReject = (offerId: string) => {
    setOffers(
      offers.map((o) =>
        o.id === offerId ? { ...o, status: "rejected" as OfferStatus } : o
      )
    );
    setSelectedOffer(null);
  };

  const handleDelete = (offerId: string) => {
    if (confirm("Are you sure you want to delete this offer?")) {
      setOffers(offers.filter((o) => o.id !== offerId));
      setSelectedOffer(null);
    }
  };

  const getStatusBadge = (status: OfferStatus) => {
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
      case "expired":
        return (
          <span className="px-3 py-1 bg-gray-100 text-foreground rounded-full text-sm">
            Expired
          </span>
        );
    }
  };

  const statusOptions: (OfferStatus | "all")[] = [
    "all",
    "pending",
    "approved",
    "rejected",
    "expired",
  ];

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-gray-900">Offer Management</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-gray-600 mb-3">Search Offers</h4>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title or vendor..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300"
              />
            </div>
          </div>

          <div>
            <h4 className="text-gray-600 mb-3">Filter by Status</h4>
            <div className="relative">
              <button
                onClick={() => setIsFilterOpen((prev) => !prev)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 flex items-center justify-between"
              >
                {filterStatus === "all"
                  ? "All Statuses"
                  : filterStatus.charAt(0).toUpperCase() +
                    filterStatus.slice(1)}
                <span>▾</span>
              </button>

              {isFilterOpen && (
                <div className="absolute left-0 top-full mt-2 z-50 w-full rounded-lg shadow-lg border border-gray-300 bg-white">
                  {statusOptions.map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setFilterStatus(status);
                        setIsFilterOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 transition-all border-l-4 border-transparent hover:border-gray-300"
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
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredOffers.map((offer) => (
          <div
            key={offer.id}
            className="border rounded-xl overflow-hidden hover:shadow-lg transition-shadow bg-gray-50"
          >
            <div className="relative h-40">
              <img
                src={offer.posterUrl}
                alt={offer.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 right-2">
                {getStatusBadge(offer.status)}
              </div>
            </div>
            <div className="p-4">
              <h4 className="mb-1 text-gray-900">{offer.title}</h4>
              <p className="text-sm mb-2 text-gray-600">{offer.vendorName}</p>
              <div className="flex items-center justify-between text-xs mb-3 text-gray-500">
                <span>{offer.category}</span>
                <span>
                  Valid until {new Date(offer.validUntil).toLocaleDateString()}
                </span>
              </div>
              <button
                onClick={() => setSelectedOffer(offer)}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600"
              >
                <Eye className="w-4 h-4" />
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredOffers.length === 0 && (
        <div className="text-center py-8 text-gray-500">No offers found</div>
      )}

      {/* Offer Details Modal */}
      {selectedOffer && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.3)" }}
        >
          <div
            className="rounded-2xl shadow-xl border w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            style={{
              backgroundColor: "var(--bg-primary)",
              color: "var(--text-primary)",
              borderColor: "var(--border-color)",
            }}
          >
            <div
              className="sticky top-0 p-6 flex items-center justify-between border-b"
              style={{
                backgroundColor: "var(--bg-primary)",
                borderColor: "var(--border-color)",
              }}
            >
              <h2
                className="text-lg font-medium"
                style={{ color: "var(--text-secondary)" }}
              >
                Offer Details
              </h2>
              <button
                onClick={() => setSelectedOffer(null)}
                className="p-2 rounded-lg"
                style={{ backgroundColor: "var(--bg-tertiary)" }}
              >
                <XCircle
                  className="w-6 h-6"
                  style={{ color: "var(--text-primary)" }}
                />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Poster */}
              <div>
                <img
                  src={selectedOffer.posterUrl}
                  alt={selectedOffer.title}
                  className="w-full h-64 object-cover rounded-xl"
                />
              </div>

              {/* Status */}
              <div
                className="flex items-center justify-between p-4 rounded-xl border"
                style={{
                  backgroundColor: "var(--bg-tertiary)",
                  borderColor: "var(--border-color)",
                }}
              >
                <span style={{ color: "var(--text-muted)" }}>
                  Current Status
                </span>
                {getStatusBadge(selectedOffer.status)}
              </div>

              {/* Offer Info */}
              <div>
                <h3 className="text-foreground mb-3">Offer Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Title</p>
                    <p className="text-foreground">{selectedOffer.title}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Description</p>
                    <p className="text-foreground">
                      {selectedOffer.description}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Category</p>
                      <p className="text-foreground">
                        {selectedOffer.category}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Discount Type
                      </p>
                      <p className="text-foreground">
                        {selectedOffer.discountType}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Valid From
                      </p>
                      <p className="text-foreground">
                        {new Date(selectedOffer.validFrom).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Valid Until
                      </p>
                      <p className="text-foreground">
                        {new Date(
                          selectedOffer.validUntil
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
