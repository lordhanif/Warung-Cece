import { motion } from 'motion/react';
import { MapPin, Phone, Clock } from 'lucide-react';

export function LocationMap() {
  return (
    <section id="location" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-primary font-bold text-sm tracking-widest uppercase mb-2">Kunjungi Kami</h2>
          <h3 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-4">Lokasi Warung Cece</h3>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-6 rounded-2xl"
            >
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Alamat</h4>
                  <p className="text-gray-600 text-sm">Jl. Ngagel Jaya Selatan No. 123, Baratajaya, Kec. Gubeng, Kota SBY, Jawa Timur 60284</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gray-50 p-6 rounded-2xl"
            >
              <div className="flex items-start gap-4">
                <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Jam Buka</h4>
                  <p className="text-gray-600 text-sm">Senin - Minggu<br/>10.00 - 22.00 WIB</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gray-50 p-6 rounded-2xl"
            >
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">Hubungi Kami</h4>
                  <p className="text-gray-600 text-sm">WA: 0812-3456-7890<br/>IG: @warungcece</p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="md:col-span-2 h-96 rounded-2xl overflow-hidden shadow-lg border border-gray-100"
          >
            {/* Simple static map placeholder or embed */}
            <iframe 
              src="https://maps.google.com/maps?q=Surabaya&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={false} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Lokasi Warung Cece"
            ></iframe>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
