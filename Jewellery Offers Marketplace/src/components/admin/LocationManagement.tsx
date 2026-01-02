import { useState } from 'react';
import { states, citiesByState, pincodesByCity } from '../../data/mockData';
import { Plus, Trash2, MapPin } from 'lucide-react';



export function LocationManagement() {
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [newState, setNewState] = useState('');
  const [newCity, setNewCity] = useState('');
  const [newPincode, setNewPincode] = useState('');

  const availableCities = selectedState ? citiesByState[selectedState] || [] : [];
  const availablePincodes = selectedCity ? pincodesByCity[selectedCity] || [] : [];

  return (
    <div className="space-y-6">
      {/* States Management */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-gray-900 mb-4">States Management</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Add State */}
          <div>
            <h4 className="text-gray-700 mb-3">Add New State</h4>
            <div className="flex gap-2">
              <input
                type="text"
                value={newState}
                onChange={(e) => setNewState(e.target.value)}
                placeholder="Enter state name"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300"
              />
              <button
                onClick={() => {
                  if (newState.trim()) {
                    alert(`State "${newState}" added successfully!`);
                    setNewState('');
                  }
                }}
                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
          </div>

          {/* Existing States */}
          <div>
            <h4 className="text-gray-700 mb-3">Existing States ({states.length})</h4>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {states.map((state) => (
                <div key={state} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-600" />
                    <span className="text-gray-900">{state}</span>
                  </div>
                  <button className="text-red-600 hover:text-red-700">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cities Management */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-gray-900 mb-4">Cities Management</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Add City */}
          <div>
            <h4 className="text-gray-700 mb-3">Add New City</h4>
            <div className="space-y-3">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300"
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  placeholder="Enter city name"
                  disabled={!selectedState}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50"
                />
                <button
                  onClick={() => {
                    if (newCity.trim() && selectedState) {
                      alert(`City "${newCity}" added to ${selectedState}!`);
                      setNewCity('');
                    }
                  }}
                  disabled={!selectedState}
                  className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Existing Cities */}
          <div>
            <h4 className="text-gray-700 mb-3">Cities by State</h4>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 mb-3"
            >
              <option value="">Select State to View Cities</option>
              {states.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            {selectedState && (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {availableCities.map((city) => (
                  <div key={city} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-900">{city}</span>
                    </div>
                    <button className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {availableCities.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">No cities added yet</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pincodes Management */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-gray-900 mb-4">Pincodes Management</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Add Pincode */}
          <div>
            <h4 className="text-gray-700 mb-3">Add New Pincode</h4>
            <div className="space-y-3">
              <select
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value);
                  setSelectedCity('');
                }}
                className="w-full px-4 py-2 rounded-lg border border-gray-300"
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                disabled={!selectedState}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50"
              >
                <option value="">Select City</option>
                {availableCities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newPincode}
                  onChange={(e) => setNewPincode(e.target.value)}
                  placeholder="Enter pincode"
                  disabled={!selectedCity}
                  className="flex-1 px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50"
                />
                <button
                  onClick={() => {
                    if (newPincode.trim() && selectedCity) {
                      alert(`Pincode "${newPincode}" added to ${selectedCity}!`);
                      setNewPincode('');
                    }
                  }}
                  disabled={!selectedCity}
                  className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Existing Pincodes */}
          <div>
            <h4 className="text-gray-700 mb-3">Pincodes by City</h4>
            <select
              value={selectedState}
              onChange={(e) => {
                setSelectedState(e.target.value);
                setSelectedCity('');
              }}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 mb-2"
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              disabled={!selectedState}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 mb-3 disabled:opacity-50"
            >
              <option value="">Select City</option>
              {availableCities.map((city) => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
            {selectedCity && (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {availablePincodes.map((pincode) => (
                  <div key={pincode} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-600" />
                      <span className="text-gray-900">{pincode}</span>
                    </div>
                    <button className="text-red-600 hover:text-red-700">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                {availablePincodes.length === 0 && (
                  <p className="text-sm text-gray-500 text-center py-4">No pincodes added yet</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
