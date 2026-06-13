import { motion } from 'motion/react';
import { ArrowRight, Star } from 'lucide-react';
import { features } from '../../data';

export function Hero() {
  return (
    <section id="home" className="pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/10 rounded-l-full -z-10 blur-3xl transform translate-x-1/2 -translate-y-1/4"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-100 text-primary font-medium text-sm mb-6">
              <Star className="w-4 h-4 fill-primary" />
              <span>Hidden Gem Surabaya</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-gray-900 leading-tight mb-6">
              Sambal Pedas Favorit <span className="text-primary">Warga Surabaya</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-lg leading-relaxed">
              Penyetan, Tempong, dan Gejrek dengan Sambal Segar yang Bikin Nagih. Berani coba pedasnya?
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#menu" className="inline-flex justify-center items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-primary/30">
                Lihat Menu Menu
              </a>
              <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" className="inline-flex justify-center items-center gap-2 bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-900 px-8 py-4 rounded-full font-semibold text-lg transition-all">
                Pesan via WA <ArrowRight className="w-5 h-5" />
              </a>
            </div>

            <div className="mt-12 grid grid-cols-3 gap-6 pt-8 border-t border-gray-100">
              {features.map((feature, idx) => (
                <div key={idx}>
                  <feature.icon className="w-6 h-6 text-accent mb-2" />
                  <p className="font-bold text-gray-900 text-sm">{feature.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{feature.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-square md:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl">
              <img 
                src="https://images.unsplash.com/photo-1518596644332-9cbcebdddfee?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" 
                alt="Nasi Tempong Berkualitas" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white/80">Best Seller</p>
                    <p className="font-bold text-lg">Nasi Tempong Bebek</p>
                  </div>
                  <div className="bg-primary px-3 py-1.5 rounded-full font-bold text-sm">
                    Rp 35k
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Info Badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 md:-right-10 bg-white p-4 rounded-2xl shadow-xl border border-gray-100 hidden sm:flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Star className="w-6 h-6 fill-secondary text-secondary" />
              </div>
              <div>
                <p className="font-bold text-gray-900 text-lg">4.9/5</p>
                <p className="text-sm text-gray-500">1000+ Reviews</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
