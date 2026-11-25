export type Tier = 'CORE' | 'PRODUCTION' | 'SYSTEMS' | 'WORKING';

export interface Tech {
  name: string;
  tier: Tier;
  context: string;
  since: string;
}

export interface StackGroup {
  id: string;
  code: string;
  title: string;
  items: Tech[];
}

export const TIER_NOTE: Record<Tier, string> = {
  CORE: 'Daily driver, deepest expertise',
  PRODUCTION: 'Shipped and maintained in production',
  SYSTEMS: 'Low-level, performance-critical work',
  WORKING: 'Used on real projects, not primary',
};

export const STACK: StackGroup[] = [
  {
    id: 'lang',
    code: 'L',
    title: 'Languages',
    items: [
      { name: 'C++', tier: 'SYSTEMS', context: 'Game servers, proxies, ImGui HUDs', since: '2019' },
      { name: 'Python', tier: 'CORE', context: 'Bots, crawlers, agents, FastAPI', since: '2018' },
      { name: 'TypeScript', tier: 'CORE', context: 'SaaS platforms and gateways', since: '2020' },
      { name: 'JavaScript (ES2024)', tier: 'CORE', context: 'Realtime UIs, edge workers', since: '2017' },
      { name: 'Lua', tier: 'SYSTEMS', context: 'Embedded runtimes and FSM scripting', since: '2019' },
      { name: 'PHP', tier: 'WORKING', context: 'Legacy payment site integrations', since: '2018' },
      { name: 'Go', tier: 'PRODUCTION', context: 'Proxy control plane services', since: '2022' },
      { name: 'Rust', tier: 'WORKING', context: 'CLI tools and parsers', since: '2023' },
      { name: 'Java', tier: 'WORKING', context: 'Android JNI bridges', since: '2021' },
      { name: 'Bash / Shell', tier: 'CORE', context: 'Provisioning and ops automation', since: '2018' },
      { name: 'SQL', tier: 'PRODUCTION', context: 'Ledgers, analytics, migrations', since: '2019' },
      { name: 'HTML5 / CSS3', tier: 'CORE', context: 'Hand-built design systems', since: '2016' },
    ],
  },
  {
    id: 'front',
    code: 'F',
    title: 'Frontend & Motion',
    items: [
      { name: 'React', tier: 'CORE', context: 'Dashboards and SaaS clients', since: '2020' },
      { name: 'Next.js', tier: 'PRODUCTION', context: 'SSR marketing and app shells', since: '2021' },
      { name: 'Vite', tier: 'CORE', context: 'Default build tool', since: '2021' },
      { name: 'Tailwind CSS', tier: 'PRODUCTION', context: 'Token-driven styling', since: '2021' },
      { name: 'GSAP / ScrollTrigger', tier: 'PRODUCTION', context: 'Editorial motion systems', since: '2021' },
      { name: 'Lenis', tier: 'PRODUCTION', context: 'Inertial scroll', since: '2023' },
      { name: 'WebGL / Canvas 2D', tier: 'SYSTEMS', context: 'High-density telemetry rendering', since: '2022' },
      { name: 'SVG Architecture', tier: 'PRODUCTION', context: 'Procedural diagrams and icons', since: '2019' },
      { name: 'Framer Motion', tier: 'WORKING', context: 'Component-level transitions', since: '2022' },
    ],
  },
  {
    id: 'back',
    code: 'B',
    title: 'Backend & Realtime',
    items: [
      { name: 'Node.js', tier: 'CORE', context: 'Gateways, webhooks, ledgers', since: '2019' },
      { name: 'FastAPI', tier: 'PRODUCTION', context: 'Telemetry collectors', since: '2021' },
      { name: 'Express', tier: 'PRODUCTION', context: 'Lightweight API services', since: '2019' },
      { name: 'WebSockets', tier: 'CORE', context: 'Live consoles and streams', since: '2020' },
      { name: 'REST APIs', tier: 'CORE', context: 'Public and internal contracts', since: '2018' },
      { name: 'GraphQL', tier: 'WORKING', context: 'Aggregated client queries', since: '2022' },
      { name: 'gRPC', tier: 'PRODUCTION', context: 'Service-to-service control', since: '2023' },
      { name: 'PM2 Cluster', tier: 'PRODUCTION', context: 'Multi-core Node deployments', since: '2020' },
    ],
  },
  {
    id: 'low',
    code: 'S',
    title: 'Low-Level & Systems',
    items: [
      { name: 'Linux Kernel & SysAdmin', tier: 'SYSTEMS', context: 'Tuning, netfilter, cgroups', since: '2018' },
      { name: 'ImGui', tier: 'SYSTEMS', context: 'Overlays and debug HUDs', since: '2021' },
      { name: 'ENet / Raw Sockets', tier: 'SYSTEMS', context: 'Game transport layers', since: '2020' },
      { name: 'Binary Protocol Parsing', tier: 'SYSTEMS', context: 'Reconstructed wire formats', since: '2020' },
      { name: 'Cross-Compilation (MinGW/Clang)', tier: 'SYSTEMS', context: 'Windows and Android targets', since: '2021' },
      { name: 'Packet Analysis', tier: 'SYSTEMS', context: 'Wireshark, tcpdump, dissectors', since: '2019' },
      { name: 'Memory Profiling', tier: 'SYSTEMS', context: 'Valgrind, heaptrack, arenas', since: '2021' },
      { name: 'Termux / Android Internals', tier: 'WORKING', context: 'On-device tooling', since: '2020' },
    ],
  },
  {
    id: 'infra',
    code: 'I',
    title: 'Infrastructure & DevOps',
    items: [
      { name: 'Ubuntu Server LTS', tier: 'CORE', context: 'Every production host', since: '2018' },
      { name: 'Docker & Compose', tier: 'PRODUCTION', context: 'Reproducible service stacks', since: '2020' },
      { name: 'Nginx', tier: 'CORE', context: 'Reverse proxy and TLS', since: '2018' },
      { name: 'Cloudflare (DNS/SSL/Workers)', tier: 'PRODUCTION', context: 'Edge security and routing', since: '2019' },
      { name: 'GitHub Actions CI/CD', tier: 'PRODUCTION', context: 'Build matrices and deploys', since: '2021' },
      { name: 'Caddy', tier: 'WORKING', context: 'Auto-TLS side services', since: '2022' },
      { name: 'Reverse Proxies', tier: 'SYSTEMS', context: 'Custom TCP/UDP middleware', since: '2020' },
      { name: 'Systemd & SSH Automation', tier: 'CORE', context: 'Daemons and fleet ops', since: '2019' },
    ],
  },
  {
    id: 'data',
    code: 'D',
    title: 'Data, AI & Automation',
    items: [
      { name: 'PostgreSQL', tier: 'CORE', context: 'Ledgers and corpora', since: '2019' },
      { name: 'Redis', tier: 'PRODUCTION', context: 'Queues, quotas, pub/sub', since: '2020' },
      { name: 'MongoDB', tier: 'WORKING', context: 'Document-shaped logs', since: '2020' },
      { name: 'Firebase', tier: 'PRODUCTION', context: 'Realtime auth and presence', since: '2021' },
      { name: 'SQLite', tier: 'PRODUCTION', context: 'Embedded shards and caches', since: '2019' },
      { name: 'Telethon / Bot APIs', tier: 'CORE', context: 'Multi-account automation', since: '2020' },
      { name: 'Playwright / Puppeteer', tier: 'PRODUCTION', context: 'Rendered scraping fleets', since: '2021' },
      { name: 'Ollama & Local LLMs', tier: 'PRODUCTION', context: 'Private inference', since: '2024' },
      { name: 'Custom RAG Pipelines', tier: 'PRODUCTION', context: 'Retrieval for agents', since: '2024' },
    ],
  },
];

export const STACK_TOTAL = STACK.reduce((n, g) => n + g.items.length, 0);
