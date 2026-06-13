import { Instagram } from 'lucide-react';
import { motion } from 'motion/react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-display font-bold text-lg">
                C
              </div>
              <span className="font-display font-bold text-2xl text-white tracking-tight">Warung Cece</span>
            </div>
            <p className="text-gray-400 text-sm mb-6 max-w-sm">
              Menyajikan penyetan dan tempong autentik Surabaya dengan sambal yang selalu segar setiap hari. Rasa jujur, harga akur.
            </p>
            <div className="flex gap-4">
              <a href="https://instagram.com" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold text-lg mb-6">Navigasi</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#menu" className="hover:text-white transition-colors">Menu Utama</a></li>
              <li><a href="#promo" className="hover:text-white transition-colors">Promo Terkini</a></li>
              <li><a href="#reviews" className="hover:text-white transition-colors">Testimoni</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6">Tersedia di</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div> GoFood
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-500"></div> ShopeeFood
              </li>
              <li className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div> GrabFood
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="font-bold text-sm mb-2">Pembayaran Kasir</h4>
              <p className="text-xs text-gray-400">Cash, QRIS, Transfer Bank</p>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} Warung Cece Surabaya. All rights reserved.</p>
          <p>Made with ❤️ in Suroboyo</p>
        </div>
      </motion.div>
    </footer>
  );
}
