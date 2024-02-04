import { CssBaseline, StyledEngineProvider, ThemeOptions, ThemeProvider, createTheme } from "@mui/material";
import { ReactNode } from "react";
import getWindowScheme from "../utils/theme_mode";
import { ThemeMode } from "./types/themeMode";

const AppTheme = ({ children }: { children: ReactNode }) => {
    let themeMode = 'dark';
    if (themeMode === ThemeMode.AUTO) {
        const autoMode = getWindowScheme();
        if (autoMode) {
            themeMode = ThemeMode.DARK;
        } else {
            themeMode = ThemeMode.LIGHT;
        }
    }
    const themeOptions: ThemeOptions = {
        palette: { mode: "dark" },
        shape: {
            borderRadius: 8
        }
    }
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