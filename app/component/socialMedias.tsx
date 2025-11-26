import GithubLogo from '@/public/icon/github.svg'
import InstagramLogo from '@/public/icon/instgram.svg'
import LinkedinLogo from '@/public/icon/linkedin.svg'
import {Stack, IconButton, Tooltip} from "@mui/material"
import EmailIcon from '@mui/icons-material/Email';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import React from "react";

function CustomTooltip({ children,title }: { children: React.ReactElement, title: string }) {
    return <Tooltip title={title} placement={"left"} disableInteractive arrow>
        {children}
    </Tooltip>
}

export function SocialMedias() {
    return <Stack
        width="40px"
        justifyContent={'center'}
        gap={2}
        sx={{
            marginLeft: '3px'
        }}>
        <CustomTooltip title={"Github"}>
            <IconButton size={'small'} onClick={() => {
                window.open("https://github.com/chengxilo", '_blank')
            }}>
                <GithubLogo width={'25px'} height={'25px'} fill={'#ccf8bd'}/>
            </IconButton>
        </CustomTooltip>

        <CustomTooltip title={"LinkedIn"}>
            <IconButton size={'small'} onClick={() => {
                window.open("https://www.linkedin.com/in/chengxi-luo-41b750322/", '_blank')
            }}>
                <LinkedinLogo fill={'#ccf8bd'}/>
            </IconButton>
        </CustomTooltip>

        <CustomTooltip title={"Instagram"}>
            <IconButton size={'small'} onClick={() => {
                window.open("https://www.instagram.com/chengxi_luo/", '_blank')
            }}>
                <InstagramLogo fill={'#ccf8bd'}/>
            </IconButton>
        </CustomTooltip>

        <CustomTooltip title={"Email"}>
            <IconButton
                size="small"
                component="a"
                href="mailto:chengxi.luo2004@gmail.com"
                sx={{color: '#ccf8bd'}}
            >
                <EmailIcon sx={{
                    color: '#ccf8bd',
                }}/>
            </IconButton>
        </CustomTooltip>

        <CustomTooltip title={"Resume"}>
            <IconButton
                size={'small'}
                component={'a'}
                href={'/resume.pdf'}
                download={"Chengxi Luo Resume.pdf"}>
                <FileDownloadIcon sx={{
                    color: '#ccf8bd',
                }}/>
            </IconButton>
        </CustomTooltip>

    </Stack>
}