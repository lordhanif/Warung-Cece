import { HandPlatter, Flame, Wallet, ThumbsUp } from 'lucide-react';

export const bestSellers = [
  { id: 1, name: 'Nasi Tempong Bebek', price: 'Rp 35.000', description: 'Bebek goreng empuk dengan sambal tempong segar khas Banyuwangi, lalapan lengkap.', image: 'https://images.unsplash.com/photo-1518596644332-9cbcebdddfee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', spicyLevel: 3, stock: 12, calories: '750 kcal', protein: '35g' },
  { id: 2, name: 'Nasi Tempong Ayam', price: 'Rp 28.000', description: 'Ayam goreng gurih dengan sambal tempong pedas nampol.', image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', spicyLevel: 3, stock: 0, calories: '650 kcal', protein: '40g' },
  { id: 3, name: 'Nasi Gejrek Bebek', price: 'Rp 36.000', description: 'Bebek di-gejrek berpadu dengan sambal super pedas.', image: 'https://images.unsplash.com/photo-1626804475297-41609ea0dc4eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', spicyLevel: 5, stock: 3, calories: '780 kcal', protein: '34g' },
  { id: 4, name: 'Nasi Penyetan Bebek', price: 'Rp 34.000', description: 'Penyetan klasik Surabaya, bebek bumbu rempah dengan sambal bajak manis pedas.', image: 'https://images.unsplash.com/photo-1518596644332-9cbcebdddfee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', spicyLevel: 2, stock: 15, calories: '720 kcal', protein: '36g' },
  { id: 5, name: 'Nasi Penyetan Paru', price: 'Rp 25.000', description: 'Paru goreng garing di luar lembut di dalam, disajikan dengan sambal pilihan.', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', spicyLevel: 2, stock: 5, calories: '550 kcal', protein: '28g' },
  { id: 6, name: 'Nasi Tempong Empal', price: 'Rp 38.000', description: 'Potongan empal sapi manis gurih, sempurna meredakan pedas sambal tempong.', image: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', spicyLevel: 3, stock: 8, calories: '680 kcal', protein: '45g' }
];

export const sambals = [
  { id: 1, name: 'Sambal Penyetan', description: 'Manis, gurih, pedas sedang. Cocok untuk semua orang.', icon: ThumbsUp, color: 'bg-orange-100 text-orange-600' },
  { id: 2, name: 'Sambal Bawang', description: 'Gurih bawang putih yang kuat, pedas nendang.', icon: Flame, color: 'bg-red-100 text-red-600' },
  { id: 3, name: 'Sambal Korek', description: 'Super pedas, segar, bawang mentah dan cabai rawit.', icon: Flame, color: 'bg-red-200 text-red-700' },
  { id: 4, name: 'Sambal Tempong Banyuwangi', description: 'Pedas, segar ranti/tomat kecil, terasi khas.', icon: HandPlatter, color: 'bg-primary/20 text-primary' }
];

export const reviews = [
  { id: 1, name: 'Budi Santoso', role: 'Local Guide', content: 'Bebeknya empuk banget, sambal tempongnya juara! Pedasnya bikin nagih terus.', rating: 5 },
  { id: 2, name: 'Siti Aminah', role: 'Food Blogger', content: 'Hidden gem di Surabaya. Porsinya kuli, harganya mahasiswa. Wajib coba Nasi Gejrek!', rating: 5 },
  { id: 3, name: 'Ahmad Rizal', role: 'Pekerja Kantoran', content: 'Sering banget pesen via GoFood buat makan siang kantor. Packaging rapi, rasanya selalu konsisten.', rating: 4 }
];

export const features = [
  { title: "Authentic Taste", desc: "Resep rahasia turun temurun", icon: HandPlatter },
  { title: "Fresh Ingredients", desc: "Bahan segar setiap hari", icon: Flame },
  { title: "Affordable", desc: "Harga ramah kantong", icon: Wallet },
];
