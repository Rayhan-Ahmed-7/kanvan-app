import { ReactNode, createContext, useState } from "react";
import { ThemeMode } from "../theme/types/themeMode";
interface ThemeProps {
    mode: ThemeMode
    onChangeMode: (mode: ThemeMode) => void
}
const initialState: ThemeProps = {
    mode: ThemeMode.AUTO,
    onChangeMode: () => { }
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