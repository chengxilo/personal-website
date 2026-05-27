import {Box, Container, Divider, Stack, Typography} from "@mui/material";
import React from "react";
import ProjectDetail from "@/app/component/projectDetail";
import {SocialMedias} from "@/app/component/socialMedias";
import NavBar from "@/app/component/navBar";
import SectionHeader from "@/app/component/sectionHeader";
import SkillChip from "@/app/component/skillChip";
import FadeSection from "@/app/component/fadeSection";
import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import {SKILL_GROUPS, TECH} from "@/app/const";
import portfolioData from "@/app/data/portfolio.json";
import {PullRequest} from "@/app/component/projectDetail";
import LatestActivity, {ActivityItem} from "@/app/component/latestActivity";
import ContributionCalendar, {ContributionCalendar as ContributionCalendarData} from "@/app/component/contributionCalendar";

type PortfolioData = {
    contributed: Record<string, { dateRange: string; prs: PullRequest[] }>;
    own: Record<string, { dateRange: string }>;
    latestActivity?: ActivityItem[];
    contributionCalendar?: ContributionCalendarData | null;
};

const data = portfolioData as PortfolioData;

const prsFor = (repo: string): PullRequest[] => data.contributed[repo]?.prs ?? [];
const dateFor = (repo: string): string | undefined =>
    data.contributed[repo]?.dateRange || data.own[repo]?.dateRange || undefined;

const myOpenSourceRepo = [
    {
        owner: "chengxilo",
        repo: "countdown",
        description: "A GitHub Action that generates a themed countdown SVG for your GitHub profile README.",
        url: "https://github.com/chengxilo/countdown",
        tech: [TECH.GithubWorkflow, TECH.Python],
        date: dateFor("chengxilo/countdown"),
    },
    {
        owner: "chengxilo",
        repo: "better-cuny",
        description: "Open-source browser extension providing additional features and quality-of-life improvements for CUNY websites.",
        url: "https://github.com/chengxilo/better-cuny",
        tech: [TECH.TypeScript, TECH.WXT, TECH.React, TECH.MUI],
        date: dateFor("chengxilo/better-cuny"),
    },
    {
        owner: "private",
        repo: "ddhelper-grubhelper",
        description: "Android automation tool built on AccessibilityService API to optimize schedule management for Doordash/Grubhub drivers.",
        tech: [TECH.Kotlin, TECH.JetpackCompose],
        date: "Jan 2025 — Oct 2025",
    },
    {
        owner: "chengxilo",
        repo: "robinhood-note",
        description: "A note-taking extension for Robinhood — capture trade ideas and reasoning directly on the Robinhood interface.",
        url: "https://github.com/chengxilo/robinhood-note",
        tech: [TECH.TypeScript, TECH.WXT, TECH.React, TECH.MUI],
        date: dateFor("chengxilo/robinhood-note"),
    },
    {
        owner: "chengxilo",
        repo: "steam-scrapy",
        description: "Web scraper for Steam game data built on Scrapy, with pipelines for price history and metadata extraction.",
        url: "https://github.com/chengxilo/steam-scrapy",
        tech: [TECH.Python, TECH.Scrapy, TECH.Selenium],
        date: dateFor("chengxilo/steam-scrapy"),
    },
    {
        owner: "private",
        repo: "hold-cloud-desktop",
        description: "Cloud desktop service platform built on Docker with gRPC — final-year project at Changsha University of Science and Technology.",
        tech: [TECH.Docker, TECH.gRPC, TECH.Go, TECH.Gin, TECH.SQL, TECH.Linux],
        date: "Jan 2024 — Apr 2024",
    },
];

