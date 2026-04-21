import GithubLogo from '@/public/icon/github.svg'
import InstagramLogo from '@/public/icon/instgram.svg'
import LinkedinLogo from '@/public/icon/linkedin.svg'
import {Stack, IconButton, Tooltip} from "@mui/material"
import EmailIcon from '@mui/icons-material/Email';
import React from "react";

function CustomTooltip({children, title}: { children: React.ReactElement, title: string }) {
    return <Tooltip title={title} placement="top" disableInteractive arrow>
        {children}
    </Tooltip>
}

const iconButtonSx = {
    color: 'rgba(255,255,255,0.6)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: 2,
    width: 40,
    height: 40,
    transition: 'all 180ms ease',
    '&:hover': {
        color: 'primary.main',
        borderColor: 'primary.main',
        bgcolor: 'rgba(127,231,196,0.06)',
    },
    '& svg': {
        fill: 'currentColor',
    },
};

export function SocialMedias({direction = 'row'}: { direction?: 'row' | 'column' }) {
    return (
        <Stack direction={direction} spacing={1.5}>
            <CustomTooltip title="GitHub">
                <IconButton
                    component="a"
                    href="https://github.com/chengxilo"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={iconButtonSx}
                >
                    <GithubLogo width={18} height={18}/>
                </IconButton>
            </CustomTooltip>

            <CustomTooltip title="LinkedIn">
                <IconButton
                    component="a"
                    href="https://www.linkedin.com/in/chengxi-luo-41b750322/"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={iconButtonSx}
                >
                    <LinkedinLogo width={18} height={18}/>
                </IconButton>
            </CustomTooltip>

            <CustomTooltip title="Instagram">
                <IconButton
                    component="a"
                    href="https://www.instagram.com/chengxi_luo/"
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={iconButtonSx}
                >
                    <InstagramLogo width={18} height={18}/>
                </IconButton>
            </CustomTooltip>

            <CustomTooltip title="Email">
                <IconButton
                    component="a"
                    href="mailto:chengxi.luo2004@gmail.com"
                    sx={iconButtonSx}
                >
                    <EmailIcon sx={{fontSize: 18}}/>
                </IconButton>
            </CustomTooltip>
        </Stack>
    );
}
