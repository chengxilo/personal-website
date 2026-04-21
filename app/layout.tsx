import React from "react";
import ThemeRegistry from "@/app/component/ThemeRegistry";

export default function RootLayout({children}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
            />
            <title>Chengxi Luo</title>
            <meta name="description"
                  content="Chengxi Luo (罗成熙) — Computer Science student and software engineer based in New York City."/>
        </head>
        <body>
        <ThemeRegistry>
            {children}
        </ThemeRegistry>
        </body>
        </html>
    );
}
