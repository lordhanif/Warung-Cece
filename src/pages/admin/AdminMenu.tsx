import React from 'react';
import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, doc, deleteDoc, setDoc, serverTimestamp, orderBy } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { handleFirestoreError, OperationType } from '../../lib/firebase';
import { Plus, Edit2, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  spicyLevel: number;
  stock: number;
  image: string;
  category: string;
  isAvailable: boolean;
  createdAt?: any;
}

export function AdminMenu() {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMenu, setEditingMenu] = useState<MenuItem | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'menus'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MenuItem));
      setMenus(items);
      setLoading(false);
    }, (error) => {
      console.error("Firebase err:", error);
      setLoading(false);
      handleFirestoreError(error, OperationType.LIST, 'menus');
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this menu?')) {
      try {
        await deleteDoc(doc(db, 'menus', id));
      } catch (error) {
        handleFirestoreError(error, OperationType.DELETE, `menus/${id}`);
      }
    }
  };

  const openNewModal = () => {
    setEditingMenu({
      id: crypto.randomUUID(),
      name: '',
      description: '',
      price: 0,
      spicyLevel: 1,
      stock: 10,
      image: '',
      category: 'Main Dish',
      isAvailable: true
    });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMenu) return;

    try {
      const menuRef = doc(db, 'menus', editingMenu.id);
      await setDoc(menuRef, {
        ...editingMenu,
        updatedAt: serverTimestamp(),
        createdAt: editingMenu.createdAt || serverTimestamp(),
      }, { merge: true });
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving menu:", error);
      alert("Failed to save menu");
      handleFirestoreError(error, OperationType.WRITE, `menus/${editingMenu.id}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">Menu Management</h1>
          <p className="text-gray-500">Manage your restaurant catalogue</p>
        </div>
        <button
          onClick={openNewModal}
          className="bg-primary text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-sm font-medium"
        >
          <Plus className="w-4 h-4" /> Add Menu
        </button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : menus.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No menus found. Click "Add Menu" to create one.</div>
        ) : (
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-900">
              <tr>
                <th className="px-6 py-4 font-semibold">Image</th>
                <th className="px-6 py-4 font-semibold">Name</th>
                <th className="px-6 py-4 font-semibold">Price</th>
                <th className="px-6 py-4 font-semibold">Stock</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {menus.map((menu) => (
                <tr key={menu.id} className="border-b border-gray-100 last:border-0 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <img src={menu.image || 'https://via.placeholder.com/150'} alt={menu.name} className="w-12 h-12 object-cover rounded-lg" />
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">{menu.name}</td>
                  <td className="px-6 py-4">Rp {menu.price.toLocaleString('id-ID')}</td>
                  <td className="px-6 py-4">{menu.stock}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${menu.isAvailable ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {menu.isAvailable ? 'Available' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => { setEditingMenu(menu); setIsModalOpen(true); }} className="text-blue-600 hover:text-blue-800 p-2">
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button onClick={() => handleDelete(menu.id)} className="text-red-600 hover:text-red-800 p-2">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal Edit/Add */}
      <AnimatePresence>
        {isModalOpen && editingMenu && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="text-lg font-bold text-gray-900">
                  {editingMenu.name ? 'Edit Menu' : 'Add New Menu'}
                </h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="overflow-y-auto p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input type="text" required value={editingMenu.name} onChange={e => setEditingMenu({...editingMenu, name: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary" />
                  </div>
                  
                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea rows={3} required value={editingMenu.description} onChange={e => setEditingMenu({...editingMenu, description: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price (Rp)</label>
                    <input type="number" required value={editingMenu.price} onChange={e => setEditingMenu({...editingMenu, price: Number(e.target.value)})} className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
                    <input type="number" required value={editingMenu.stock} onChange={e => setEditingMenu({...editingMenu, stock: Number(e.target.value)})} className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Spicy Level (1-5)</label>
                    <input type="number" min="1" max="5" value={editingMenu.spicyLevel} onChange={e => setEditingMenu({...editingMenu, spicyLevel: Number(e.target.value)})} className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary" />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <input type="text" value={editingMenu.category} onChange={e => setEditingMenu({...editingMenu, category: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary" />
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                    <input type="url" value={editingMenu.image} onChange={e => setEditingMenu({...editingMenu, image: e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-primary focus:border-primary" placeholder="https://..." />
                  </div>

                  <div className="col-span-2 flex items-center mt-2">
                    <input type="checkbox" id="isAvailable" checked={editingMenu.isAvailable} onChange={e => setEditingMenu({...editingMenu, isAvailable: e.target.checked})} className="h-4 w-4 text-primary border-gray-300 rounded" />
                    <label htmlFor="isAvailable" className="ml-2 block text-sm text-gray-900">
                      Available for users
                    </label>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200 flex justify-end gap-3 mt-6">
                  <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">Cancel</button>
                  <button type="submit" className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 font-medium">Save Menu</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
