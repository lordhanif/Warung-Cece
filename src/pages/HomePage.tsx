import { Hero } from '../components/sections/Hero';
import { BestSellers } from '../components/sections/BestSellers';
import { SambalSelection } from '../components/sections/SambalSelection';
import { PromoBanner } from '../components/sections/PromoBanner';
import { Reviews } from '../components/sections/Reviews';
import { Rewards } from '../components/sections/Rewards';
import { LocationMap } from '../components/sections/LocationMap';
import { InstagramFeed } from '../components/sections/InstagramFeed';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { StickyOrder } from '../components/StickyOrder';
import { CartDrawer } from '../components/CartDrawer';
import { CartProvider } from '../context/CartContext';

export function HomePage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background font-sans text-gray-900">
        <Navbar />
        <main>
          <Hero />
          <BestSellers />
          <SambalSelection />
          <PromoBanner />
          <Reviews />
          <Rewards />
          <LocationMap />
          <InstagramFeed />
        </main>
        <Footer />
        <StickyOrder />
        <CartDrawer />
      </div>
    </CartProvider>
  );
}
