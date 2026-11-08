import React, { useState, useRef, useEffect, useId } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface ChromaticDistortionButtonProps {
  label?: string;
  subText?: string;
  onClick?: () => void;
  className?: string;
}

export const ChromaticDistortionButton: React.FC<ChromaticDistortionButtonProps> = ({
  label = "我们改变了什么",
  onClick,
  className = "",
}) => {
  const filterId = useId().replace(/:/g, '_');
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  // Mouse position within button (0 to 1)
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Smooth spring physics for fluid response
  const springX = useSpring(mouseX, { stiffness: 220, damping: 24 });
  const springY = useSpring(mouseY, { stiffness: 220, damping: 24 });

  // 3D Perspective tilt
  const rotateX = useTransform(springY, [0, 1], [8, -8]);
  const rotateY = useTransform(springX, [0, 1], [-10, 10]);

  // Chromatic aberration shift distance
  const shiftRedX = useTransform(springX, [0, 1], [-3.5, 3.5]);
  const shiftRedY = useTransform(springY, [0, 1], [-2.5, 2.5]);
  const shiftBlueX = useTransform(springX, [0, 1], [3.5, -3.5]);
  const shiftBlueY = useTransform(springY, [0, 1], [2.5, -2.5]);

  // Real-time animated turbulence seed / frequency
  const [turbulenceSeed, setTurbulenceSeed] = useState(1);
  const [distortionScale, setDistortionScale] = useState(8);

  useEffect(() => {
    let animId: number;
    let t = 0;
    const animate = () => {
      t += 0.03;
      if (isHovered) {
        setTurbulenceSeed((prev) => (prev > 100 ? 1 : prev + 0.15));
        setDistortionScale(14 + Math.sin(t * 2) * 4);
      } else {
        setDistortionScale(6 + Math.sin(t) * 2);
      }
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [isHovered]);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Hidden SVG Filter definition for physical wave distortion & refraction */}
      <svg className="absolute w-0 h-0 pointer-events-none opacity-0" aria-hidden="true">
        <defs>
          <filter id={`dispersion_distortion_${filterId}`} x="-30%" y="-30%" width="160%" height="160%">
            <feTurbulence
              type="fractalNoise"
              baseFrequency={isHovered ? "0.024 0.04" : "0.012 0.02"}
              numOctaves="3"
              seed={Math.floor(turbulenceSeed)}
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={isPressed ? 24 : distortionScale}
              xChannelSelector="R"
              yChannelSelector="G"
              result="displaced"
            />
          </filter>
        </defs>
      </svg>

      <motion.button
        ref={buttonRef}
        type="button"
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        style={{
          perspective: 800,
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="group relative cursor-pointer outline-none select-none overflow-hidden rounded-[28px] sm:rounded-[32px] p-[1.5px] transition-shadow duration-300"
      >
        {/* Prismatic Chromatic Dispersion Outer Rim (Rainbow Refraction Border) */}
        <div
          className="absolute inset-0 rounded-[28px] sm:rounded-[32px] transition-opacity duration-300"
          style={{
            background: isHovered
              ? "conic-gradient(from 180deg at 50% 50%, #ff0055 0deg, #ff7700 60deg, #00f0ff 140deg, #7000ff 220deg, #00ff88 300deg, #ff0055 360deg)"
              : "linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(0,240,255,0.3) 35%, rgba(255,0,128,0.3) 70%, rgba(255,255,255,0.2) 100%)",
            opacity: isHovered ? 0.9 : 0.55,
            filter: isHovered ? "blur(0.5px)" : "none",
          }}
        />

        {/* Ambient Chromatic Glow behind button on hover */}
        <div
          className="absolute -inset-1 rounded-[34px] opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none blur-lg"
          style={{
            background: "linear-gradient(90deg, rgba(255,0,100,0.4), rgba(0,240,255,0.5), rgba(120,0,255,0.4))",
          }}
        />

        {/* Liquid Glass Body Container */}
        <div className="relative rounded-[26.5px] sm:rounded-[30.5px] bg-[#0c0d12]/80 backdrop-blur-[20px] px-6 sm:px-9 py-3.5 sm:py-4.5 overflow-hidden flex items-center justify-center border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.25)]">
          
          {/* Internal Refraction Fluid Distortion Layer */}
          <div
            className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay transition-opacity duration-300"
            style={{
              filter: `url(#dispersion_distortion_${filterId})`,
              background: "radial-gradient(ellipse at 50% 50%, rgba(0,240,255,0.35) 0%, rgba(255,0,128,0.25) 50%, transparent 80%)",
            }}
          />

          {/* Mouse-Driven Specular Glare / Liquid Lens Highlight */}
          <motion.div
            className="absolute rounded-full pointer-events-none transition-opacity duration-300"
            style={{
              width: "120px",
              height: "120px",
              left: useTransform(springX, (v) => `${v * 100}%`),
              top: useTransform(springY, (v) => `${v * 100}%`),
              x: "-50%",
              y: "-50%",
              background: "radial-gradient(circle, rgba(255,255,255,0.35) 0%, rgba(0,240,255,0.15) 45%, transparent 70%)",
              opacity: isHovered ? 1 : 0.25,
            }}
          />

          {/* Chromatic Dispersion Split Text Layers */}
          <div 
            className="relative z-10 flex items-center justify-center gap-2 sm:gap-3"
            style={{
              filter: isHovered ? `url(#dispersion_distortion_${filterId})` : "none",
            }}
          >
            {/* Chromatic Red Channel Split (Offset Left) */}
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center gap-2 sm:gap-3 pointer-events-none select-none text-[#ff2a6d] mix-blend-screen opacity-70"
              style={{
                x: shiftRedX,
                y: shiftRedY,
                fontFamily: "var(--font-brand), 'FZYOONCHEQWHJW', sans-serif",
              }}
            >
              <span className="text-base sm:text-lg font-medium tracking-wide">{label}</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
            </motion.div>

            {/* Chromatic Cyan/Blue Channel Split (Offset Right) */}
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 flex items-center justify-center gap-2 sm:gap-3 pointer-events-none select-none text-[#05d9e8] mix-blend-screen opacity-70"
              style={{
                x: shiftBlueX,
                y: shiftBlueY,
                fontFamily: "var(--font-brand), 'FZYOONCHEQWHJW', sans-serif",
              }}
            >
              <span className="text-base sm:text-lg font-medium tracking-wide">{label}</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </svg>
            </motion.div>

            {/* Main Sharp Crisp White Text (Center Layer) */}
            <div 
              className="relative flex items-center justify-center gap-2 sm:gap-3 text-white transition-colors duration-200"
              style={{ fontFamily: "var(--font-brand), 'FZYOONCHEQWHJW', sans-serif" }}
            >
              <span className="text-base sm:text-lg font-medium tracking-wide drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                {label}
              </span>
              <motion.svg 
                animate={isHovered ? { y: [0, 4, 0] } : { y: 0 }}
                transition={isHovered ? { repeat: Infinity, duration: 1.2, ease: "easeInOut" } : {}}
                className="w-4 h-4 sm:w-5 sm:h-5 text-white/90 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2.2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
              </motion.svg>
            </div>
          </div>

          {/* Top Edge Specular Crescent Reflection (Glass Lip) */}
          <div className="absolute inset-x-3 top-0 h-[1.5px] bg-gradient-to-r from-transparent via-white/50 to-transparent pointer-events-none" />
          
          {/* Bottom Edge Subtle Prism Rim Reflection */}
          <div className="absolute inset-x-6 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent pointer-events-none" />
        </div>
      </motion.button>
    </div>
  );
};

export default ChromaticDistortionButton;
