import { useEffect, useState } from "react";
import { MdDarkMode, MdLightMode } from "react-icons/md";
const ThemeToggler = () => {
  const [currentTheme, setCurrentTheme] = useState("light");

  useEffect(() => {
    if (localStorage.getItem("theme")) {
      setCurrentTheme(localStorage.getItem("theme"));
      document.documentElement.setAttribute("data-theme", currentTheme);
    } else {
      setCurrentTheme(document.documentElement.getAttribute("data-theme"));
    }
  }, [currentTheme]);

  const handleThemeChange = () => {
    const newTheme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    setCurrentTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  return (
    <div className="theme-toggler flex items-center gap-2">
      <span>
        <MdLightMode />
      </span>
      <input
        type="checkbox"
        className="toggle"
        onChange={handleThemeChange}
        checked={currentTheme === "dark"}
      />
      <span>
        <MdDarkMode />
      </span>
    </div>
  );
};

export default ThemeToggler;
