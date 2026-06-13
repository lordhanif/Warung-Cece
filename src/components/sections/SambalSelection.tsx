import { sambals } from '../../data';
import { motion } from 'motion/react';

export function SambalSelection() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background circle */}
      <div className="absolute -left-32 top-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-primary font-bold text-sm tracking-widest uppercase mb-2">Pilih Level Pedasmu</h2>
            <h3 className="font-display text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Sambal Dadakan, <br/>Segar Tiap Hari!
            </h3>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Kami percaya rahasia masakan enak ada di sambalnya. Itulah mengapa semua sambal Warung Cece diulek dadakan saat kamu pesan, memastikan kesegaran dan cita rasa maksimal di setiap suapan.
            </p>
            
            <div className="space-y-4">
              {sambals.map((sambal, idx) => (
                <motion.div 
                  key={sambal.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center shrink-0 ${sambal.color}`}>
                    <sambal.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg text-gray-900">{sambal.name}</h4>
                    <p className="text-gray-600 text-sm mt-1">{sambal.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 translate-y-8">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1596624097960-7058adceeafe?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Sambal Prep" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square rounded-2xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1546549032-9571cd6b27df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Ingredients" className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="space-y-4">
                <div className="aspect-square rounded-2xl overflow-hidden bg-primary p-6 text-white flex flex-col justify-center">
                  <h4 className="font-display text-3xl font-bold mb-2">100%</h4>
                  <p className="text-primary-foreground/80">Bahan Alami Tanpa Pengawet</p>
                </div>
                <div className="aspect-[4/5] rounded-2xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1626804475297-41609ea0dc4eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Spicy Food" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
