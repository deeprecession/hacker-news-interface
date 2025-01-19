import Toggle from "react-toggle";
import "react-toggle/style.css";
import style from "./DarkModeToggle.module.css";
import { useThemeContext } from "../../contexts/ThemeContext";

export const DarkModeToggle = () => {
  const { isDarkTheme, setTheme } = useThemeContext();

  return (
    <div className={style.themeToggleWrapper}>
      <label htmlFor="theme-toggle"> Toggle Theme</label>
      <Toggle
        id="theme-toggle"
        checked={isDarkTheme}
        onChange={({ target }) => setTheme(target.checked)}
        icons={{ checked: "", unchecked: "" }}
        aria-label="Dark mode toggle"
      />
    </div>
  );
};
