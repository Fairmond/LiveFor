import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface StickyLayout {
  top: number;
  left: number;
  width: number;
  height: number;
}

interface GridHoverContextType {
  isSticky: boolean;
  setIsSticky: (sticky: boolean) => void;
  isGridLocked: boolean;
  setIsGridLocked: (locked: boolean) => void;
  stickyLayout: StickyLayout | null;
  setStickyLayout: (layout: StickyLayout | null) => void;
}

const GridHoverContext = createContext<GridHoverContextType | undefined>(undefined);

export const GridHoverProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isSticky, setIsSticky] = useState(false);
  const [isGridLocked, setIsGridLocked] = useState(false);
  const [stickyLayout, setStickyLayout] = useState<StickyLayout | null>(null);

  return (
    <GridHoverContext.Provider value={{ 
      isSticky, 
      setIsSticky,
      isGridLocked,
      setIsGridLocked,
      stickyLayout,
      setStickyLayout
    }}>
      {children}
    </GridHoverContext.Provider>
  );
};

export const useGridHover = () => {
  const context = useContext(GridHoverContext);
  if (context === undefined) {
    throw new Error('useGridHover must be used within a GridHoverProvider');
  }
  return context;
};
