import { ReactNode, createContext, useState } from "react";
import { ThemeMode } from "../theme/types/themeMode";
const initialState = {
    mode: ThemeMode.LIGHT,
    onChangeMode: (mode: ThemeMode) => {}
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