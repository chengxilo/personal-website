'use client'

import {useEffect, useState} from 'react';
import {Box, Stack, Typography} from "@mui/material";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CallMergeIcon from '@mui/icons-material/CallMerge';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import RateReviewOutlinedIcon from '@mui/icons-material/RateReviewOutlined';
import ForumOutlinedIcon from '@mui/icons-material/ForumOutlined';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export type ActivityType =
    | 'pr_opened' | 'pr_merged'
    | 'issue_opened' | 'issue_closed'
    | 'pr_comment' | 'issue_comment'
    | 'review' | 'review_comment'
    | 'discussion' | 'discussion_comment';

export type ActivityItem = {
    type: ActivityType;
    repo: string;
    number?: number | null;
    title: string;
    url: string;
    createdAt: string;
};

const STYLE: Record<ActivityType, { color: string; Icon: typeof CallMergeIcon; verb: string }> = {
    pr_opened:          { color: '#3fb950', Icon: RadioButtonUncheckedIcon, verb: 'opened PR' },
    pr_merged:          { color: '#a371f7', Icon: CallMergeIcon,            verb: 'merged PR' },
    issue_opened:       { color: '#3fb950', Icon: ErrorOutlineIcon,         verb: 'opened issue' },
    issue_closed:       { color: '#a371f7', Icon: CheckCircleOutlineIcon,   verb: 'closed issue' },
    pr_comment:         { color: '#7FE7C4', Icon: ChatBubbleOutlineIcon,    verb: 'commented on PR' },
    issue_comment:      { color: '#7FE7C4', Icon: ChatBubbleOutlineIcon,    verb: 'commented on issue' },
    review:             { color: '#7FE7C4', Icon: RateReviewOutlinedIcon,   verb: 'reviewed PR' },
    review_comment:     { color: '#7FE7C4', Icon: RateReviewOutlinedIcon,   verb: 'reviewed PR' },
    discussion:         { color: '#7FE7C4', Icon: ForumOutlinedIcon,        verb: 'started discussion' },
    discussion_comment: { color: '#7FE7C4', Icon: ForumOutlinedIcon,        verb: 'replied to discussion' },
};

const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function staticDate(iso: string): string {
    const d = new Date(iso);
    return `${MONTHS_SHORT[d.getUTCMonth()]} ${d.getUTCDate()}`;
}

function relativeTime(iso: string, now: number): string {
    const then = new Date(iso).getTime();
    const diff = now - then;
    const min = 60 * 1000, hr = 60 * min, day = 24 * hr;
    if (diff < hr) return `${Math.max(1, Math.floor(diff / min))}m ago`;
    if (diff < day) return `${Math.floor(diff / hr)}h ago`;
    if (diff < 30 * day) return `${Math.floor(diff / day)}d ago`;
    if (diff < 365 * day) return `${Math.floor(diff / (30 * day))}mo ago`;
    return `${Math.floor(diff / (365 * day))}y ago`;
}

function TimeStamp({iso}: { iso: string }) {
    const [now, setNow] = useState<number | null>(null);
    useEffect(() => { setNow(Date.now()); }, []);
    return <>{now === null ? staticDate(iso) : relativeTime(iso, now)}</>;
}

export default function LatestActivity({items}: { items: ActivityItem[] }) {
    if (!items || items.length === 0) return null;
    return (
        <Stack spacing={0} sx={{borderTop: '1px solid rgba(255,255,255,0.08)'}}>
            {items.map((it, idx) => {
                const {color, Icon, verb} = STYLE[it.type];
                return (
                    <Box
                        key={`${it.type}-${it.repo}-${it.number}-${idx}`}
                        component="a"
                        href={it.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: 1,
                            textDecoration: 'none',
                            color: 'text.secondary',
                            py: 1,
                            pl: 2.5,
                            pr: 1,
                            borderBottom: '1px solid rgba(255,255,255,0.08)',
                            transition: 'background-color 180ms ease, color 140ms ease',
                            position: 'relative',
                            '&::before': {
                                content: '""',
                                position: 'absolute',
                                left: 0, top: 0, bottom: 0,
                                width: '2px',
                                bgcolor: 'primary.main',
                                transform: 'scaleY(0)',
                                transition: 'transform 200ms ease',
                            },
                            '&:hover': {
                                bgcolor: 'rgba(127,231,196,0.03)',
                                color: 'text.primary',
                                '&::before': {transform: 'scaleY(1)'},
                                '& .activity-title': {color: 'primary.main'},
                            },
                        }}
                    >
                        <Icon sx={{fontSize: 14, mt: '4px', color, flexShrink: 0}}/>
                        <Stack spacing={0.25} flex={1} minWidth={0}>
                            <Stack direction="row" alignItems="baseline" spacing={1} sx={{minWidth: 0}}>
                                <Typography sx={{
                                    fontFamily: `'JetBrains Mono', monospace`,
                                    fontSize: 12,
                                    color: 'text.disabled',
                                    flexShrink: 0,
                                }}>
                                    {verb}
                                </Typography>
                                <Typography sx={{
                                    fontFamily: `'JetBrains Mono', monospace`,
                                    fontSize: 12.5,
                                    color: 'text.secondary',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    minWidth: 0,
                                }}>
                                    {it.repo}{it.number ? `#${it.number}` : ''}
                                </Typography>
                                <Box flex={1}/>
                                <Typography sx={{
                                    fontFamily: `'JetBrains Mono', monospace`,
                                    fontSize: 11.5,
                                    color: 'text.disabled',
                                    flexShrink: 0,
                                }}>
                                    <TimeStamp iso={it.createdAt}/>
                                </Typography>
                            </Stack>
                            <Typography
                                className="activity-title"
                                sx={{
                                    fontSize: 13.5,
                                    color: 'text.primary',
                                    transition: 'color 140ms ease',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    display: '-webkit-box',
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: 'vertical',
                                    wordBreak: 'break-word',
                                }}
                            >
                                {it.title}
                            </Typography>
                        </Stack>
                    </Box>
                );
            })}
        </Stack>
    );
}
