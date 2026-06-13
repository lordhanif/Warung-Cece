import { motion } from 'motion/react';
import { Award, QrCode } from 'lucide-react';

export function Rewards() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-12"
        >
          <div className="md:w-1/2 flex-shrink-0">
            <div className="aspect-square max-h-80 mx-auto bg-gradient-to-tr from-primary to-accent rounded-3xl p-1 shadow-2xl rotate-3">
              <div className="w-full h-full bg-white rounded-[1.4rem] p-8 flex flex-col items-center justify-center text-center">
                <QrCode className="w-32 h-32 text-gray-900 mb-4" />
                <p className="font-bold text-gray-900 mb-1">Scan untuk Daftar</p>
                <p className="text-xs text-gray-500">Cece Loyalty Program</p>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/20 text-accent-dark font-medium text-sm mb-4">
              <Award className="w-4 h-4" /> Member Exclusive
            </div>
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">Cece Rewards</h2>
            <p className="text-gray-600 text-lg mb-8">
              Kumpulkan Stamp dari setiap pembelian min. Rp 35.000. Dapatkan 1 Stamp bernilai Rp 5.000 untuk ditukar di pembelian selanjutnya!
            </p>
            <ul className="space-y-4 mb-8 text-left">
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 text-secondary flex items-center justify-center font-bold text-xs">1</div>
                <span className="text-gray-700">Daftar via WhatsApp</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 text-secondary flex items-center justify-center font-bold text-xs">2</div>
                <span className="text-gray-700">Tunjukkan barcode saat bayar di kasir</span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-green-100 text-secondary flex items-center justify-center font-bold text-xs">3</div>
                <span className="text-gray-700">Perut kenyang, kantong tenang</span>
              </li>
            </ul>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="inline-block bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-bold transition-colors shadow-lg shadow-primary/20">
              Daftar Sekarang
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
