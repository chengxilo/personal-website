import {Box, Stack, Typography} from "@mui/material";
import React from "react";

export default function SectionHeader({eyebrow}: { eyebrow: string }) {
    return (
        <Stack direction="row" alignItems="center" spacing={1.75} sx={{mb: 3}}>
            <Box sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: 'primary.main',
                boxShadow: '0 0 14px rgba(127,231,196,0.7)',
            }}/>
            <Typography sx={{
                fontFamily: `'JetBrains Mono', monospace`,
                fontSize: 16,
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'primary.main',
            }}>
                {eyebrow}
            </Typography>
        </Stack>
    );
}
