import {createTheme} from "@mui/material";

const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#31f612',
        },
        secondary: {
            main: '#a7d1a9',
        },
        text: {
            primary: '#b5ff99',
            secondary: '#aac4a9',
        }
    },
    typography: {
        fontSize: 14,
    }
});

export default darkTheme;