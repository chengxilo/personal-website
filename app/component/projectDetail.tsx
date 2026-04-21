import {Stack, Typography, Box} from "@mui/material";
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

export default function ProjectDetail({owner, repo, description, url}:
                                      { owner: string, repo: string, description: string, url: string }) {
    return (
        <Stack
            component={url ? 'a' : 'div'}
            href={url || undefined}
            target={url ? '_blank' : undefined}
            rel={url ? 'noopener noreferrer' : undefined}
            sx={{
                display: 'block',
                textDecoration: 'none',
                color: 'inherit',
                p: 2.5,
                borderRadius: 2,
                border: '1px solid rgba(255,255,255,0.08)',
                bgcolor: 'rgba(255,255,255,0.015)',
                transition: 'all 200ms ease',
                cursor: url ? 'pointer' : 'default',
                '&:hover': {
                    borderColor: 'rgba(127,231,196,0.4)',
                    bgcolor: 'rgba(127,231,196,0.03)',
                    transform: 'translateY(-2px)',
                    '& .project-arrow': {
                        opacity: 1,
                        transform: 'translate(2px, -2px)',
                    },
                    '& .project-name': {
                        color: 'primary.main',
                    },
                },
            }}
        >
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
                <Stack spacing={0.75} flex={1} minWidth={0}>
                    <Typography
                        className="project-name"
                        sx={{
                            fontFamily: `'JetBrains Mono', monospace`,
                            fontSize: 14.5,
                            fontWeight: 500,
                            color: 'text.primary',
                            transition: 'color 160ms ease',
                            wordBreak: 'break-word',
                        }}
                    >
                        <Box component="span" sx={{color: 'text.secondary'}}>{owner}/</Box>{repo}
                    </Typography>
                    <Typography sx={{fontSize: 14, color: 'text.secondary'}}>
                        {description}
                    </Typography>
                </Stack>
                {url && (
                    <ArrowOutwardIcon
                        className="project-arrow"
                        sx={{
                            fontSize: 18,
                            color: 'primary.main',
                            opacity: 0.4,
                            transition: 'all 200ms ease',
                            flexShrink: 0,
                        }}
                    />
                )}
            </Stack>
        </Stack>
    );
}
