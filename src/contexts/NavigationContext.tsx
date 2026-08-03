import { createContext, useContext, useState, ReactNode } from 'react';

interface NavigationContextType {
  lastClickedId: string | number | null;
  setLastClickedId: (id: string | number | null) => void;
  saveScrollPosition: (key: string) => void;
}

const NavigationContext = createContext<NavigationContextType>({
  lastClickedId: null,
  setLastClickedId: () => {},
  saveScrollPosition: () => {},
});

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [lastClickedId, setLastClickedId] = useState<string | number | null>(null);

  const saveScrollPosition = (key: string) => {
    const el = document.getElementById('scroll-root');
    const top = el ? el.scrollTop : window.scrollY;
    sessionStorage.setItem(`scroll_pos_${key}`, top.toString());
  };

  return (
    <NavigationContext.Provider value={{ lastClickedId, setLastClickedId, saveScrollPosition }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  return useContext(NavigationContext);
}
