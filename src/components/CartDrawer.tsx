import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';

export function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQuantity, totalPrice } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  const generateOrderId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let id = '';
    for (let i = 0; i < 6; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `WC-${id}`;
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    const orderId = generateOrderId();
    
    let message = `*ORDER BARU* (ID: ${orderId})\n\n`;
    message += 'Halo Warung Cece, saya mau pesan:\n\n';
    items.forEach(item => {
      message += `- ${item.name} (${item.quantity}x) = ${formatPrice(item.price * item.quantity)}\n`;
    });
    message += `\n*Total: ${formatPrice(totalPrice)}*\n\nMohon info untuk ketersediaannya ya. Terima kasih!`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/6281234567890?text=${encodedMessage}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[60]"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
          >
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-primary" />
                <h2 className="font-bold text-lg text-gray-900">Pesanan Saya</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-500">
                  <ShoppingBag className="w-16 h-16 mb-4 text-gray-300" />
                  <p>Keranjang masih kosong.</p>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="mt-4 text-primary font-bold hover:text-primary/80 transition-colors"
                  >
                    Mulai Pesan
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex flex-col gap-3 bg-gray-50 p-4 rounded-2xl">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-gray-900 line-clamp-2 pr-4">{item.name}</h4>
                        <button onClick={() => updateQuantity(item.id, 0)} className="text-gray-400 hover:text-red-500 transition-colors">
                            <X className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-primary font-bold text-sm">
                            {formatPrice(item.price)}
                        </p>
                        <div className="flex items-center gap-3 bg-white px-2 py-1 rounded-full shadow-sm border border-gray-100">
                            <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                            >
                            <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-4 text-center font-bold text-sm">{item.quantity}</span>
                            <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                            >
                            <Plus className="w-4 h-4" />
                            </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-white">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-600 font-medium">Total Pesanan</span>
                  <span className="text-2xl font-bold text-gray-900">{formatPrice(totalPrice)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-full font-bold text-lg shadow-lg shadow-primary/30 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Checkout via WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
