export const PRINCIPLES = [
  {
    index: '01',
    title: 'Zero Bloat',
    body: 'Every dependency is a liability with a maintenance bill. If thirty lines replace a library, write the thirty lines.',
    spec: 'DEPS / AUDITED',
  },
  {
    index: '02',
    title: 'Raw Latency',
    body: 'Speed is a feature users feel before they read anything. Budgets are set in milliseconds and enforced in CI.',
    spec: 'P99 / BUDGETED',
  },
  {
    index: '03',
    title: 'Full Ownership',
    body: 'From the socket to the pixel. Owning the whole stack means no black boxes when production breaks at 3 a.m.',
    spec: 'STACK / END-TO-END',
  },
  {
    index: '04',
    title: 'Live Iteration',
    body: 'Ship small, observe real traffic, adjust. Telemetry decides the roadmap, not opinions in a meeting.',
    spec: 'DEPLOY / CONTINUOUS',
  },
];

export const LOG = [
  {
    year: '2026',
    title: 'Independent Software Engineering',
    org: 'SuciTroll Studio',
    body: 'Building autonomous agents, AI routing gateways and performance tooling for a small roster of long-term clients.',
    tags: ['Agents', 'LLM Gateways', 'Consulting'],
  },
  {
    year: '2025',
    title: 'Platform Founder & Engine Architect',
    org: 'Savado / Vortex',
    body: 'Launched a multi-model AI SaaS and rebuilt a private game server engine for thousands of concurrent players.',
    tags: ['SaaS', 'C++', 'Edge Security'],
  },
  {
    year: '2024',
    title: 'Infrastructure Architect',
    org: 'Multi-site Operations',
    body: 'Designed the proxy mesh, provisioning suite and payment hub that now carry traffic for 36 production domains.',
    tags: ['Networking', 'Ledgers', 'DevOps'],
  },
  {
    year: '2023',
    title: 'Automation Systems Lead',
    org: 'Chronos / LuaForge',
    body: 'Turned fragile one-off scripts into supervised, self-healing automation frameworks with real observability.',
    tags: ['Bots', 'State Machines', 'Lua'],
  },
  {
    year: '2022',
    title: 'Multi-Site Payment Systems',
    org: 'Operations Engineering',
    body: 'Integrated multiple gateways, built webhook reconciliation and shipped single-session auth for paid platforms.',
    tags: ['Payments', 'Firebase', 'Webhooks'],
  },
  {
    year: '2021',
    title: 'Amba Tukag — Origin',
    org: 'Self-directed',
    body: 'Started as Amba Tukag: reverse engineering protocols, writing Lua runtimes and hosting first servers on bare VPS.',
    tags: ['Reverse Engineering', 'Linux', 'Lua'],
  },
];

export const CONTACTS = [
  { label: 'Email', value: 'hello@sucitroll.com', href: 'mailto:hello@sucitroll.com' },
  { label: 'GitHub', value: 'github.com/SuciTroll', href: 'https://github.com/SuciTroll' },
  { label: 'Telegram', value: '@SuciTroll', href: 'https://t.me/SuciTroll' },
  { label: 'Discord', value: 'sucitroll', href: null },
  { label: 'Website', value: 'SuciTroll.com', href: 'https://sucitroll.com' },
];

export const TICKER = [
  'UPTIME 99.97%',
  'C++20',
  'P99 3.1MS',
  'TYPESCRIPT',
  'NODES 20,400',
  'LUA 5.4',
  'NGINX',
  'THROUGHPUT 9.4 GBPS',
  'OLLAMA',
  'POSTGRESQL',
  'DOMAINS 36',
  'ENET / UDP',
  'CLOUDFLARE EDGE',
  'PAGES 3.2M',
];
