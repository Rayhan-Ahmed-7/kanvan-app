// project-imports
import { PaletteThemeProps, PresetColor } from '../types/theme';
import { ThemeMode } from '../types/themeMode';
import Default from './default';

// types

// ==============================|| PRESET THEME - THEME SELECTOR ||============================== //

const ThemeOption = (presetColor: PresetColor, mode: ThemeMode): PaletteThemeProps => {
    switch (presetColor) {
        // case 'theme1':
        //   return Theme1(mode);
        default:
            return Default(mode);
    }
};

export default ThemeOption;