const contributedRepo = [
    {
        owner: "apache",
        repo: "iggy",
        description: "Apache Iggy: hyper-efficient persistent message streaming platform. Contributor & reviewer on the Go SDK — built the BDD framework, leader redirection, binary reader/writer, and publish workflow.",
        url: "https://github.com/apache/iggy",
        tech: [TECH.Go, TECH.Rust, TECH.MessageQueue, TECH.BDD, TECH.GithubWorkflow],
        date: dateFor("apache/iggy"),
        prs: prsFor("apache/iggy"),
    },
    {
        owner: "cucumber",
        repo: "godog",
        description: "The official Cucumber BDD framework for Go.",
        url: "https://github.com/cucumber/godog",
        tech: [TECH.Go, TECH.BDD, TECH.Test],
        date: dateFor("cucumber/godog"),
        prs: prsFor("cucumber/godog"),
    },
    {
        owner: "grpc",
        repo: "grpc-go",
        description: "The Go language implementation of gRPC — HTTP/2-based RPC.",
        url: "https://github.com/grpc/grpc-go",
        tech: [TECH.Go, TECH.gRPC, TECH.HTTP2],
        date: dateFor("grpc/grpc-go"),
        prs: prsFor("grpc/grpc-go"),
    },
    {
        owner: "xournalpp",
        repo: "xournalpp",
        description: "Handwriting notetaking software with PDF annotation support.",
        url: "https://github.com/xournalpp/xournalpp",
        tech: [TECH.Cpp],
        date: dateFor("xournalpp/xournalpp"),
        prs: prsFor("xournalpp/xournalpp"),
    },
    {
        owner: "wxt-dev",
        repo: "wxt",
        description: "Next-gen web extension framework used by the Better CUNY and Robinhood Note extensions.",
        url: "https://github.com/wxt-dev/wxt",
        tech: [TECH.TypeScript, TECH.WXT],
        date: dateFor("wxt-dev/wxt"),
        prs: prsFor("wxt-dev/wxt"),
    },
    {
        owner: "schollz",
        repo: "progressbar",
        description: "A Go progress bar library — added scrolling detail rows, interval-based updates, and bug fixes.",
        url: "https://github.com/schollz/progressbar",
        tech: [TECH.Go],
        date: dateFor("schollz/progressbar"),
        prs: prsFor("schollz/progressbar"),
    },
];

