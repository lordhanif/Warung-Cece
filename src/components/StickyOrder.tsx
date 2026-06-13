import { useState, useEffect } from 'react';
import { ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';

export function StickyOrder() {
  const [show, setShow] = useState(false);
  const { totalItems, setIsOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past hero section
      setShow(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50"
        >
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-3 bg-primary hover:bg-primary/90 text-white px-6 py-4 rounded-full shadow-2xl font-bold font-sans transition-transform transform hover:scale-105 active:scale-95"
          >
            <div className="relative">
              <ShoppingBag className="w-6 h-6" />
              {totalItems > 0 ? (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-accent text-gray-900 text-xs flex items-center justify-center rounded-full border-2 border-primary font-bold">
                  {totalItems}
                </span>
              ) : (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full border-2 border-primary animate-pulse"></span>
              )}
            </div>
            <span className="hidden sm:inline">Pesanan Saya</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
