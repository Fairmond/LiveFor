import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Menu, X } from 'lucide-react';

export interface NavbarProps {
  currentPage?: 'home' | 'product-design';
  onNavigate?: (page: 'home' | 'product-design') => void;
}

const navLinks = [
  { label: "主站", subLabel: "Station", id: "home" },
  { label: "产品设计", subLabel: "Product Design", id: "product-design", hasIcon: false },
  { label: "资源下载", subLabel: "Resource", id: "resource" },
  { label: "制作人员", subLabel: "Producer", id: "producer" },
];

export default function Navbar({ currentPage = 'home', onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [btnWidth, setBtnWidth] = useState(0);

  const [navOffsetProgress, setNavOffsetProgress] = useState(0);

  useEffect(() => {
    if (!buttonRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setBtnWidth(entry.contentRect.width);
      }
    });
    observer.observe(buttonRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleOffset = (e: Event) => {
      const customEvent = e as CustomEvent;
      setNavOffsetProgress(customEvent.detail?.progress ?? 0);
    };
    window.addEventListener('livefor-nav-offset', handleOffset);
    return () => {
      window.removeEventListener('livefor-nav-offset', handleOffset);
    };
  }, []);

  const handleNavClick = (id: string) => {
    if (id === 'home') {
      onNavigate?.('home');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'product-design') {
      onNavigate?.('product-design');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (id === 'resource') {
      if (currentPage !== 'home') {
        onNavigate?.('home');
      }
      setTimeout(() => {
        const el = document.getElementById('page-12-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else if (id === 'producer') {
      const footer = document.querySelector('footer');
      if (footer) footer.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div 
        style={{ transform: `translateY(${navOffsetProgress * -100}px)` }}
        className="fixed top-4 left-0 right-0 z-[9999] w-full pointer-events-none transition-transform duration-75"
      >
        <motion.nav 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="w-full flex items-center justify-center pointer-events-none"
        >
        <div className="w-full max-w-[1275px] px-3 sm:px-[22px] pointer-events-auto">
          <div className="bg-[#000000]/85 backdrop-blur-[12px] border border-white/5 rounded-[clamp(14px,1.2vw,18px)] min-h-[clamp(50px,3.8vw,64px)] w-full px-[clamp(12px,1.5vw,22px)] py-[clamp(6px,0.5vw,10px)] flex nav:grid nav:grid-cols-8 desktop:grid-cols-10 nav:gap-[clamp(8px,1.2vw,20px)] desktop:gap-[clamp(12px,1.6vw,24px)] items-center transition-all">
            
            {/* Logo - col-start-1 */}
            <button 
              type="button"
              onClick={() => handleNavClick('home')}
              className="nav:col-start-1 nav:col-span-2 flex items-center gap-[clamp(6px,0.5vw,8px)] cursor-pointer text-left focus:outline-none"
            >
              <img src="/logo.png" alt="Logo" className="w-[clamp(28px,3.15vw,38px)] h-[clamp(28px,3.15vw,38px)] object-contain flex-shrink-0" />
              <span className="font-brand text-[clamp(12px,1.18vw,14px)] font-medium text-[#EBEBEB] tracking-tight uppercase whitespace-nowrap">
                理法 LIVEFOR
              </span>
            </button>

            {/* Mobile Toggle */}
            <div className="flex nav:hidden ml-auto">
              <button 
                onClick={() => setIsOpen(true)} 
                className="w-10 h-10 flex items-center justify-center text-[#EBEBEB] hover:text-white active:scale-95 transition-all pointer-events-auto rounded-lg focus:outline-none cursor-pointer"
                aria-label="Open menu"
              >
                <Menu size={22} />
              </button>
            </div>

            {/* Desktop Links - Starting from col-start-3 on tablet, col-start-6 on desktop */}
            <div className="hidden nav:contents">
              <div className="nav:col-start-3 desktop:col-start-6 flex flex-col items-start justify-center">
                <NavItem 
                  {...navLinks[0]} 
                  isActive={currentPage === 'home'} 
                  onClick={() => handleNavClick('home')} 
                />
              </div>
              <div className="nav:col-start-4 desktop:col-start-7 flex flex-col items-start justify-center">
                <NavItem 
                  {...navLinks[1]} 
                  isActive={currentPage === 'product-design'} 
                  onClick={() => handleNavClick('product-design')} 
                />
              </div>
              <div className="nav:col-start-5 desktop:col-start-8 flex flex-col items-start justify-center">
                <NavItem 
                  {...navLinks[2]} 
                  onClick={() => handleNavClick('resource')} 
                />
              </div>
              <div className="nav:col-start-6 desktop:col-start-9 flex flex-col items-start justify-center">
                <NavItem 
                  {...navLinks[3]} 
                  onClick={() => handleNavClick('producer')} 
                />
              </div>
            </div>

            {/* Desktop Button - col-start-7 (span 2) on tablet, col-start-10 on desktop */}
            <div className="hidden nav:flex nav:col-start-7 nav:col-span-2 desktop:col-start-10 desktop:col-span-1 items-center justify-end">
              <button 
                ref={buttonRef}
                onClick={() => handleNavClick('resource')}
                className="w-full bg-[#EBEBEB] text-[#1A1A1A] font-bold text-[clamp(11.5px,0.9vw,14px)] py-[clamp(6px,0.6vw,10px)] px-[clamp(8px,1vw,16px)] rounded-[clamp(8px,0.8vw,12px)] transition-all hover:bg-white active:scale-95 whitespace-nowrap cursor-pointer"
              >
                {btnWidth > 70 ? 'Get Started' : 'Start'}
              </button>
            </div>

          </div>
        </div>
        </motion.nav>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-[24px] flex flex-col justify-between pt-[calc(env(safe-area-inset-top,0px)+2rem)] pb-[calc(env(safe-area-inset-bottom,0px)+2.5rem)] px-6 sm:px-8"
          >
            <div className="flex items-center justify-between w-full pb-6 border-b border-white/10">
              <div className="flex items-center gap-2">
                <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain" />
                <span className="font-brand text-sm font-medium text-white tracking-wider uppercase">理法 LIVEFOR</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="w-11 h-11 flex items-center justify-center text-[#EBEBEB] hover:text-white rounded-full bg-white/5 active:bg-white/10 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            <motion.div
              variants={{
                show: {
                  transition: {
                    staggerChildren: 0.08
                  }
                }
              }}
              initial="hidden"
              animate="show"
              className="flex flex-col gap-6 my-auto py-6"
            >
              {navLinks.map((link) => (
                <motion.div
                  key={link.label}
                  variants={{
                    hidden: { opacity: 0, x: -16 },
                    show: { opacity: 1, x: 0 }
                  }}
                >
                  <button 
                    className="block group py-2 w-full text-left cursor-pointer" 
                    onClick={() => {
                      setIsOpen(false);
                      handleNavClick(link.id);
                    }}
                  >
                    <div className="text-2xl font-brand font-bold text-[#EBEBEB] mb-1 group-hover:text-white transition-colors flex items-center justify-between">
                      <span>{link.label}</span>
                      {currentPage === link.id && (
                        <span className="text-xs font-mono text-white/50 tracking-normal font-normal">当前页</span>
                      )}
                    </div>
                    <div className="text-xs text-[#808080] tracking-widest uppercase">{link.subLabel}</div>
                  </button>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="w-full pt-4"
            >
              <button 
                onClick={() => {
                  setIsOpen(false);
                  handleNavClick('resource');
                }}
                className="w-full bg-[#EBEBEB] text-[#1A1A1A] font-bold text-base py-4 rounded-2xl transition-all active:scale-[0.98] shadow-lg hover:bg-white cursor-pointer"
              >
                Get Started
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavItem({ 
  label, 
  subLabel, 
  hasIcon,
  isActive,
  onClick
}: { 
  label: string; 
  subLabel: string; 
  hasIcon?: boolean;
  isActive?: boolean;
  onClick?: () => void;
}) {
  return (
    <button 
      type="button"
      onClick={onClick}
      className="group flex flex-col items-start transition-transform duration-200 hover:-translate-y-0.5 cursor-pointer text-left focus:outline-none"
    >
      <div className="flex items-center gap-[clamp(2px,0.3vw,4px)]">
        <span className={`font-brand text-[clamp(12px,1.18vw,14px)] transition-colors whitespace-nowrap ${
          isActive ? 'text-white font-medium' : 'text-[#EBEBEB] font-normal group-hover:text-white'
        }`}>
          {label}
        </span>
        {hasIcon && <ExternalLink className="w-[clamp(10px,0.8vw,13px)] h-[clamp(10px,0.8vw,13px)] text-[#808080]" />}
        {isActive && <span className="w-1 h-1 rounded-full bg-white ml-0.5 inline-block" />}
      </div>
      <span className={`font-brand text-[clamp(9px,0.84vw,10px)] font-normal transition-colors tracking-wider whitespace-nowrap ${
        isActive ? 'text-[#EBEBEB]' : 'text-[#808080] group-hover:text-[#EBEBEB]'
      }`}>
        {subLabel}
      </span>
    </button>
  );
}
