import { CssBaseline, StyledEngineProvider, Theme, ThemeOptions, ThemeProvider, createTheme } from "@mui/material";
import { ReactNode, useMemo } from "react";
import getWindowScheme from "../utils/theme_mode";
import { ThemeMode } from "./types/themeMode";
import useThemeConfig from "../hooks/useThemeConfig";
import Palette from "./palette";
import ComponentsOverride from "./overrides";

const AppTheme = ({ children }: { children: ReactNode }) => {
    const { mode, presetColor, themeContrast } = useThemeConfig();
    let themeMode = mode;
    if (themeMode === ThemeMode.AUTO) {
        const autoMode = getWindowScheme();
        if (autoMode) {
            themeMode = ThemeMode.DARK;
        } else {
            themeMode = ThemeMode.LIGHT;
        }
    }
    const theme: Theme = useMemo<Theme>(() => Palette(themeMode, presetColor, themeContrast), [themeMode, presetColor, themeContrast]);
    const themeOptions: ThemeOptions = useMemo(() => ({
        palette: theme.palette,
        shape: {
            borderRadius: 8
        }
    }), [mode])
    const themes = createTheme(themeOptions);
    themes.components = ComponentsOverride(theme);
    return (
        <StyledEngineProvider injectFirst={true}>
            <ThemeProvider theme={themes}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default AppTheme;