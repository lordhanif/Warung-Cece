import { motion } from 'motion/react';
import { Percent, Clock } from 'lucide-react';

export function PromoBanner() {
  return (
    <section id="promo" className="py-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-primary rounded-3xl overflow-hidden shadow-2xl"
        >
          <div className="grid md:grid-cols-5 items-center">
            <div className="md:col-span-3 p-8 md:p-12 text-white">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur px-3 py-1.5 rounded-full text-sm font-medium mb-6">
                <Percent className="w-4 h-4" /> Happy Hour Promo
              </div>
              <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">Diskon 20% Es Jeruk Manis</h2>
              <p className="text-white/80 text-lg mb-8 max-w-md">
                Segarkan tenggorokanmu setelah pedasnya sambal tempong. Berlaku setiap hari Senin-Kamis.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <a href="https://wa.me/6281234567890" className="w-full sm:w-auto bg-accent hover:bg-accent-dark text-gray-900 px-8 py-3.5 rounded-full font-bold transition-colors text-center">
                  Klaim Promo
                </a>
                <div className="flex items-center gap-2 text-white/80 text-sm">
                  <Clock className="w-4 h-4" /> Berlaku jam 14.00 - 17.00 WIB
                </div>
              </div>
            </div>
            <div className="md:col-span-2 h-64 md:h-full relative hidden md:block">
              {/* Using a placeholder for iced drink */}
              <img src="https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Es Jeruk Segar" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-transparent md:w-1/2"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