export default function Home() {
    return (
        <Box id="top" sx={{bgcolor: 'background.default', color: 'text.primary', minHeight: '100vh'}}>
            <NavBar/>

            <Container maxWidth="md" sx={{px: {xs: 3, sm: 4}, pt: {xs: 14, sm: 18}, pb: 8}}>
                <FadeSection>
                    <Stack spacing={1} sx={{mb: {xs: 5, sm: 10 }}} alignItems={'center'}>
                        <Typography
                            variant="h1"
                            sx={{
                                fontSize: {xs: 23, sm: 46, md: 48},
                                fontWeight: 500,
                                lineHeight: 1,
                                letterSpacing: '-0.03em',
                            }}
                        >
                            Chengxi Luo
                        </Typography>

                        <Box component="span" sx={{color: 'text.secondary', fontWeight: 400, fontSize: 16}}>
                            Full-stack Developer · Opensource Contributor
                        </Box>

                        <Stack direction="row" alignItems="center" spacing={2} sx={{pt: 1}}>
                            <Stack direction="row" alignItems="center" spacing={0.75}>
                                <LocationOnOutlinedIcon sx={{fontSize: 16, color: 'text.secondary'}}/>
                                <Typography sx={{
                                    fontFamily: `'JetBrains Mono', monospace`,
                                    fontSize: 13,
                                    color: 'text.secondary',
                                }}>
                                    New York City
                                </Typography>
                            </Stack>
                        </Stack>

                        <Stack direction="row" alignItems="center" spacing={1}>
                            <Box sx={{
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                bgcolor: 'primary.main',
                                boxShadow: '0 0 10px rgba(127,231,196,0.8)',
                                animation: 'pulse 2s ease-in-out infinite',
                                '@keyframes pulse': {
                                    '0%, 100%': {opacity: 1},
                                    '50%': {opacity: 0.4},
                                },
                            }}/>
                            <Typography sx={{
                                fontFamily: `'JetBrains Mono', monospace`,
                                fontSize: 13,
                                color: 'text.secondary',
                            }}>
                                Available for opportunities
                            </Typography>
                        </Stack>

                        <SocialMedias/>
                    </Stack>
                </FadeSection>

                {/* About */}
                <FadeSection id="about">
                    <Box sx={{mb: {xs: 3, sm: 5}}}>
                        <SectionHeader eyebrow="01 / about"/>
                        <Box sx={{
                            color: 'text.secondary',
                            '&::after': {content: '""', display: 'block', clear: 'both'},
                            '& p': {margin: 0, marginBottom: 2},
                            '& p:last-of-type': {marginBottom: 0},
                        }}>
                            <Box
                                component="img"
                                src="https://github.com/chengxilo/chengxilo/blob/main/asset/mouse.jpg?raw=true"
                                alt="Chengxi Luo"
                                sx={{
                                    width: {xs: 110, sm: 140},
                                    height: {xs: 110, sm: 140},
                                    borderRadius: 0.5,
                                    objectFit: 'cover',
                                    border: '1px solid rgba(255,255,255,0.08)',
                                    float: 'right',
                                    ml: 1,
                                    mr: {xs: 2, sm: 3},
                                    mb: 1.5,
                                    shapeOutside: 'inset(0 round 8px)',
                                }}
                            />
                            <Typography component="p">
                                Hi! I&apos;m Chengxi Luo, an undergraduate student majoring in Computer
                                Science. I began my studies in Software Engineering at Changsha
                                University of Science and Technology in China, and later transferred
                                to Bernard M. Baruch College in the U.S., where I&apos;m currently
                                continuing my education in New York City.
                            </Typography>
                            <Typography component="p">
                                I&apos;m passionate about learning new technologies and building
                                creative, impactful projects. If you have something interesting to
                                share or a project idea you&apos;d like to collaborate on, feel free
                                to reach out — I&apos;m always open to new opportunities and
                                challenges.
                            </Typography>
                            <Typography component="p">
                                Through this website, I hope to document my journey, share insights
                                and projects, and reflect on the process of learning, experimenting,
                                and creating. This space is a window into my growth as a programmer,
                                and I&apos;m excited to see where the journey leads.
                            </Typography>
                        </Box>
                    </Box>
                </FadeSection>

                <FadeSection id="experience">
                    <Box sx={{mb: {xs: 3, sm: 5}}}>
                        <SectionHeader eyebrow="02 / education"/>
                        <Stack spacing={0}>
                            <TimelineItem
                                time="2026 — Present"
                                title="University at Buffalo"
                                subtitle="Computer Science"
                                location="New York, USA"
                            />
                            <TimelineItem
                                time="2025 — 2026"
                                title="CUNY Bernard M. Baruch College"
                                subtitle="Computer Science"
                                location="New York, USA"
                            />
                            <TimelineItem
                                time="2022 — 2024"
                                title="长沙理工大学 Changsha University of Science & Technology"
                                subtitle="Software Engineering"
                                location="Hunan, China"
                                last
                            />
                        </Stack>
                    </Box>
                </FadeSection>

                <FadeSection id="work">
                    <SectionHeader eyebrow="03 / work"/>

                    <Box sx={{mb: {xs: 3, sm: 5}}}>
                        <Typography sx={{
                            fontFamily: `'JetBrains Mono', monospace`,
                            fontSize: 12,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: 'text.secondary',
                            mb: 2,
                        }}>
                            Open-source contributions
                        </Typography>
                        <Stack spacing={0} sx={{mb: 5, borderTop: '1px solid rgba(255,255,255,0.08)'}}>
                            {contributedRepo.map((e) => (
                                <ProjectDetail key={`${e.owner}/${e.repo}`} {...e}/>
                            ))}
                        </Stack>

                        <Typography sx={{
                            fontFamily: `'JetBrains Mono', monospace`,
                            fontSize: 12,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: 'text.secondary',
                            mb: 2,
                        }}>
                            Personal
                        </Typography>
                        <Stack spacing={0} sx={{borderTop: '1px solid rgba(255,255,255,0.08)'}}>
                            {myOpenSourceRepo.map((e) => (
                                <ProjectDetail key={e.repo} {...e}/>
                            ))}
                        </Stack>
                    </Box>
                </FadeSection>

                <FadeSection id="skills">
                    <Box sx={{mb: {xs: 3, sm: 5}}}>
                        <SectionHeader eyebrow="04 / skills"/>
                        <Stack spacing={3}>
                            {SKILL_GROUPS.map((group) => (
                                <Stack
                                    key={group.title}
                                    direction={{xs: 'column', sm: 'row'}}
                                    spacing={{xs: 1, sm: 3}}
                                    alignItems={{xs: 'flex-start', sm: 'flex-start'}}
                                >
                                    <Typography sx={{
                                        fontFamily: `'JetBrains Mono', monospace`,
                                        fontSize: 12,
                                        letterSpacing: '0.1em',
                                        textTransform: 'uppercase',
                                        color: 'text.secondary',
                                        width: {xs: 'auto', sm: 140},
                                        flexShrink: 0,
                                        pt: {xs: 0, sm: 0.75},
                                    }}>
                                        {group.title}
                                    </Typography>
                                    <Stack direction="row" flexWrap="wrap" gap={1}>
                                        {group.items.map((item) => (
                                            <SkillChip key={item} label={item}/>
                                        ))}
                                    </Stack>
                                </Stack>
                            ))}
                        </Stack>
                    </Box>
                </FadeSection>


                {((data.latestActivity && data.latestActivity.length > 0) || data.contributionCalendar) && (
                    <FadeSection id="activity">
                        <Box sx={{mb: {xs: 3, sm: 5}}}>
                            <SectionHeader eyebrow="05 / activity"/>
                            {data.contributionCalendar && (
                                <Box sx={{mb: 4}}>
                                    <ContributionCalendar calendar={data.contributionCalendar}/>
                                </Box>
                            )}
                            {data.latestActivity && data.latestActivity.length > 0 && (
                                <LatestActivity items={data.latestActivity}/>
                            )}
                        </Box>
                    </FadeSection>
                )}

                <Divider sx={{borderColor: 'rgba(255,255,255,0.06)', mt: 6, mb: 4}}/>

                <Stack
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    sx={{pb: 4}}
                >
                    <Typography sx={{
                        fontFamily: `'JetBrains Mono', monospace`,
                        fontSize: 12,
                        color: 'text.disabled',
                    }}>
                        © 2026 Chengxi Luo
                    </Typography>
                </Stack>
            </Container>
        </Box>
    );
}

