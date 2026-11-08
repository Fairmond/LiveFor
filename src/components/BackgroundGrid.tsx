import React, { useRef, useState, useEffect } from 'react';
import { useGridHover } from '../context/GridHoverContext';

interface BackgroundGridProps {
  type: 'page3' | 'page4';
  disableSticky?: boolean;
  limitBottom?: boolean;
}

export const BackgroundGrid: React.FC<BackgroundGridProps> = ({ type, disableSticky, limitBottom }) => {
  const isPage3 = type === 'page3';
  const { isSticky, isGridLocked, stickyLayout } = useGridHover();
  const containerRef = useRef<HTMLDivElement>(null);
  const [lockedStyle, setLockedStyle] = useState<React.CSSProperties | null>(null);
  const lastRect = useRef<DOMRect | null>(null);
  const isCurrentlyLocked = useRef(false);
  
  useEffect(() => {
    if (isGridLocked && containerRef.current) {
      // If we are already locked, do not recalculate top/left because scroll has changed parent top!
      if (isCurrentlyLocked.current) {
        return;
      }
      // Ensure we have a rect to lock to; if missing, capture current position or use stickyLayout
      if (!lastRect.current) {
        if (stickyLayout) {
          lastRect.current = {
            top: stickyLayout.top,
            left: stickyLayout.left,
            width: stickyLayout.width,
            height: stickyLayout.height,
            bottom: stickyLayout.top + stickyLayout.height,
            right: stickyLayout.left + stickyLayout.width,
            x: stickyLayout.left,
            y: stickyLayout.top,
            toJSON: () => {}
          } as DOMRect;
        } else {
          lastRect.current = containerRef.current.getBoundingClientRect();
        }
      }
      // Freeze at current position but convert to absolute relative to parent
      const parentRect = containerRef.current.parentElement?.getBoundingClientRect();
      if (parentRect) {
        setLockedStyle({
          position: 'absolute',
          top: lastRect.current.top - parentRect.top,
          left: lastRect.current.left - parentRect.left,
          width: lastRect.current.width,
          height: lastRect.current.height,
          zIndex: 5
        });
        isCurrentlyLocked.current = true;
      }
    } else if (!disableSticky && isSticky && containerRef.current) {
      isCurrentlyLocked.current = false;
      
      if (stickyLayout) {
        lastRect.current = {
          top: stickyLayout.top,
          left: stickyLayout.left,
          width: stickyLayout.width,
          height: stickyLayout.height,
          bottom: stickyLayout.top + stickyLayout.height,
          right: stickyLayout.left + stickyLayout.width,
          x: stickyLayout.left,
          y: stickyLayout.top,
          toJSON: () => {}
        } as DOMRect;

        setLockedStyle({
          position: 'fixed',
          top: stickyLayout.top,
          left: stickyLayout.left,
          width: stickyLayout.width,
          height: stickyLayout.height,
          zIndex: 5
        });
      } else {
        // Fallback to dynamic measuring if stable values aren't populated yet
        if (!lastRect.current) {
          lastRect.current = containerRef.current.getBoundingClientRect();
        }
        const rect = lastRect.current;
        setLockedStyle({
          position: 'fixed',
          top: rect.top,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          zIndex: 5
        });
      }
    } else {
      isCurrentlyLocked.current = false;
      setLockedStyle(null);
      // Only clear cache if we're not locked and not sticky
      if (!isGridLocked && !isSticky) {
        lastRect.current = null;
      }
    }
  }, [isSticky, isGridLocked, disableSticky, stickyLayout]);

  // X Coordinates (Shared across both pages)
  const leftX = "calc(139 / 1440 * 100%)";
  const rightX = "calc(1299 / 1440 * 100%)"; // Vertical line start at 1299 (covers to 1300)
  const centerX = "calc(755 / 1440 * 100%)";
  const hLineLeft = "calc(139 / 1440 * 100%)";
  const hLineRight = "calc(140 / 1440 * 100%)"; // right offset is 100% - 1300/1440*100% = 140/1440*100%

  // Y Coordinates
  const topY = isPage3 ? "calc(54 / 700 * 100%)" : "0%";
  // In merged mode, Page 3 doesn't need its own bottom line if Page 4 provides the top line
  // However, we can keep one and remove the other. Let's keep Page 4's top line as the junction.
  const hasBottomLine = !isPage3; 
  
  const vLineTop = isPage3 ? "calc(54 / 700 * 100%)" : "0%";
  const vLineBottom = "0%"; // Extend to bottom edge to meet the next page

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 pointer-events-none overflow-visible select-none" 
      style={lockedStyle || {}} 
      aria-hidden="true"
    >
      <div 
        className="absolute inset-x-0 top-0 overflow-visible"
        style={{ bottom: limitBottom ? "2%" : "0%" }}
      >
        {isPage3 ? (
          <svg 
            className="absolute"
            style={{ 
              top: topY, 
              left: hLineLeft, 
              right: hLineRight,
              width: `calc(100% - ${hLineLeft} - ${hLineRight})`,
              height: `calc(2 * (100% - ${topY}))`
            }}
            viewBox="0 0 1162 1201"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path 
              d="M0 0.5H1161M0.5 0.5L0.5 1200.5M617 0.5L617 1200.5M1160.5 0.5L1161.02 1200.5M0 600.5H1161M0 1200.5H1161" 
              stroke="#E0E0E0"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        ) : (
          <>
            {/* Page 4 grid structure */}
            {/* Top Horizontal Line */}
            <div 
              className="absolute h-[1px] bg-[#E0E0E0]" 
              style={{ 
                top: topY, 
                left: hLineLeft, 
                right: hLineRight 
              }} 
            />
            {/* Bottom Horizontal Line */}
            {hasBottomLine && (
              <div 
                className="absolute h-[1px] bg-[#E0E0E0]" 
                style={{
                  bottom: 0,
                  left: hLineLeft, 
                  right: hLineRight 
                }} 
              />
            )}

            {/* Vertical Lines */}
            <div 
              className="absolute w-[1px] bg-[#E0E0E0]" 
              style={{ 
                left: leftX, 
                top: vLineTop, 
                bottom: vLineBottom
              }} 
            />
            <div 
              className="absolute w-[1px] bg-[#E0E0E0]" 
              style={{ 
                left: centerX, 
                top: vLineTop, 
                bottom: vLineBottom
              }} 
            />
            <div 
              className="absolute w-[1px] bg-[#E0E0E0]" 
              style={{ 
                left: rightX, 
                top: vLineTop, 
                bottom: vLineBottom
              }} 
            />
          </>
        )}
      </div>
    </div>
  );
};
