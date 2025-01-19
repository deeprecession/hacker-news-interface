import { createContext, useContext, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

type ThemeContextType = {
  isDarkTheme: boolean;
  setTheme: (theme: boolean) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  isDarkTheme: false,
  setTheme: () => {},
});

type ThemeProviderProps = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useMediaQuery(
    {
      query: "(prefers-color-scheme: dark)",
    },
    undefined,
    (isSystemDark) => setIsDarkTheme(isSystemDark),
  );

  const setTheme = (isDark: boolean) => {
    setIsDarkTheme(isDark);
  };

  useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDarkTheme]);

  return (
    <ThemeContext.Provider value={{ isDarkTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
