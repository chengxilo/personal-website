'use client'

import {CssBaseline, ThemeProvider} from "@mui/material";
import React from "react";
import darkTheme from "@/theme";
import {AppRouterCacheProvider} from "@mui/material-nextjs/v13-appRouter";

export default function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            <style>
                @import
                url('https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&family=Geo:ital@0;1&family=Silkscreen&family=VT323&display=swap');
            </style>
            <title>TITLE</title>
        </head>
        <body>
        <AppRouterCacheProvider>
            <ThemeProvider theme={darkTheme}>
                <React.Fragment>
                    <CssBaseline/>
                    {children}
                </React.Fragment>
            </ThemeProvider>
        </AppRouterCacheProvider>
        </body>
        </html>
    );
}
