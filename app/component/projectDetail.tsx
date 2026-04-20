import {Typography, Stack} from "@mui/material";
import {useState} from "react";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

function ProjectDetail({owner, repo, description, url}: { owner: string, repo: string, description: string, url: string }) {
    const [showArrow, setShowArrow] = useState(false);
    const [backgroundColor, setBackgroundColor] = useState("none");
    const name = `${owner}/${repo}`;
    return <Stack
        width={'100%'}
        component={url ? 'a' : 'div'}
        href={url || undefined}
        direction="row"
        padding={'8px 5px 8px 0px'}
        sx={{
            borderBottom: '1px solid gray',
            textDecorationLine: 'none',
            backgroundColor: backgroundColor
        }}
        onMouseEnter={() => {
            setShowArrow(true)
            setBackgroundColor('rgba(52,73,56,0.53)')
        }}
        onMouseLeave={() => {
            setShowArrow(false)
            setBackgroundColor('none')
        }}
    >
        {showArrow && <ArrowRightIcon sx={{color: '#b4fd98'}}/>}
        <Stack width={'100%'}>
            <Stack direction={'row'} justifyContent={'space-between'}>
                <Typography color={"textPrimary"}>
                    {name}
                </Typography>
            </Stack>
            <Typography color="textSecondary">
                {description}
            </Typography>
        </Stack>
    </Stack>
}

export default ProjectDetail;