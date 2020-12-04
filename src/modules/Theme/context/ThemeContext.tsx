import React, {useState, useCallback} from 'react';
import {defaultTheme, darkTheme, ThemeType} from '../../../utils/theme';

export interface ThemeContextType {
  theme: ThemeType;
  updateTheme(val: 'default' | 'dark'): void;
}

export const ThemeContext = React.createContext<ThemeContextType>({
  theme: defaultTheme,
  updateTheme: () => {
    /* FUNC */
  },
});

const ThemeContextProvider: React.FC = ({children}) => {
  const [theme, setTheme] = useState<ThemeType>(defaultTheme);

  const updateTheme = useCallback((val: 'default' | 'dark'): void => {
    setTheme(defaultTheme);
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        updateTheme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
