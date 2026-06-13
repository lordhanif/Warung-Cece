import { bestSellers as staticBestSellers } from '../../data';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Search } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, where } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { handleFirestoreError, OperationType } from '../../lib/firebase';

export function BestSellers() {
  const { addItem } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [menuItems, setMenuItems] = useState(staticBestSellers);

  useEffect(() => {
    const q = query(collection(db, 'menus'), where('isAvailable', '==', true));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const items = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as any[];
        setMenuItems(items);
      }
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'menus');
    });
    return () => unsubscribe();
  }, []);

  const filteredItems = menuItems.filter(item => {
    const query = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.spicyLevel.toString() === query ||
      (query === 'pedas' && item.spicyLevel >= 4)
    );
  });

  return (
    <section id="menu" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <h2 className="text-primary font-bold text-sm tracking-widest uppercase mb-2">Our Signature</h2>
          <h3 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">Makan Kenyang, Rasa Bintang</h3>
          <p className="text-gray-600 text-lg">Pilihan menu terfavorit yang selalu sold out setiap harinya. Siap-siap ketagihan!</p>
        </motion.div>

        <div className="max-w-md mx-auto mb-12 relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all shadow-sm"
            placeholder="Cari menu atau level pedas (1-5)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Menu tidak ditemukan. Coba kata kunci lain.</p>
          </div>
        ) : (
          <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredItems.map((item, idx) => (
                <motion.div 
                  layout
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className={`bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group flex flex-col ${item.stock === 0 ? 'opacity-75 grayscale-[0.5]' : ''}`}
                >
                  <div className="relative h-64 overflow-hidden shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className={`w-full h-full object-cover transform ${item.stock > 0 ? 'group-hover:scale-105' : ''} transition-transform duration-500`}
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center pointer-events-none z-10">
                      <div className="bg-white/95 backdrop-blur-sm p-4 rounded-xl shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 text-center">
                        <span className="block font-bold text-gray-900 text-sm mb-1">Nutrisi</span>
                        <div className="flex gap-4 text-xs font-medium text-gray-600">
                          <div>
                            <span className="block text-primary text-base font-bold">{item.calories || '-'}</span>
                            Kalori
                          </div>
                          <div className="w-px bg-gray-200"></div>
                          <div>
                            <span className="block text-primary text-base font-bold">{item.protein || '-'}</span>
                            Protein
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1 shadow-sm border border-gray-100 z-20">
                      <span className="text-xs font-bold text-gray-900 mr-1">Pedas:</span>
                      {[...Array(5)].map((_, i) => (
                        <Flame key={i} className={`w-3.5 h-3.5 ${i < item.spicyLevel ? "text-primary fill-primary" : "text-gray-300"}`} />
                      ))}
                    </div>
                    {item.stock === 0 && (
                      <div className="absolute top-4 left-4 bg-red-600 outline outline-2 outline-white text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-sm uppercase tracking-wide">
                        Habis Terjual
                      </div>
                    )}
                    {item.stock !== undefined && item.stock > 0 && item.stock <= 5 && (
                      <div className="absolute top-4 left-4 bg-orange-500 outline outline-2 outline-white text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-sm uppercase tracking-wide">
                        Sisa {item.stock} Porsi
                      </div>
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4 gap-4">
                      <h4 className="font-bold text-xl text-gray-900 group-hover:text-primary transition-colors">{item.name}</h4>
                      <span className="font-bold text-lg text-primary shrink-0">
                        {typeof item.price === 'number' ? `Rp ${item.price.toLocaleString('id-ID')}` : item.price}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-6 line-clamp-3 md:line-clamp-2 flex-grow">{item.description}</p>
                    <motion.button 
                      whileTap={item.stock > 0 ? { scale: 0.95 } : {}}
                      onClick={(e) => {
                        e.preventDefault();
                        if (item.stock === 0) return;
                        const price = typeof item.price === 'number' ? item.price : parseInt(item.price.replace(/\D/g, ''), 10);
                        addItem({ id: item.id.toString(), name: item.name, price });
                      }}
                      disabled={item.stock === 0}
                      className={`block w-full py-3 px-4 transition-colors text-center rounded-xl font-semibold mt-auto ${item.stock === 0 ? 'bg-gray-200 text-gray-500 cursor-not-allowed' : 'bg-gray-100 hover:bg-primary hover:text-white text-gray-900'}`}
                    >
                      {item.stock === 0 ? 'Habis Terjual' : 'Tambah Keranjang'}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        <div className="text-center mt-12">
          <a href="#" className="inline-flex items-center gap-2 text-primary font-bold hover:text-primary/80 transition-colors">
            Lihat Menu Lengkap &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
