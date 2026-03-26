'use client'

import {CssBaseline, ThemeProvider} from "@mui/material";
import React from "react";
import darkTheme from "@/theme";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";

export default function ThemeRegistry({children}: { children: React.ReactNode }) {
    return (
        <AppRouterCacheProvider>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline/>
                {children}
            </ThemeProvider>
        </AppRouterCacheProvider>
    );
}
