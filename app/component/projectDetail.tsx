'use client'

import {useState} from 'react';
import {Stack, Typography, Box} from "@mui/material";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import CallMergeIcon from '@mui/icons-material/CallMerge';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import {Tech} from "@/app/const";

export type PullRequest = {
    number: number;
    title: string;
    url: string;
    merged?: boolean;
};

const COLLAPSED_COUNT = 5;
const PAGE_SIZE = 10;

export default function ProjectDetail({owner, repo, description, url, tech, prs, date}:
                                      {
                                          owner: string,
                                          repo: string,
                                          description: string,
                                          url?: string,
                                          tech?: Tech[],
                                          prs?: PullRequest[],
                                          date?: string,
                                      }) {
    const [expanded, setExpanded] = useState(false);
    const [page, setPage] = useState(0);
    const totalPages = prs ? Math.max(1, Math.ceil(prs.length / PAGE_SIZE)) : 0;
    const visiblePrs = prs
        ? (expanded
            ? prs.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)
            : prs.slice(0, COLLAPSED_COUNT))
        : [];
    const hasMore = !!prs && prs.length > COLLAPSED_COUNT;
    return (
        <Box
            sx={{
                display: 'block',
                position: 'relative',
                py: 1,
                pl: 2.5,
                pr: 1,
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                transition: 'background-color 180ms ease',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '2px',
                    bgcolor: 'primary.main',
                    transform: 'scaleY(0)',
                    transformOrigin: 'center',
                    transition: 'transform 200ms ease',
                },
                '&:hover': {
                    bgcolor: url ? 'rgba(127,231,196,0.03)' : 'transparent',
                    '&::before': {transform: url ? 'scaleY(1)' : 'scaleY(0)'},
                    '& .project-arrow': {
                        opacity: 1,
                        transform: 'translate(2px, -2px)',
                    },
                    '& .project-name': {color: url ? 'primary.main' : 'text.primary'},
                },
            }}
        >
            {url && (
                <Box
                    component="a"
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${owner}/${repo}`}
                    sx={{
                        position: 'absolute',
                        inset: 0,
                        zIndex: 0,
                        cursor: 'pointer',
                    }}
                />
            )}
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2} sx={{position: 'relative', pointerEvents: 'none'}}>
                <Stack
                    className="project-content"
                    spacing={0.5}
                    flex={1}
                    minWidth={0}
                >
                    <Stack direction="row" alignItems="baseline" justifyContent="space-between" spacing={1.5}>
                        <Typography
                            className="project-name"
                            sx={{
                                fontFamily: `'JetBrains Mono', monospace`,
                                fontSize: 14.5,
                                fontWeight: 500,
                                color: 'text.primary',
                                transition: 'color 160ms ease',
                                wordBreak: 'break-word',
                                minWidth: 0,
                            }}
                        >
                            <Box component="span" sx={{color: 'text.secondary'}}>{owner}/</Box>{repo}
                        </Typography>
                        {date && (
                            <Typography sx={{
                                fontFamily: `'JetBrains Mono', monospace`,
                                fontSize: 11.5,
                                color: 'text.disabled',
                                letterSpacing: '0.03em',
                                flexShrink: 0,
                                whiteSpace: 'nowrap',
                            }}>
                                {date}
                            </Typography>
                        )}
                    </Stack>
                    <Typography sx={{fontSize: 14, color: 'text.secondary'}}>
                        {description}
                    </Typography>
                    {tech && tech.length > 0 && (
                        <Stack direction="row" flexWrap="wrap" gap={0.75} sx={{pt: 0.5}}>
                            {tech.map((t) => (
                                <Box
                                    key={t}
                                    component="span"
                                    sx={{
                                        fontFamily: `'JetBrains Mono', monospace`,
                                        fontSize: 11,
                                        color: 'text.secondary',
                                        px: 0.9,
                                        py: 0.15,
                                        borderRadius: 999,
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        bgcolor: 'rgba(255,255,255,0.015)',
                                        letterSpacing: '0.02em',
                                    }}
                                >
                                    {t}
                                </Box>
                            ))}
                        </Stack>
                    )}
                    {prs && prs.length > 0 && (
                        <Stack spacing={0.25} sx={{pt: 1}}>
                            {visiblePrs.map((pr) => (
                                <Box
                                    key={pr.number}
                                    component="a"
                                    href={pr.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        gap: 0.75,
                                        textDecoration: 'none',
                                        color: 'text.secondary',
                                        fontSize: 13,
                                        lineHeight: 1.45,
                                        py: 0.15,
                                        position: 'relative',
                                        pointerEvents: 'auto',
                                        transition: 'color 140ms ease',
                                        '&:hover': {color: 'primary.main'},
                                    }}
                                >
                                    <CallMergeIcon sx={{
                                        fontSize: 14,
                                        mt: '3px',
                                        color: pr.merged ? 'primary.main' : 'text.disabled',
                                        flexShrink: 0,
                                    }}/>
                                    <Box component="span" sx={{
                                        fontFamily: `'JetBrains Mono', monospace`,
                                        fontSize: 12,
                                        color: 'text.disabled',
                                        flexShrink: 0,
                                    }}>
                                        #{pr.number}
                                    </Box>
                                    <Box component="span" sx={{wordBreak: 'break-word'}}>
                                        {pr.title}
                                    </Box>
                                </Box>
                            ))}
                            {hasMore && !expanded && (
                                <Box
                                    component="button"
                                    type="button"
                                    onClick={() => { setExpanded(true); setPage(0); }}
                                    sx={{
                                        fontFamily: `'JetBrains Mono', monospace`,
                                        fontSize: 12,
                                        color: 'text.disabled',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        pl: 2.75,
                                        pt: 0.5,
                                        alignSelf: 'flex-start',
                                        position: 'relative',
                                        pointerEvents: 'auto',
                                        transition: 'color 140ms ease',
                                        textAlign: 'left',
                                        '&:hover': {color: 'primary.main'},
                                    }}
                                >
                                    see {prs!.length - COLLAPSED_COUNT} more ↓
                                </Box>
                            )}
                            {hasMore && expanded && (
                                <Stack
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="space-between"
                                    spacing={1}
                                    sx={{
                                        pl: 2.75,
                                        pt: 0.5,
                                        position: 'relative',
                                        pointerEvents: 'auto',
                                    }}
                                >
                                    <Box
                                        component="button"
                                        type="button"
                                        onClick={() => { setExpanded(false); setPage(0); }}
                                        sx={{
                                            fontFamily: `'JetBrains Mono', monospace`,
                                            fontSize: 12,
                                            color: 'text.disabled',
                                            background: 'none',
                                            border: 'none',
                                            cursor: 'pointer',
                                            p: 0,
                                            transition: 'color 140ms ease',
                                            '&:hover': {color: 'primary.main'},
                                        }}
                                    >
                                        collapse ↑
                                    </Box>
                                    {totalPages > 1 && (
                                        <Stack direction={"row"}>
                                            <Box
                                                component="button"
                                                type="button"
                                                disabled={page === 0}
                                                onClick={() => setPage((p) => Math.max(0, p - 1))}
                                                sx={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    width: 22,
                                                    height: 22,
                                                    p: 0,
                                                    background: 'none',
                                                    border: '1px solid rgba(255,255,255,0.08)',
                                                    borderRadius: 1,
                                                    color: page === 0 ? 'text.disabled' : 'text.secondary',
                                                    cursor: page === 0 ? 'default' : 'pointer',
                                                    transition: 'color 140ms ease, border-color 140ms ease',
                                                    '&:hover': page === 0 ? {} : {color: 'primary.main', borderColor: 'primary.main'},
                                                }}
                                            >
                                                <ChevronLeftIcon sx={{fontSize: 16}}/>
                                            </Box>
                                            <Typography sx={{
                                                fontFamily: `'JetBrains Mono', monospace`,
                                                fontSize: 11.5,
                                                color: 'text.disabled',
                                                minWidth: 50,
                                                textAlign: 'center',
                                            }}>
                                                {page + 1} / {totalPages}
                                            </Typography>
                                            <Box
                                                component="button"
                                                type="button"
                                                disabled={page >= totalPages - 1}
                                                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                                                sx={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    width: 22,
                                                    height: 22,
                                                    p: 0,
                                                    background: 'none',
                                                    border: '1px solid rgba(255,255,255,0.08)',
                                                    borderRadius: 1,
                                                    color: page >= totalPages - 1 ? 'text.disabled' : 'text.secondary',
                                                    cursor: page >= totalPages - 1 ? 'default' : 'pointer',
                                                    transition: 'color 140ms ease, border-color 140ms ease',
                                                    '&:hover': page >= totalPages - 1 ? {} : {color: 'primary.main', borderColor: 'primary.main'},
                                                }}
                                            >
                                                <ChevronRightIcon sx={{fontSize: 16}}/>
                                            </Box>
                                        </Stack>
                                    )}
                                </Stack>
                            )}
                        </Stack>
                    )}
                </Stack>
                {url && (
                    <ArrowOutwardIcon
                        className="project-arrow"
                        sx={{
                            fontSize: 18,
                            color: 'primary.main',
                            opacity: 0.35,
                            transition: 'all 200ms ease',
                            flexShrink: 0,
                            mt: 0.25,
                        }}
                    />
                )}
            </Stack>
        </Box>
    );
}
