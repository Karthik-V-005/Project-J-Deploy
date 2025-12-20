import { useState } from 'react';
import { subscriptionPlans } from '../../data/mockData';
import { SubscriptionPlan } from '../../types';
import { Edit2, Save, X } from 'lucide-react';

interface PlanManagementProps {
  isDarkMode: boolean;
}

export function PlanManagement({ isDarkMode }: PlanManagementProps) {
  const [plans, setPlans] = useState(subscriptionPlans);
  const [editingPlan, setEditingPlan] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{ price: number; posts: number; months: number }>({ 
    price: 0, 
    posts: 0,
    months: 1
  });

  const handleEdit = (plan: SubscriptionPlan) => {
    setEditingPlan(plan.id);
    setEditValues({ price: plan.price, posts: plan.posts, months: plan.months });
  };

  const handleSave = (planId: string) => {
    setPlans(plans.map(p => 
      p.id === planId 
        ? { ...p, price: editValues.price, posts: editValues.posts, months: editValues.months }
        : p
    ));
    setEditingPlan(null);
  };

  const handleCancel = () => {
    setEditingPlan(null);
  };

  return (
    <div className={`${isDarkMode ? 'bg-zinc-900 border border-amber-500/20' : 'bg-white'} rounded-xl shadow-md p-6`}>
      <h3 className={isDarkMode ? 'text-white' : 'text-gray-900'}>Subscription Plans Management</h3>
      <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>Modify pricing and post limits for subscription plans</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div 
            key={plan.id} 
            className={`border-2 ${isDarkMode ? 'border-amber-500/20 bg-black' : 'border-gray-200'} rounded-xl p-6`}
          >
            <div className="text-center mb-4">
              <h4 className={`mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{plan.name}</h4>
              
              {editingPlan === plan.id ? (
                <div className="space-y-3">
                  <div>
                    <label className={`block text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Price (₹)</label>
                    <input
                      type="number"
                      value={editValues.price}
                      onChange={(e) => setEditValues({ ...editValues, price: parseInt(e.target.value) || 0 })}
                      className={`w-full px-3 py-2 rounded-lg border text-center ${
                        isDarkMode 
                          ? 'bg-zinc-900 border-amber-500/20 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Posts</label>
                    <input
                      type="number"
                      value={editValues.posts}
                      onChange={(e) => setEditValues({ ...editValues, posts: parseInt(e.target.value) || 0 })}
                      className={`w-full px-3 py-2 rounded-lg border text-center ${
                        isDarkMode 
                          ? 'bg-zinc-900 border-amber-500/20 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                    />
                  </div>
                  <div>
                    <label className={`block text-xs mb-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Months</label>
                    <input
                      type="number"
                      value={editValues.months}
                      onChange={(e) => setEditValues({ ...editValues, months: parseInt(e.target.value) || 1 })}
                      className={`w-full px-3 py-2 rounded-lg border text-center ${
                        isDarkMode 
                          ? 'bg-zinc-900 border-amber-500/20 text-white' 
                          : 'bg-white border-gray-300'
                      }`}
                    />
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-3">
                    <span className="text-amber-500">₹{plan.price}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className={`${isDarkMode ? 'bg-zinc-900 border border-amber-500/20' : 'bg-gray-50'} rounded-lg p-3`}>
                      <p className={`mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{plan.posts}</p>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Posts</p>
                    </div>
                    <div className={`${isDarkMode ? 'bg-zinc-900 border border-amber-500/20' : 'bg-gray-50'} rounded-lg p-3`}>
                      <p className={`mb-1 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>{plan.months}</p>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Month{plan.months > 1 ? 's' : ''}</p>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="space-y-2">
              {editingPlan === plan.id ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSave(plan.id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg transition-colors ${
                      isDarkMode 
                        ? 'bg-zinc-800 text-white hover:bg-zinc-700' 
                        : 'bg-gray-500 text-white hover:bg-gray-600'
                    }`}
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleEdit(plan)}
                  className="w-full flex items-center justify-center gap-2 bg-amber-500 text-black py-2 rounded-lg hover:bg-amber-600 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Plan
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Plan Features */}
      <div className={`mt-8 p-6 rounded-xl ${isDarkMode ? 'bg-amber-500/10 border border-amber-500/20' : 'bg-blue-50'}`}>
        <h4 className={isDarkMode ? 'text-white' : 'text-gray-900'}>Plan Features</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <div>
            <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>All plans include:</p>
            <ul className={`space-y-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <li>• Admin approval for all offers</li>
              <li>• Analytics dashboard access</li>
              <li>• Edit and delete offer capabilities</li>
              <li>• Google Maps integration</li>
            </ul>
          </div>
          <div>
            <p className={`text-sm mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Post count management:</p>
            <ul className={`space-y-1 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              <li>• Posts reduce when offers are published</li>
              <li>• Expired offers don't refund posts</li>
              <li>• Vendors can purchase new plans anytime</li>
              <li>• Posts from multiple plans accumulate</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
