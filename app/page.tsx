'use client'

import {Container, Typography, Stack, Box, Grid} from "@mui/material"
import BlinkTitle from "@/app/component/blinkTitle";
import React, {useEffect, useRef} from "react";
import ProjectDetail from "@/app/component/projectDetail";
import {SocialMedias} from "@/app/component/socialMedias";
import {ToBeContinue} from "@/app/component/toBeContinue";
import {MovingSquid} from "@/app/component/movingSquid";
import {NEXT_PUBLIC_GITHUB_USERNAME} from "@/app/const";

export default function Home() {
    const myOpenSourceRepo = ["better-cuny", "robinhood-note", "steam-scrapy"]
    const contributedRepo = [{owner: "apache", repo: "iggy"}, {owner: "cucumber", repo: "godog"}]

    const mousePosRef = useRef([0, 0])
    const [gifPos, setGifPos] = React.useState<[number, number]>([0, 0])
    const [gifSrc, setGifSrc] = React.useState('image/doro-helicopter.gif')
    useEffect(() => {
        const speed = 3; // pixels per frame

        const interval = setInterval(() => {
            const [mx, my] = mousePosRef.current;
            const [gx, gy] = gifPos;

            const dx = mx - gx;
            const dy = my - gy;
            const distance = Math.hypot(dx, dy);

            if (distance < 30 || distance === 0) {
                // stop moving, close enough
                setGifSrc('image/doro-nikke.gif')
            } else {
                setGifSrc('image/doro-helicopter.gif')
                // Move with constant speed toward target
                const ratio = speed / distance;
                const newX = gx + dx * ratio;
                const newY = gy + dy * ratio;
                setGifPos([newX, newY]);
            }
        }, 10); // ~60fps

        return () => clearInterval(interval);
    }, [gifPos]); // gifPos needs to be in deps since it's read inside
    return (
        <div>
            <main>
                <Box width={'100%'} sx={{
                    paddingLeft: '30px',
                    paddingRight: '30px',
                    backgroundColor: 'black',
                    minWidth: '100%'
                }} onMouseMove={(e) => {
                    mousePosRef.current = [e.pageX, e.pageY]
                }}>
                    <Box sx={{
                        position: 'absolute',
                        left: gifPos[0] - 25,
                        top: gifPos[1] - 25,
                        zIndex: 1,
                        width: 50,
                        pointerEvents: 'none'
                    }} component={'img'} src={gifSrc}/>
                    <Container maxWidth={'md'}>
                        <BlinkTitle title={'Welcome to my website'}/>
                        <Stack sx={{
                            position: 'relative'
                        }}>
                            <Box
                            width={70}
                            right={0}
                            bottom={0}
                                component={'img'}
                                 position={'absolute'}
                                src={'image/maodie.gif'}
                                alt={'maodie'} />
                            <Box
                                padding={'1px 15px 8px 15px'}
                                sx={{
                                    borderStyle: 'solid',
                                    borderWidth: '1px',
                                    borderColor: '#626860',
                                }}
                                overflow={'hidden'}>
                                <Typography
                                    fontFamily={'Geo'}
                                    fontSize={'25px'}
                                    width={'100%'}>
                                    About Me
                                </Typography>
                                <Box sx={{
                                    float: 'left',
                                    marginRight: "10px"
                                }}
                                     padding={'3px 3px 3px 3px'}
                                     border={'1px solid'}>
                                    <Box
                                        component={"img"}
                                        src={'https://github.com/chengxilo/chengxilo/blob/main/asset/mouse.jpg?raw=true'}
                                        width={'95px'}
                                        height={'auto'}
                                        alt={"avatar"}
                                        paddingBottom={'3px'}
                                        borderBottom={'1px solid'}
                                        display={'block'}
                                    />
                                    <Typography
                                        width={'100%'}
                                        textAlign={'center'}
                                        fontFamily={'Silkscreen'}
                                        fontSize={'7px'}
                                        color={'5px'}>
                                        2004 - tomorrow
                                    </Typography>
                                </Box>

                                <Typography color={'textSecondary'}>
                                    Hi! I'm Chengxi Luo (罗成熙), an undergraduate student majoring in Computer Science.
                                    I began my studies in Software Engineering at Changsha University of Science and
                                    Technology and later transferred to the U.S., where I'm currently continuing my
                                    education in New York City.
                                    I'm passionate about learning new technologies and building creative,
                                    impactful projects. If you have something interesting to share or a project idea
                                    you'd like to collaborate on, feel free to reach out. I'm always open to new
                                    opportunities and challenges!
                                </Typography>

                                <Stack direction={'row'}>
                                    <Box
                                        component={'img'}
                                        src={'image/bean.gif'}
                                        width={'30px'}
                                        alt={'bean-gif'}/>
                                    <Typography fontFamily={'Geo'} fontSize={'21px'}>
                                        Some quick facts:
                                    </Typography>
                                </Stack>

                                <Typography color={'textSecondary'}>
                                    1. My avatar has a rainbow background but I am straight.
                                    <br/>
                                    2. My main program language is Golang.
                                    <br/>
                                    3. I prefer stay at home.
                                    <br/>
                                    4. I speak both Chinese and English.
                                    <br/>
                                    5. I'm from China.
                                    <br/>
                                    6. I learnt some Spanish but I'm not good at it.
                                    <br/>
                                    7. I spend 3 hours in commuting each day.
                                    <br/>
                                    8. I like Popeye Fried Chicken.🍗
                                    <br/>
                                    9. I donate my blood to New York Blood Center.
                                    <br/>
                                    10. 我不是二次元
                                </Typography>
                            </Box>
                            <Box sx={{
                                position: 'absolute',
                                top: 0,
                                right: 0,
                                transform: 'translateX(100%)'
                            }}>
                                <SocialMedias/>
                            </Box>

                        </Stack>

                        <Stack
                            padding={'4px 15px 10px 15px'}
                            sx={{
                                marginTop: '10px',
                                borderStyle: 'solid',
                                borderWidth: '1px',
                                borderColor: '#626860'
                            }}>
                            <Typography
                                fontSize={'25px'}
                                fontFamily={'Geo'}
                            >
                                Education Experience
                            </Typography>


                            <Education school={'Changsha University of Science & Technology (长沙理工大学)'}
                                       time={'2022 - 2024'} major={"Software Engineering"}/>
                            <Education school={'Bernard M. Baruch College'} time={'2025 - now'}
                                       major={'Computer Science'}/>
                        </Stack>

                        <Stack
                            marginBottom={'10px'}
                            padding={'4px 15px 10px 15px'}
                            sx={{
                                marginTop: '10px',
                                borderStyle: 'solid',
                                borderWidth: '1px',
                                borderColor: '#626860'
                            }}>
                            <Stack>
                                <Typography
                                    fontSize={'25px'}
                                    fontFamily={'Geo'}
                                >
                                    My Skill
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid size={{xs: 6, md: 3}}>
                                        <Typography>
                                            Program Language
                                        </Typography>
                                        <Typography color={'textSecondary'}>
                                            Golang, Typescript, Javascript, Python, Java, Kotlin, C++
                                        </Typography>
                                    </Grid>
                                    <Grid size={{xs: 6, md: 3}}>
                                        <Typography>
                                            Frontend Technologies
                                        </Typography>
                                        <Typography color={'textSecondary'}>
                                            React, PhotoShop, wxt, Android Jetpack Compose
                                        </Typography>
                                    </Grid>

                                    <Grid size={{xs: 6, md: 3}}>
                                        <Typography>
                                            Backend Technologies
                                        </Typography>
                                        <Typography color={'textSecondary'}>
                                            gRPC, SQL, SpringBoot, Nodejs
                                        </Typography>
                                    </Grid>

                                    <Grid size={{xs: 6, md: 3}}>
                                        <Typography>
                                            Data Analysis
                                        </Typography>
                                        <Typography color={'textSecondary'}>
                                            Pandas, Selenium, Scrapy
                                        </Typography>
                                    </Grid>

                                    <Grid size={{xs: 6, md: 3}}>
                                        <Typography>
                                            Tools
                                        </Typography>
                                        <Typography color={'textSecondary'}>
                                            Docker, Git
                                        </Typography>
                                    </Grid>


                                    <Grid size={{xs: 6, md: 3}}>
                                        <Typography>
                                            Document
                                        </Typography>
                                        <Typography color={'textSecondary'}>
                                            LaTex, Markdown, ApiFox
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Stack>
                        </Stack>


                        <Stack
                            marginBottom={'10px'}
                            padding={'4px 15px 6px 15px'}
                            sx={{
                                borderStyle: 'solid',
                                borderWidth: '1px',
                                borderColor: '#626860'
                            }}>
                            <Stack direction={'row'}>
                                <Typography
                                    fontSize={'25px'}
                                    fontFamily={'Geo'}
                                    sx={{flexShrink: 0}}
                                >
                                    My Open Source Projects
                                </Typography>

                            </Stack>
                            {myOpenSourceRepo.map((repo, index) => <ProjectDetail key={`project-${index}`} owner={NEXT_PUBLIC_GITHUB_USERNAME} repo={repo}/>)}
                            <ToBeContinue/>
                        </Stack>


                        <Stack
                            padding={'4px 15px 6px 15px'}
                            sx={{
                                borderStyle: 'solid',
                                borderWidth: '1px',
                                borderColor: '#626860'
                            }}>
                            <Stack direction={'row'}>
                                <Typography
                                    fontSize={'25px'}
                                    fontFamily={'Geo'}
                                    sx={{flexShrink: 0}}
                                >
                                    I Contributed Code To
                                </Typography>
                                <MovingSquid/>
                            </Stack>
                            {contributedRepo.map((e, index) => <ProjectDetail key={`project-${index}`} owner={e.owner} repo={e.repo}/>)}
                            <ToBeContinue/>
                        </Stack>
                    </Container>
                </Box>
            </main>
            <footer>
                <Stack width={'100%'}
                       direction={'row'}
                       justifyContent={'center'}
                       sx={{
                           paddingBottom: '1vh',
                           paddingTop: '5vh',
                           backgroundColor: '#000000',
                       }}>
                    <Typography>
                        © 2025 Chengxi Luo. All Rights Reserved.
                    </Typography>
                </Stack>
            </footer>
        </div>
    );
}


function Education({school, time, major}: { school: string, time: string, major: string }) {
    return <Stack sx={{
        marginTop: '4px',
        marginBottom: '4px',
    }}>
        <Stack direction={'row'} justifyContent={'space-between'}>
            <Typography>
                {school}
            </Typography>
            <Typography flexShrink={0}>
                {time}
            </Typography>
        </Stack>
        <Typography color={'textSecondary'}>
            Major in {major}
        </Typography>
    </Stack>
}
