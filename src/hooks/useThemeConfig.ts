import { useContext } from "react";
import { ThemeContext } from "../context/themeContext";

const useThemeConfig = () => useContext(ThemeContext);

export default useThemeConfig;