import {Typography, Stack, Skeleton} from "@mui/material";
import {useEffect, useState} from "react";
import axios from "axios";
import {NEXT_PUBLIC_DOMAIN} from "@/app/const";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

function ProjectDetail({repo}: { repo: string }) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [showArrow, setShowArrow] = useState(false);
    const [svnUrl, setSvnUrl] = useState("");
    const [backgroundColor, setBackgroundColor] = useState("none");
    const [createdAt, setCreatedAt] = useState(new Date());
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        console.log(repo);
        console.log(NEXT_PUBLIC_DOMAIN);
        axios.get(`${NEXT_PUBLIC_DOMAIN}/api/repository`, {
            params: {
                repo: repo
            }
        }).then(res => {
            console.log(res);
            setName(res.data.name);
            setDescription(res.data.description);
            setSvnUrl(res.data.svn_url);
            setCreatedAt(new Date(res.data.created_at))
            setLoading(false);
        })
    }, []);
    return <Stack
        width={'100%'}
        component={'a'}
        href={svnUrl}
        direction="row"
        padding={'8px 5px 8px 5px'}
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
        {loading ? <Skeleton variant="rectangular" width={'100%'} height={60}/> :
            <>{showArrow && <ArrowRightIcon sx={{
                color: '#b4fd98'
            }}/>}
                <Stack width={'100%'}>
                    <Stack direction={'row'} justifyContent={'space-between'}>
                        <Typography color={"textPrimary"}>
                            {name}
                        </Typography>
                        <Typography color={'textPrimary'} fontSize={13}>
                            {createdAt.toLocaleDateString()}
                        </Typography>
                    </Stack>

                    <Typography color="textSecondary">
                        {description}
                    </Typography>
                </Stack>
            </>}

    </Stack>
}

export default ProjectDetail;