import React from 'react';
import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, doc, deleteDoc, setDoc, serverTimestamp, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { handleFirestoreError, OperationType } from '../../lib/firebase';
import { Plus, Edit2, Trash2, X, Calendar, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Promo {
  id: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  createdAt?: any;
}

export function AdminPromos() {
  const [promos, setPromos] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPromo, setEditingPromo] = useState<Promo | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'promos'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Promo));
      setPromos(items);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'promos');
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Delete this promo?')) {
      try {
        await deleteDoc(doc(db, 'promos', id));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `promos/${id}`);
      }
    }
  };

  const handleToggleActive = async (promo: Promo) => {
    try {
      await setDoc(doc(db, 'promos', promo.id), {
        isActive: !promo.isActive,
        updatedAt: serverTimestamp()
      }, { merge: true });
    } catch (error) {
      handleFirestoreError(error, OperationType.UPDATE, `promos/${promo.id}`);
    }
  };

  const openNewModal = () => {
    const today = new Date().toISOString().split('T')[0];
    setEditingPromo({
      id: crypto.randomUUID(),
      title: '',
      description: '',
      discountType: 'percentage',
      discountValue: 10,
      startDate: today,
      endDate: today,
      isActive: true
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPromo) return;

    try {
      const promoRef = doc(db, 'promos', editingPromo.id);
      await setDoc(promoRef, {
        ...editingPromo,
        updatedAt: serverTimestamp(),
        createdAt: editingPromo.createdAt || serverTimestamp(),
      }, { merge: true });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving promo:", error);
      alert("Failed to save promo");
      handleFirestoreError(error, OperationType.WRITE, `promos/${editingPromo.id}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">Promo Management</h1>
          <p className="text-gray-500">Create and schedule promotional campaigns</p>
        </div>
        <button
          onClick={openNewModal}
          className="bg-primary text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-sm font-medium"
        >
          <Plus className="w-4 h-4" /> Create Promo
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : promos.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No promos found. Click "Create Promo" to start.</div>
        ) : (
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-900">
              <tr>
                <th className="px-6 py-4 font-semibold">Title</th>
                <th className="px-6 py-4 font-semibold">Discount</th>
                <th className="px-6 py-4 font-semibold">Schedule</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {promos.map((promo) => (
                <tr key={promo.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {promo.title}
                    <div className="text-xs text-gray-500 font-normal mt-0.5">{promo.description}</div>
                  </td>
                  <td className="px-6 py-4">
                    {promo.discountType === 'percentage' ? `${promo.discountValue}%` : `Rp ${promo.discountValue.toLocaleString('id-ID')}`}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 whitespace-nowrap">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      {promo.startDate} to {promo.endDate}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => handleToggleActive(promo)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-colors ${
                        promo.isActive 
                          ? 'border-green-200 bg-green-50 text-green-700 hover:bg-green-100' 
                          : 'border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Activity className="w-3 h-3" />
                      {promo.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => { setEditingPromo(promo); setIsModalOpen(true); }} className="text-blue-600 hover:text-blue-800 p-2">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(promo.id)} className="text-red-600 hover:text-red-800 p-2">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal form ... */}
      <AnimatePresence>
        {isModalOpen && editingPromo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">
                  {editingPromo.title ? 'Edit Promo' : 'Create Promo'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="overflow-y-auto p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Promo Title</label>
                    <input type="text" required value={editingPromo.title} onChange={e => setEditingPromo({...editingPromo, title: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary" />
                  </div>
                  
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea rows={2} required value={editingPromo.description} onChange={e => setEditingPromo({...editingPromo, description: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Discount Type</label>
                    <select value={editingPromo.discountType} onChange={e => setEditingPromo({...editingPromo, discountType: e.target.value as 'percentage' | 'fixed'})} className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary">
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount (Rp)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Discount Value</label>
                    <input type="number" required value={editingPromo.discountValue} onChange={e => setEditingPromo({...editingPromo, discountValue: Number(e.target.value)})} className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <input type="date" required value={editingPromo.startDate} onChange={e => setEditingPromo({...editingPromo, startDate: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <input type="date" required value={editingPromo.endDate} onChange={e => setEditingPromo({...editingPromo, endDate: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary" />
                  </div>

                  <div className="col-span-2 flex items-center mt-2">
                    <input type="checkbox" id="isActive" checked={editingPromo.isActive} onChange={e => setEditingPromo({...editingPromo, isActive: e.target.checked})} className="h-4 w-4 text-primary border-gray-300 rounded" />
                    <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                      Instantly Activate Promo
                    </label>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200 flex justify-end gap-3 mt-6">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium">Save Promo</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
