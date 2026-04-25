'use client'

import {Box, Stack, Tooltip, Typography} from "@mui/material";

export type CalendarDay = { date: string; count: number };
export type ContributionCalendar = {
    totalContributions: number;
    weeks: CalendarDay[][];
};

const CELL = 11;
const GAP = 3;

function shade(count: number): string {
    if (count === 0) return 'rgba(255,255,255,0.04)';
    if (count < 3)   return 'rgba(127,231,196,0.25)';
    if (count < 6)   return 'rgba(127,231,196,0.45)';
    if (count < 10)  return 'rgba(127,231,196,0.7)';
    return '#7FE7C4';
}

function formatDate(iso: string): string {
    const d = new Date(iso + 'T00:00:00Z');
    return d.toLocaleDateString(undefined, {month: 'short', day: 'numeric', year: 'numeric'});
}

export default function ContributionCalendar({calendar}: { calendar: ContributionCalendar | null | undefined }) {
    if (!calendar || !calendar.weeks?.length) return null;

    const monthLabels: { weekIndex: number; label: string }[] = [];
    let prevMonth = -1;
    calendar.weeks.forEach((week, i) => {
        const first = week[0];
        if (!first) return;
        const m = new Date(first.date + 'T00:00:00Z').getUTCMonth();
        if (m !== prevMonth) {
            monthLabels.push({
                weekIndex: i,
                label: new Date(first.date + 'T00:00:00Z').toLocaleDateString(undefined, {month: 'short'}),
            });
            prevMonth = m;
        }
    });

    return (
        <Stack spacing={1.25}>
            <Stack direction="row" alignItems="baseline" justifyContent="space-between">
                <Typography sx={{
                    fontFamily: `'JetBrains Mono', monospace`,
                    fontSize: 12.5,
                    color: 'text.secondary',
                }}>
                    {calendar.totalContributions.toLocaleString()} contributions in the last year
                </Typography>
                <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Typography sx={{fontFamily: `'JetBrains Mono', monospace`, fontSize: 11, color: 'text.disabled'}}>
                        less
                    </Typography>
                    {[0, 2, 5, 9, 12].map((c) => (
                        <Box key={c} sx={{
                            width: CELL, height: CELL, borderRadius: 0.5,
                            bgcolor: shade(c),
                        }}/>
                    ))}
                    <Typography sx={{fontFamily: `'JetBrains Mono', monospace`, fontSize: 11, color: 'text.disabled'}}>
                        more
                    </Typography>
                </Stack>
            </Stack>

            <Box sx={{overflowX: 'auto', pb: 1}}>
                <Box sx={{position: 'relative', minWidth: calendar.weeks.length * (CELL + GAP)}}>
                    <Box sx={{
                        position: 'relative',
                        height: 14,
                        mb: 0.5,
                    }}>
                        {monthLabels.map((m) => (
                            <Typography
                                key={`${m.label}-${m.weekIndex}`}
                                sx={{
                                    position: 'absolute',
                                    left: m.weekIndex * (CELL + GAP),
                                    fontFamily: `'JetBrains Mono', monospace`,
                                    fontSize: 10.5,
                                    color: 'text.disabled',
                                    letterSpacing: '0.04em',
                                }}
                            >
                                {m.label}
                            </Typography>
                        ))}
                    </Box>
                    <Stack direction="row" spacing={`${GAP}px`}>
                        {calendar.weeks.map((week, wi) => (
                            <Stack key={wi} spacing={`${GAP}px`}>
                                {Array.from({length: 7}).map((_, di) => {
                                    const day = week[di];
                                    if (!day) {
                                        return <Box key={di} sx={{width: CELL, height: CELL}}/>;
                                    }
                                    const label = day.count === 0
                                        ? `No contributions on ${formatDate(day.date)}`
                                        : `${day.count} contribution${day.count === 1 ? '' : 's'} on ${formatDate(day.date)}`;
                                    return (
                                        <Tooltip key={di} title={label} placement="top" disableInteractive arrow>
                                            <Box sx={{
                                                width: CELL,
                                                height: CELL,
                                                borderRadius: 0.5,
                                                bgcolor: shade(day.count),
                                                outline: '1px solid rgba(255,255,255,0.04)',
                                                outlineOffset: '-1px',
                                                transition: 'transform 120ms ease',
                                                '&:hover': {transform: 'scale(1.25)'},
                                            }}/>
                                        </Tooltip>
                                    );
                                })}
                            </Stack>
                        ))}
                    </Stack>
                </Box>
            </Box>
        </Stack>
    );
}
