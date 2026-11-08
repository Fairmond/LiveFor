import { useEffect, useState, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import PromoSection from './components/PromoSection';
import { UnifiedFeaturesSection } from './components/UnifiedFeaturesSection';
import BarberInfoSection from './components/BarberInfoSection';
import BrandPhilosophySection from './components/BrandPhilosophySection';
import HaircraftControlSection from './components/HaircraftControlSection';
import ExperienceIntroSection from './components/ExperienceIntroSection';
import AppDownloadSection from './components/AppDownloadSection';
import { GridHoverProvider } from './context/GridHoverContext';
import { MobileLayout } from './components/mobile/MobileLayout';

const ProductDesignPage = lazy(() => import('./components/ProductDesignPage'));

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'product-design'>(() => {
    return window.location.hash === '#/product-design' ? 'product-design' : 'home';
  });

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#/product-design') {
        setCurrentPage('product-design');
      } else {
        setCurrentPage('home');
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (page: 'home' | 'product-design') => {
    setCurrentPage(page);
    window.location.hash = page === 'product-design' ? '#/product-design' : '#/';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    // Detect touch device
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    const lenis = new Lenis({
      duration: isTouch ? 0.8 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Classic smooth easing curve
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: isTouch ? 1.0 : 1.5,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (currentPage === 'product-design') {
    return (
      <GridHoverProvider>
        <Suspense fallback={
          <div className="w-full min-h-screen bg-[#070A13] flex items-center justify-center text-white/50 text-sm">
            <div className="flex flex-col items-center gap-3">
              <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain animate-pulse" />
              <span className="font-brand text-xs text-white/60">载入中...</span>
            </div>
          </div>
        }>
          <ProductDesignPage onBackToHome={() => navigateTo('home')} />
        </Suspense>
      </GridHoverProvider>
    );
  }

  return (
    <GridHoverProvider>
      <main className="relative bg-brand-bg w-full min-h-screen flex flex-col">
        {/* Mobile Viewport: Custom Mobile Layout according to iPhone 14 Pro - 61.svg */}
        <div className="block md:hidden w-full">
          <MobileLayout onNavigate={navigateTo} currentPage={currentPage} />
        </div>

        {/* Desktop Viewport: 100% untouched desktop experience */}
        <div className="hidden md:flex flex-col w-full">
          <Navbar currentPage={currentPage} onNavigate={navigateTo} />
          <Hero />
          <PromoSection />
          <UnifiedFeaturesSection />
          <div className="w-[90%] max-w-[1296px] mx-auto aspect-[1440/93] min-h-[10px] sm:min-h-[14px] pointer-events-none" />
          <BarberInfoSection />
          <div className="w-[90%] max-w-[1296px] mx-auto aspect-[1440/93] min-h-[10px] sm:min-h-[14px] pointer-events-none" />
          <BrandPhilosophySection />
          <div className="w-[90%] max-w-[1296px] mx-auto aspect-[1440/280] min-h-[29px] sm:min-h-[43px] pointer-events-none" />
          <HaircraftControlSection />
          <ExperienceIntroSection />
          <AppDownloadSection />
          
          <footer className="mt-auto relative z-50 w-full py-8 sm:py-12 pb-[max(2rem,env(safe-area-inset-bottom))] bg-[#070A13] border-t border-white/5">
            <div className="max-w-[1275px] mx-auto px-4 sm:px-[22px] flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6">
              <p className="text-white/30 text-xs sm:text-sm order-2 sm:order-1 select-none text-center sm:text-left">© 2024 理法 LIVEFOR. All Rights Reserved.</p>
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-white/40 hover:text-white/80 active:text-white text-xs sm:text-sm py-2 px-3 transition-all cursor-pointer order-1 sm:order-2 font-['Noto_Sans_SC'] font-normal"
              >
                回到顶部
              </button>
            </div>
          </footer>
        </div>
      </main>
    </GridHoverProvider>
  );
}
