import { useState } from 'react';
import { mockOffers } from '../../data/mockData';
import { Offer, OfferStatus } from '../../types';
import { CheckCircle, XCircle, Search, Eye, Trash2 } from 'lucide-react';

interface OfferManagementProps {
  isDarkMode: boolean;
}

export function OfferManagement({ isDarkMode }: OfferManagementProps) {
  const [offers, setOffers] = useState(mockOffers);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState<OfferStatus | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  const filteredOffers = offers.filter(offer => {
    const matchesStatus = filterStatus === 'all' || offer.status === filterStatus;
    const matchesSearch = offer.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         offer.vendorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleApprove = (offerId: string) => {
    setOffers(offers.map(o => 
      o.id === offerId ? { ...o, status: 'approved' as OfferStatus } : o
    ));
    setSelectedOffer(null);
  };

  const handleReject = (offerId: string) => {
    setOffers(offers.map(o => 
      o.id === offerId ? { ...o, status: 'rejected' as OfferStatus } : o
    ));
    setSelectedOffer(null);
  };

  const handleDelete = (offerId: string) => {
    if (confirm('Are you sure you want to delete this offer?')) {
      setOffers(offers.filter(o => o.id !== offerId));
      setSelectedOffer(null);
    }
  };

  const getStatusBadge = (status: OfferStatus) => {
    switch (status) {
      case 'approved':
        return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">Approved</span>;
      case 'pending':
        return <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">Pending</span>;
      case 'rejected':
        return <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm">Rejected</span>;
      case 'expired':
        return <span className="px-3 py-1 bg-gray-100 text-foreground rounded-full text-sm">Expired</span>;
    }
  };

  const statusOptions: (OfferStatus | 'all')[] = [
  'all',
  'pending',
  'approved',
  'rejected',
  'expired',
];


  return (
    <div>
      <div className="bg-card text-card-foreground rounded-xl shadow-md p-6 mb-6">
        <h3 className="text-muted-foreground mb-4">Offer Management</h3>
        
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm mb-2 text-muted-foreground">Search Offers</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title or vendor..."
                className="w-full pl-10 pr-4 py-2 rounded-lg
                      bg-card text-foreground
                      border border-border"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm mb-2 text-muted-foreground">Filter by Status</label>
            <div className="relative">
            <button
              onClick={() => setIsFilterOpen(prev => !prev)}
              className="
                w-full px-4 py-2 rounded-lg
                bg-card text-foreground
                border border-border
                flex items-center justify-between
                hover:border-amber-500">
              {filterStatus === 'all'? 'All Statuses': filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)}
              <span>▾</span>
            </button>

  {/* Dropdown */}
            {isFilterOpen && (
           <div className={`absolute left-0 top-full mt-2  z-50 w-full rounded-lg shadow-lg border ${isDarkMode ? 'bg-zinc-900 border-zinc-700 text-white': 'bg-white border-gray-200 text-black'}`}>
            {statusOptions.map(status => (
            <button
                key={status}
                onClick={() => {
                  setFilterStatus(status);
                  setIsFilterOpen(false);
                }}
                className="
                 w-full text-left px-4 py-2
                transition-all duration-200
                hover:bg-amber-500/20
                hover:text-amber-500
                hover:pl-6
                border-l-4 border-transparent
               hover:border-amber-500" >
             {status === 'all'? 'All Statuses': status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
                ))}
              </div>
               )}
            </div>

          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOffers.map((offer) => (
            <div key={offer.id} className=" bg-card text-card-foreground  border border-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
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
                <h4 className="text-foreground mb-1">{offer.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">{offer.vendorName}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <span>{offer.category}</span>
                  <span>Valid until {new Date(offer.validUntil).toLocaleDateString()}</span>
                </div>
                <button
                  onClick={() => setSelectedOffer(offer)}
                  className="w-full flex items-center justify-center gap-2 bg-blue-50 text-blue-600 py-2 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredOffers.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No offers found
          </div>
        )}
      </div>

      {/* Offer Details Modal */}
      {selectedOffer && (
         <div className={`fixed inset-0 flex items-center justify-center z-50 p-4 ${isDarkMode ? 'bg-black/80' : 'bg-black/30'}`}>
          <div className={`rounded-2xl shadow-xl border w-full max-w-3xl max-h-[90vh] overflow-y-auto ${isDarkMode ? 'bg-zinc-900 text-white border-zinc-800': 'bg-white text-black border-gray-200'}`}>
            <div className={`sticky top-0 p-6 flex items-center justify-between border-b ${isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-gray-200'}`}>
              <h2>Offer Details</h2>
              <button
                onClick={() => setSelectedOffer(null)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <XCircle className="w-6 h-6" />
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
              <div className={`flex items-center justify-between p-4 rounded-xl border ${isDarkMode ? 'bg-zinc-800 border-zinc-700' : 'bg-gray-100 border-gray-200'}`}>
                <span className="text-foreground">Current Status</span>
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
                    <p className="text-foreground">{selectedOffer.description}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Category</p>
                      <p className="text-foreground">{selectedOffer.category}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Discount Type</p>
                      <p className="text-foreground">{selectedOffer.discountType}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Valid From</p>
                      <p className="text-foreground">{new Date(selectedOffer.validFrom).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Valid Until</p>
                      <p className="text-foreground">{new Date(selectedOffer.validUntil).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vendor Info */}
              <div>
                <h3 className="text-foreground mb-3">Vendor Information</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Vendor</p>
                    <p className="text-foreground">{selectedOffer.vendorName}</p>
                  </div>
                </div>
              </div>

              {/* Shop Info */}
              <div>
                <h3 className="text-foreground mb-3">Shop Details</h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Shop Name</p>
                    <p className="text-foreground">{selectedOffer.shop.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="text-foreground">{selectedOffer.shop.address}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">State</p>
                      <p className="text-foreground">{selectedOffer.shop.location.state}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">City</p>
                      <p className="text-foreground">{selectedOffer.shop.location.city}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Pincode</p>
                      <p className="text-foreground">{selectedOffer.shop.location.pincode}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="text-foreground">{selectedOffer.shop.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Google Maps</p>
                    <a
                      href={selectedOffer.shop.googleMapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      View on Google Maps
                    </a>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                {selectedOffer.status === 'pending' && (
                  <>
                    <button
                      onClick={() => handleApprove(selectedOffer.id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <CheckCircle className="w-5 h-5" />
                      Approve Offer
                    </button>
                    <button
                      onClick={() => handleReject(selectedOffer.id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <XCircle className="w-5 h-5" />
                      Reject Offer
                    </button>
                  </>
                )}
                {(selectedOffer.status === 'approved' || selectedOffer.status === 'rejected' || selectedOffer.status === 'expired') && (
                  <button
                    onClick={() => handleDelete(selectedOffer.id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white py-3 rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                    Delete Offer
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
