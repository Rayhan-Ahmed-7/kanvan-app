import { CssBaseline, PaletteMode, StyledEngineProvider, ThemeOptions, ThemeProvider, createTheme } from "@mui/material";
import { ReactNode, useMemo } from "react";
import getWindowScheme from "../utils/theme_mode";
import { ThemeMode } from "./types/themeMode";
import useTheme from "../hooks/useTheme";

const AppTheme = ({ children }: { children: ReactNode }) => {
    const { mode } = useTheme();
    let themeMode = mode;
    if (themeMode === ThemeMode.AUTO) {
        const autoMode = getWindowScheme();
        console.log(autoMode)
        if (autoMode) {
            themeMode = ThemeMode.DARK;
        } else {
            themeMode = ThemeMode.LIGHT;
        }
    }
    const themeOptions: ThemeOptions = useMemo(() => ({
        palette: { mode: themeMode as PaletteMode },
        shape: {
            borderRadius: 8
        }
    }), [mode])
    const theme = createTheme(themeOptions)
    return (
        <StyledEngineProvider injectFirst={true}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default AppTheme;