function TimelineItem({time, title, subtitle, location, last}: {
    time: string;
    title: string;
    subtitle: string;
    location?: string;
    last?: boolean;
}) {
    return (
        <Stack direction="row" spacing={2.5} sx={{position: 'relative'}}>
            <Stack alignItems="center" sx={{pt: 0.75}}>
                <Box sx={{
                    width: 10,
                    height: 10,
                    borderRadius: '50%',
                    border: '2px solid',
                    borderColor: 'primary.main',
                    bgcolor: 'background.default',
                    flexShrink: 0,
                }}/>
                {!last && (
                    <Box sx={{
                        flex: 1,
                        width: '1px',
                        bgcolor: 'rgba(255,255,255,0.1)',
                        minHeight: 40,
                        mt: 1,
                    }}/>
                )}
            </Stack>
            <Stack spacing={0.5} sx={{pb: last ? 0 : 4, flex: 1}}>
                <Typography sx={{
                    fontFamily: `'JetBrains Mono', monospace`,
                    fontSize: 12,
                    color: 'text.secondary',
                    letterSpacing: '0.05em',
                }}>
                    {time}
                </Typography>
                <Typography sx={{fontSize: 17, fontWeight: 500, color: 'text.primary'}}>
                    {title}
                </Typography>
                <Typography sx={{fontSize: 14, color: 'text.secondary'}}>
                    {subtitle}{location ? ` · ${location}` : ''}
                </Typography>
            </Stack>
        </Stack>
    );
}
