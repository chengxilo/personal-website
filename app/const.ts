export const TECH = {
    // Languages
    Go: 'Go',
    TypeScript: 'TypeScript',
    JavaScript: 'JavaScript',
    Python: 'Python',
    Java: 'Java',
    Kotlin: 'Kotlin',
    Cpp: 'C++',
    Rust: 'Rust',

    // Frontend
    React: 'React',
    NextJs: 'Next.js',
    MUI: 'MUI',
    JetpackCompose: 'Jetpack Compose',
    WXT: 'WXT',
    HTML: 'HTML',
    CSS: 'CSS',
    Tauri: 'Tauri',

    // Backend
    gRPC: 'gRPC',
    SQL: 'SQL',
    SpringBoot: 'Spring Boot',
    NodeJs: 'Node.js',
    Gin: 'Gin',
    Gorm: 'Gorm',
    MyBatis: 'MyBatis',
    MessageQueue: 'Message Queue(MQ)',
    HTTP2: 'HTTP/2',

    // Data
    Pandas: 'Pandas',
    Selenium: 'Selenium',
    Scrapy: 'Scrapy',

    // Tooling
    Docker: 'Docker',
    Git: 'Git',
    LaTeX: 'LaTeX',
    Apifox: 'Apifox',
    Linux: 'Linux',
    Photoshop: 'Photoshop',
    BDD: 'Behavior-Driven Development(BDD)',
    Test: 'Test',
    GithubWorkflow: 'Github Workflow(CI/CD)',
} as const;

export type Tech = typeof TECH[keyof typeof TECH];

export const SKILL_GROUPS: { title: string; items: Tech[] }[] = [
    {
        title: 'Languages',
        items: [TECH.Go, TECH.TypeScript, TECH.JavaScript, TECH.Python, TECH.Java, TECH.Kotlin, TECH.Cpp, TECH.Rust],
    },
    {
        title: 'Frontend',
        items: [TECH.React, TECH.NextJs, TECH.MUI, TECH.JetpackCompose, TECH.WXT, TECH.HTML, TECH.CSS, TECH.Tauri],
    },
    {
        title: 'Backend',
        items: [TECH.gRPC, TECH.SQL, TECH.SpringBoot, TECH.NodeJs, TECH.Gin, TECH.Gorm, TECH.MyBatis, TECH.MessageQueue],
    },
    {
        title: 'Data',
        items: [TECH.Pandas, TECH.Selenium, TECH.Scrapy],
    },
    {
        title: 'Tooling',
        items: [TECH.Docker, TECH.Git, TECH.LaTeX, TECH.Apifox, TECH.Linux, TECH.Photoshop, TECH.GithubWorkflow],
    },
];
