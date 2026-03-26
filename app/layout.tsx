import React from "react";
import ThemeRegistry from "@/app/component/ThemeRegistry";

export default function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&family=Geo:ital@0;1&family=Silkscreen&family=VT323&display=swap"
            />
            <title>Chengxi Luo</title>
        </head>
        <body>
        <ThemeRegistry>
            {children}
        </ThemeRegistry>
        </body>
        </html>
    );
}
