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
                position: 'relative',
                py: 1,
                pl: 1,
                pr: 1,
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                cursor: url ? 'pointer' : 'default',
                transition: 'background-color 180ms ease, padding-left 180ms ease',
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
                    bgcolor: 'rgba(127,231,196,0.03)',
                    pl: 2.5,
                    '&::before': {transform: 'scaleY(1)'},
                    '& .project-arrow': {
                        opacity: 1,
                        transform: 'translate(2px, -2px)',
                    },
                    '& .project-name': {color: 'primary.main'},
                },
            }}
        >
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={2}>
                <Stack spacing={0.5} flex={1} minWidth={0}>
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
                            opacity: 0.35,
                            transition: 'all 200ms ease',
                            flexShrink: 0,
                            mt: 0.25,
                        }}
                    />
                )}
            </Stack>
        </Stack>
    );
}
