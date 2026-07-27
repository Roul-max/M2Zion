import { createContext, useContext, useState, ReactNode } from 'react';

interface NavigationContextType {
  lastClickedId: string | number | null;
  setLastClickedId: (id: string | number | null) => void;
}

const NavigationContext = createContext<NavigationContextType>({
  lastClickedId: null,
  setLastClickedId: () => {},
});

export function NavigationProvider({ children }: { children: ReactNode }) {
  const [lastClickedId, setLastClickedId] = useState<string | number | null>(null);

  return (
    <NavigationContext.Provider value={{ lastClickedId, setLastClickedId }}>
      {children}
    </NavigationContext.Provider>
  );
}

export function useNavigation() {
  return useContext(NavigationContext);
}
