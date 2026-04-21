import {Box} from "@mui/material";
import React from "react";

export default function SkillChip({label}: { label: string }) {
    return (
        <Box
            component="span"
            sx={{
                display: 'inline-block',
                fontFamily: `'JetBrains Mono', monospace`,
                fontSize: 12.5,
                color: 'text.primary',
                px: 1.5,
                py: 0.5,
                borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.1)',
                bgcolor: 'rgba(255,255,255,0.02)',
                transition: 'all 160ms ease',
                '&:hover': {
                    borderColor: 'primary.main',
                    color: 'primary.main',
                    bgcolor: 'rgba(127,231,196,0.06)',
                },
            }}
        >
            {label}
        </Box>
    );
}
