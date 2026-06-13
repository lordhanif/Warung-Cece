import React from 'react';
import { Instagram } from 'lucide-react';
import { motion } from 'motion/react';

export function InstagramFeed() {
  const posts = [
    { id: 1, image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', likes: 124 },
    { id: 2, image: 'https://images.unsplash.com/photo-1626804475297-41609ea0dc4eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', likes: 89 },
    { id: 3, image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', likes: 210 },
    { id: 4, image: 'https://images.unsplash.com/photo-1518596644332-9cbcebdddfee?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80', likes: 156 },
  ];

  return (
    <section className="py-20 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6"
        >
          <div>
            <h2 className="text-primary font-bold text-sm tracking-widest uppercase mb-2">Social Map</h2>
            <h3 className="font-display text-4xl font-bold text-gray-900">#WarungCece</h3>
            <p className="text-gray-600 mt-2">Bagikan momen pedasmu dan tag kami di Instagram</p>
          </div>
          <a href="https://instagram.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-3 rounded-full font-bold transition-colors">
            <Instagram className="w-5 h-5" /> Follow @warungcece
          </a>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {posts.map((post, idx) => (
            <motion.div 
              key={post.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="relative aspect-square group rounded-2xl overflow-hidden cursor-pointer"
            >
              <img src={post.image} alt={`Instagram Post ${post.id}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="flex items-center gap-2 text-white font-bold">
                  <HeartIcon className="w-6 h-6 fill-white text-white" /> {post.likes}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HeartIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}
