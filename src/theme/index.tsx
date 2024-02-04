import { CssBaseline, StyledEngineProvider, ThemeOptions, ThemeProvider, createTheme } from "@mui/material";
import { ReactNode } from "react";

const AppTheme = ({ children }: { children: ReactNode }) => {
    const themeOptions: ThemeOptions = {
        palette: { mode: "dark" },
        shape: {
            borderRadius: 8
        }
    }
    const theme = createTheme(themeOptions)
    return (
        <StyledEngineProvider injectFirst>
            <CssBaseline />
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </StyledEngineProvider>
    );
};

export default AppTheme;