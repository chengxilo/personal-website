'use client'

import {Box, Stack, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";

const sections = [
    {id: 'about', label: 'About'},
    {id: 'experience', label: 'Experience'},
    {id: 'work', label: 'Work'},
    {id: 'skills', label: 'Skills'},
];

export default function NavBar() {
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState<string>('about');

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 24);
            const y = window.scrollY + 120;
            let current = sections[0].id;
            for (const s of sections) {
                const el = document.getElementById(s.id);
                if (el && el.offsetTop <= y) current = s.id;
            }
            setActive(current);
        };
        onScroll();
        window.addEventListener('scroll', onScroll, {passive: true});
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const handleClick = (e: React.MouseEvent, id: string) => {
        e.preventDefault();
        const el = document.getElementById(id);
        if (el) {
            window.scrollTo({top: el.offsetTop - 64, behavior: 'smooth'});
        }
    };

    return (
        <Box
            component="nav"
            sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                backdropFilter: scrolled ? 'blur(12px) saturate(180%)' : 'none',
                backgroundColor: scrolled ? 'rgba(10,10,10,0.72)' : 'transparent',
                borderBottom: scrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent',
                transition: 'all 220ms ease',
            }}
        >
            <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                    maxWidth: 960,
                    mx: 'auto',
                    px: {xs: 3, sm: 4},
                    height: 64,
                }}
            >
                <Typography
                    component="a"
                    href="#top"
                    onClick={(e) => handleClick(e, 'top')}
                    sx={{
                        fontFamily: `'JetBrains Mono', monospace`,
                        fontSize: 14,
                        fontWeight: 500,
                        color: 'primary.main',
                        textDecoration: 'none',
                        letterSpacing: '0.04em',
                    }}
                >
                    chengxilo<Box component="span" sx={{color: 'text.primary'}}>.dev</Box>
                </Typography>

                <Stack direction="row" spacing={{xs: 2, sm: 3}}>
                    <Box
                        component="a"
                        href="/resume.pdf"
                        download="Chengxi Luo Resume.pdf"
                        sx={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 1,
                            fontFamily: `'JetBrains Mono', monospace`,
                            fontSize: 13,
                            fontWeight: 500,
                            color: '#0A0A0A',
                            bgcolor: 'primary.main',
                            textDecoration: 'none',
                            px: 1,
                            py: 0.5,
                            borderRadius: 0.75,
                            transition: 'all 160ms ease',
                            '&:hover': {
                                bgcolor: '#A3F0D3',
                                transform: 'translateY(-1px)',
                            },
                        }}
                    >
                        <FileDownloadOutlinedIcon sx={{fontSize: 16}}/>
                        Resume
                    </Box>
                    {sections.map((s) => (
                        <Typography
                            key={s.id}
                            component="a"
                            href={`#${s.id}`}
                            onClick={(e) => handleClick(e, s.id)}
                            sx={{
                                fontFamily: `'JetBrains Mono', monospace`,
                                fontSize: 13,
                                color: active === s.id ? 'primary.main' : 'text.secondary',
                                textDecoration: 'none',
                                alignContent: 'center',
                                transition: 'color 160ms ease',
                                '&:hover': {color: 'primary.main'},
                                display: {xs: s.id === 'experience' || s.id === 'skills' ? 'none' : 'inline', sm: 'inline'},
                            }}
                        >
                            {s.label}
                        </Typography>
                    ))}
                </Stack>
            </Stack>
        </Box>
    );
}
