import { ReactNode, createContext, useState } from "react";
import { ThemeMode } from "../theme/types/themeMode";
import { PresetColor } from "../theme/types/theme";
interface ThemeProps {
    mode: ThemeMode;
    presetColor: PresetColor;
    onChangeMode: (mode: ThemeMode) => void;
    themeContrast: boolean;
}
const initialState: ThemeProps = {
    mode: ThemeMode.DARK,
    presetColor: 'default',
    onChangeMode: () => { },
    themeContrast: false
}
export const ThemeContext = createContext(initialState);
const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState(initialState);

    const onChangeMode = (mode: ThemeMode) => {
        setTheme(
            {
                ...theme,
                mode
            }
        )
    }
    return (
        <ThemeContext.Provider value={{ ...theme, onChangeMode }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;