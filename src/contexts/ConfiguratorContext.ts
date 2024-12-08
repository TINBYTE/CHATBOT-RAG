import { createContext, Dispatch, SetStateAction } from 'react';

interface ConfiguratorContextType {
  mini: boolean;
  setMini: Dispatch<SetStateAction<boolean>>;
  hovered: boolean;
  setHovered: Dispatch<SetStateAction<boolean>>;
  contrast: boolean;
  setContrast: Dispatch<SetStateAction<boolean>>;
  theme: { [x: string]: any };
  setTheme: Dispatch<SetStateAction<{ [x: string]: any }>>;
  sidebarWidth?: number;
}

export const ConfiguratorContext = createContext<
  Partial<ConfiguratorContextType>
>({});
