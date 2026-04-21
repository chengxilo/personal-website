import {createTheme} from "@mui/material";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#7FE7C4',
        },
        secondary: {
            main: '#4FB59A',
        },
        background: {
            default: '#0A0A0A',
            paper: '#111111',
        },
        text: {
            primary: 'rgba(255,255,255,0.92)',
            secondary: 'rgba(255,255,255,0.62)',
            disabled: 'rgba(255,255,255,0.38)',
        },
        divider: 'rgba(255,255,255,0.08)',
    },
    typography: {
        fontFamily: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
        fontSize: 15,
        h1: {fontWeight: 600, letterSpacing: '-0.02em'},
        h2: {fontWeight: 600, letterSpacing: '-0.02em'},
        h3: {fontWeight: 600, letterSpacing: '-0.01em'},
        body1: {lineHeight: 1.7},
        body2: {lineHeight: 1.7},
    },
    shape: {
        borderRadius: 8,
    },
});

export default darkTheme;
