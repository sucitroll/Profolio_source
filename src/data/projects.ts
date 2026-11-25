export type Category = 'systems' | 'web' | 'automation' | 'infra';

export const CATEGORY_LABEL: Record<Category, string> = {
  systems: 'Systems & C++',
  web: 'Web & SaaS',
  automation: 'Automation & Bots',
  infra: 'Infra & Tools',
};

export type Blueprint = 'core' | 'mesh' | 'ledger' | 'terminal' | 'wave' | 'radial' | 'stack' | 'grid';

export interface Project {
  id: string;
  index: string;
  title: string;
  category: Category;
  year: string;
  status: 'Live' | 'Production' | 'Maintained' | 'Archived';
  role: string;
  summary: string;
  stack: string[];
  metrics: { label: string; value: string }[];
  architecture: { layer: string; detail: string }[];
  challenges: string[];
  outcome: string;
  blueprint: Blueprint;
}

export const PROJECTS: Project[] = [
  {
    id: 'vortex',
    index: '01',
    title: 'Vortex Core Engine',
    category: 'systems',
    year: '2025',
    status: 'Production',
    role: 'Lead engine architect',
    summary:
      'Custom C++ high-concurrency private server architecture with modified binary asset pipelines and custom physics and event hooks.',
    stack: ['C++20', 'ENet', 'Lua 5.4', 'Linux', 'CMake'],
    metrics: [
      { label: 'Concurrent peers', value: '4,800' },
      { label: 'Tick rate', value: '64 Hz' },
      { label: 'p99 frame budget', value: '3.1 ms' },
      { label: 'Asset formats', value: '11' },
    ],
    architecture: [
      { layer: 'Transport', detail: 'ENet reliable/unreliable channels multiplexed over a single UDP socket per shard, with sequence-window replay protection.' },
      { layer: 'Simulation', detail: 'Fixed-step world loop on a dedicated thread; job system fans spatial-hash collision and AI updates across a lock-free work queue.' },
      { layer: 'Scripting', detail: 'Embedded Lua 5.4 VM per zone exposing sandboxed event hooks (onEnter, onHit, onTick) with instruction-count limits.' },
      { layer: 'Assets', detail: 'Rewritten binary pack reader with mmap streaming, CRC validation and a hot-reload watcher for map and item tables.' },
    ],
    challenges: [
      'Original client protocol had undocumented variable-length fields; reconstructed from captured traffic and fuzzed against the parser.',
      'Lua callbacks stalling the tick under load — solved with per-hook budgets and deferred execution queues.',
      'Memory fragmentation over multi-day uptime, eliminated with arena allocators per world region.',
    ],
    outcome: 'Stable 30-day uptime under peak load with zero desync reports after rollout of authoritative movement validation.',
    blueprint: 'core',
  },
  {
    id: 'savado',
    index: '02',
    title: 'Savado AI Platform',
    category: 'web',
    year: '2025',
    status: 'Live',
    role: 'Founder, full-stack',
    summary:
      'Full-stack AI SaaS platform featuring multi-model API routing, Nginx reverse proxy, Cloudflare edge security and Google OAuth.',
    stack: ['TypeScript', 'Node.js', 'React', 'Nginx', 'Cloudflare'],
    metrics: [
      { label: 'Routed models', value: '14' },
      { label: 'Median TTFB', value: '82 ms' },
      { label: 'Monthly requests', value: '1.9M' },
      { label: 'Uptime (90d)', value: '99.97%' },
    ],
    architecture: [
      { layer: 'Edge', detail: 'Cloudflare WAF rules, bot fight mode and per-route rate limiting in front of an origin locked to Cloudflare IP ranges.' },
      { layer: 'Gateway', detail: 'Node.js router normalises OpenAI, Anthropic, DeepSeek and local endpoints behind one streaming contract with fallback chains.' },
      { layer: 'Auth', detail: 'Google OAuth 2.0 with PKCE, rotating refresh tokens and httpOnly session cookies scoped per subdomain.' },
      { layer: 'Client', detail: 'React SPA with SSE token streaming, optimistic conversation state and a custom design system built from scratch.' },
    ],
    challenges: [
      'Providers emit incompatible streaming formats; built an adapter layer that converts every response into one event schema.',
      'Cost spikes from abusive keys, mitigated with token-bucket quotas stored in Redis and anomaly alerts.',
    ],
    outcome: 'Shipped from zero to paying users in six weeks; provider swaps now take a config change instead of a redeploy.',
    blueprint: 'radial',
  },
  {
    id: 'strata',
    index: '03',
    title: 'Strata Multi-Site PayHub',
    category: 'web',
    year: '2024',
    status: 'Production',
    role: 'Systems architect',
    summary:
      'Centralised payment operations and transaction monitoring engine managing real-time settlement across 36 live web domains.',
    stack: ['Node.js', 'PostgreSQL', 'Redis', 'WebSockets'],
    metrics: [
      { label: 'Live domains', value: '36' },
      { label: 'Daily transactions', value: '41K' },
      { label: 'Reconciliation lag', value: '< 4 s' },
      { label: 'Disputes caught', value: '+38%' },
    ],
    architecture: [
      { layer: 'Ingest', detail: 'Signed webhook receivers per gateway with idempotency keys and replay-safe dedup tables.' },
      { layer: 'Ledger', detail: 'Double-entry PostgreSQL ledger; every balance is derived, never mutated, enabling full point-in-time audits.' },
      { layer: 'Realtime', detail: 'Redis pub/sub fans settlement events to an operator console over authenticated WebSockets.' },
      { layer: 'Risk', detail: 'Rule engine scores velocity, BIN country mismatch and device reuse to route transactions to alternate processors.' },
    ],
    challenges: [
      'Gateways retry webhooks out of order; resolved with monotonic state machines per transaction.',
      'Operators needed one view across 36 brands without leaking data between merchant accounts.',
    ],
    outcome: 'Replaced spreadsheets and five admin panels with one console; month-end close went from two days to under an hour.',
    blueprint: 'ledger',
  },
  {
    id: 'obsidian',
    index: '04',
    title: 'Obsidian CLI Agent',
    category: 'automation',
    year: '2026',
    status: 'Maintained',
    role: 'Author',
    summary:
      'Autonomous terminal coding agent and shell launcher orchestrating local and cloud LLM endpoints with direct AST and file patching.',
    stack: ['Python', 'Bash', 'OpenAI API', 'DeepSeek API', 'Ollama'],
    metrics: [
      { label: 'Patch accept rate', value: '87%' },
      { label: 'Cold start', value: '190 ms' },
      { label: 'Model backends', value: '6' },
      { label: 'Tools exposed', value: '23' },
    ],
    architecture: [
      { layer: 'Planner', detail: 'Plan-act-observe loop with a bounded step budget and explicit tool schemas validated before execution.' },
      { layer: 'Patcher', detail: 'Tree-sitter AST locator applies surgical diffs instead of whole-file rewrites, with automatic rollback on test failure.' },
      { layer: 'Router', detail: 'Task classifier sends cheap edits to local Ollama models and escalates reasoning-heavy work to cloud endpoints.' },
      { layer: 'Sandbox', detail: 'Shell commands run under an allowlist with a confirmation gate for destructive operations.' },
    ],
    challenges: [
      'Models hallucinating line numbers; switched to anchor-based patch targets resolved against the AST.',
      'Keeping context windows small on large repos via ranked file retrieval and symbol summaries.',
    ],
    outcome: 'Daily driver for refactors across a dozen repositories; most routine edits never leave the local machine.',
    blueprint: 'terminal',
  },
  {
    id: 'kuroproxy',
    index: '05',
    title: 'KuroProxy Mesh',
    category: 'infra',
    year: '2024',
    status: 'Production',
    role: 'Network engineer',
    summary:
      'High-speed custom TCP/UDP proxy middleware with live packet inspection, connection pooling and automated failover routing.',
    stack: ['C++', 'Go', 'Linux Networking', 'Docker', 'epoll'],
    metrics: [
      { label: 'Throughput', value: '9.4 Gbps' },
      { label: 'Added latency', value: '0.3 ms' },
      { label: 'Failover time', value: '< 900 ms' },
      { label: 'Nodes', value: '18' },
    ],
    architecture: [
      { layer: 'Data plane', detail: 'C++ epoll event loop with zero-copy splice() forwarding and per-core SO_REUSEPORT listeners.' },
      { layer: 'Inspection', detail: 'Pluggable dissectors parse framed binary protocols inline and emit structured events without buffering full streams.' },
      { layer: 'Control plane', detail: 'Go service distributes routing tables, health scores and certificates to every node over gRPC.' },
      { layer: 'Failover', detail: 'Active health probes plus passive error-rate tracking trigger weighted rerouting before clients notice.' },
    ],
    challenges: [
      'UDP sessions have no close signal; implemented adaptive idle timeouts per protocol fingerprint.',
      'Kernel conntrack table exhaustion under bursts, tuned with nf_conntrack limits and stateless bypass rules.',
    ],
    outcome: 'Absorbed a regional upstream outage with zero dropped sessions; became the default ingress for every downstream service.',
    blueprint: 'mesh',
  },
  {
    id: 'pulse',
    index: '06',
    title: 'Pulse Node Telemetry',
    category: 'web',
    year: '2025',
    status: 'Live',
    role: 'Full-stack engineer',
    summary:
      'Real-time fleet observability app streaming live status charts, latency metrics and incident logs for 20,000+ distributed bot nodes.',
    stack: ['JavaScript', 'WebSockets', 'Canvas API', 'FastAPI'],
    metrics: [
      { label: 'Nodes tracked', value: '20,400' },
      { label: 'Events / sec', value: '12K' },
      { label: 'Render cost', value: '2.4 ms' },
      { label: 'MTTD', value: '11 s' },
    ],
    architecture: [
      { layer: 'Collectors', detail: 'Nodes push compact binary heartbeats; FastAPI workers batch them into 250 ms windows.' },
      { layer: 'Aggregation', detail: 'Rolling percentile sketches computed in memory so dashboards never query raw events.' },
      { layer: 'Stream', detail: 'Delta-encoded WebSocket frames — only changed nodes are sent, cutting bandwidth by 94%.' },
      { layer: 'Render', detail: 'Custom Canvas 2D chart engine draws 20K-cell heatmaps and sparkline grids at a locked 60 fps.' },
    ],
    challenges: [
      'SVG and DOM charting libraries collapsed above 2K series; rewrote the renderer against raw Canvas with dirty-rect redraws.',
      'Alert storms during network partitions, solved with correlated incident grouping.',
    ],
    outcome: 'Operators spot failing clusters in seconds instead of minutes; the dashboard runs comfortably on a mid-range laptop.',
    blueprint: 'wave',
  },
  {
    id: 'nyx',
    index: '07',
    title: 'Nyx Corpus Crawler',
    category: 'automation',
    year: '2025',
    status: 'Archived',
    role: 'Data pipeline engineer',
    summary:
      'Distributed high-throughput scraping pipeline built to extract, clean and index 3.2M+ structured web pages for AI training datasets.',
    stack: ['Python', 'Asyncio', 'Playwright', 'SQLite', 'PostgreSQL'],
    metrics: [
      { label: 'Pages indexed', value: '3.2M' },
      { label: 'Peak rate', value: '410 / s' },
      { label: 'Dedup ratio', value: '22%' },
      { label: 'Clean yield', value: '91%' },
    ],
    architecture: [
      { layer: 'Frontier', detail: 'Priority queue with per-host politeness budgets and robots.txt caching.' },
      { layer: 'Fetch', detail: 'Asyncio HTTP workers for static pages; a Playwright pool only for routes that require JavaScript rendering.' },
      { layer: 'Extract', detail: 'Boilerplate stripping, language detection and MinHash near-duplicate removal before storage.' },
      { layer: 'Store', detail: 'Per-worker SQLite shards merged nightly into PostgreSQL with full-text and metadata indexes.' },
    ],
    challenges: [
      'Headless browsers consumed most of the budget; a classifier now predicts which URLs truly need rendering.',
      'Encoding chaos across legacy sites, normalised with charset sniffing and strict UTF-8 validation.',
    ],
    outcome: 'Delivered a clean, deduplicated corpus on schedule at a fraction of the projected compute cost.',
    blueprint: 'grid',
  },
  {
    id: 'phantom',
    index: '08',
    title: 'Phantom Performance HUD',
    category: 'systems',
    year: '2024',
    status: 'Maintained',
    role: 'Tooling engineer',
    summary:
      'Cross-compiled C++ ImGui overlay and Android native frame-rate profiler tracking live 120 fps telemetry with near-zero overhead.',
    stack: ['C++', 'ImGui', 'Java', 'GitHub Actions', 'MinGW'],
    metrics: [
      { label: 'Overhead', value: '< 0.4%' },
      { label: 'Sample rate', value: '120 Hz' },
      { label: 'Targets', value: 'Win / Android' },
      { label: 'Binary size', value: '612 KB' },
    ],
    architecture: [
      { layer: 'Capture', detail: 'Present-call timing on Windows and Choreographer frame callbacks on Android feed a shared ring buffer.' },
      { layer: 'Overlay', detail: 'ImGui HUD renders frametime graphs, 1% lows and thermal state with a single draw call per frame.' },
      { layer: 'Bridge', detail: 'Thin JNI layer exposes native metrics to a Java control panel for toggles and session export.' },
      { layer: 'Build', detail: 'GitHub Actions matrix cross-compiles MinGW and NDK targets and publishes signed artifacts per tag.' },
    ],
    challenges: [
      'Profiler skewing the numbers it measured; moved all aggregation off the render thread.',
      'Divergent toolchains, unified behind one CMake preset file shared by CI and local builds.',
    ],
    outcome: 'Used to validate 120 fps targets on twelve device models before release.',
    blueprint: 'stack',
  },
  {
    id: 'chronos',
    index: '09',
    title: 'Chronos Bot Framework',
    category: 'automation',
    year: '2023',
    status: 'Production',
    role: 'Author',
    summary:
      'Resilient multi-account Telegram automation daemon built on Telethon, task queues and automated self-healing recovery.',
    stack: ['Python', 'Telethon', 'Redis', 'Systemd'],
    metrics: [
      { label: 'Accounts managed', value: '240' },
      { label: 'Jobs / day', value: '95K' },
      { label: 'Auto-recoveries', value: '99.2%' },
      { label: 'Uptime', value: '410 days' },
    ],
    architecture: [
      { layer: 'Sessions', detail: 'Encrypted session vault with per-account proxy binding and flood-wait aware schedulers.' },
      { layer: 'Queue', detail: 'Redis streams with consumer groups; jobs are idempotent and resumable after crashes.' },
      { layer: 'Supervisor', detail: 'Health watchdog restarts stuck workers, rotates proxies and quarantines restricted accounts.' },
      { layer: 'Ops', detail: 'Systemd units with resource limits, journald structured logs and a Telegram control bot.' },
    ],
    challenges: [
      'Rate-limit penalties compounding across accounts; built a shared token budget per data centre.',
      'Silent session revocations, now detected by canary calls before every job batch.',
    ],
    outcome: 'Runs unattended for months; manual intervention dropped to a handful of times per quarter.',
    blueprint: 'radial',
  },
  {
    id: 'luaforge',
    index: '10',
    title: 'LuaForge State Engine',
    category: 'systems',
    year: '2023',
    status: 'Maintained',
    role: 'Runtime engineer',
    summary:
      'Event-driven Lua automation runtime with real-time console pattern hooks, smart pathfinding optimisation and anti-collision guards.',
    stack: ['Lua', 'C++ Bindings', 'Custom FSM', 'A*'],
    metrics: [
      { label: 'Hook latency', value: '0.2 ms' },
      { label: 'States defined', value: '140+' },
      { label: 'Path solve', value: '1.8 ms' },
      { label: 'Script reload', value: 'Hot' },
    ],
    architecture: [
      { layer: 'Runtime', detail: 'LuaJIT-compatible VM embedded through C++ bindings with typed userdata for world entities.' },
      { layer: 'Hooks', detail: 'Compiled pattern matchers attach callbacks to console output lines with priority ordering.' },
      { layer: 'FSM', detail: 'Hierarchical state machine with guarded transitions, timeouts and explicit recovery states.' },
      { layer: 'Navigation', detail: 'Jump-point search over a cached grid plus a reservation table to prevent agent collisions.' },
    ],
    challenges: [
      'Scripts racing each other on shared state; introduced single-owner state slots and message passing.',
      'Pathfinding spikes on large maps, flattened by precomputed region graphs.',
    ],
    outcome: 'Turned a tangle of one-off scripts into a reusable runtime others now build on.',
    blueprint: 'core',
  },
  {
    id: 'ziwol',
    index: '11',
    title: 'Ziwol Cloud Stack',
    category: 'infra',
    year: '2024',
    status: 'Production',
    role: 'Infrastructure lead',
    summary:
      'Self-hosted provisioning suite automating Ubuntu VPS hardening, PM2 process clustering, SSL renewal and encrypted Telegram backups.',
    stack: ['Bash', 'Docker', 'Nginx', 'PM2', 'Linux'],
    metrics: [
      { label: 'Servers provisioned', value: '63' },
      { label: 'Provision time', value: '4 min' },
      { label: 'Backup cadence', value: '6 h' },
      { label: 'Cert failures', value: '0' },
    ],
    architecture: [
      { layer: 'Bootstrap', detail: 'Idempotent Bash playbooks: SSH key-only login, UFW, fail2ban, unattended upgrades and swap tuning.' },
      { layer: 'Runtime', detail: 'PM2 cluster mode or Docker Compose per app, behind templated Nginx virtual hosts.' },
      { layer: 'TLS', detail: 'Certbot DNS-01 challenges via Cloudflare API with renewal hooks that reload Nginx gracefully.' },
      { layer: 'Backups', detail: 'age-encrypted database and volume snapshots shipped to a private Telegram channel with retention pruning.' },
    ],
    challenges: [
      'Scripts drifting from real server state; every step now checks before it changes anything.',
      'Restores were untested; a weekly job rebuilds a scratch server from the latest backup.',
    ],
    outcome: 'New production servers go from blank to serving traffic in minutes with identical security baselines.',
    blueprint: 'stack',
  },
  {
    id: 'monolith',
    index: '12',
    title: 'Monolith Session Auth',
    category: 'web',
    year: '2022',
    status: 'Archived',
    role: 'Full-stack engineer',
    summary:
      'Firebase and edge-backed real-time web architecture enforcing strict single-session anti-collision authentication.',
    stack: ['JavaScript', 'Firebase', 'Edge Workers', 'CSS'],
    metrics: [
      { label: 'Session takeover', value: '< 700 ms' },
      { label: 'Shared logins blocked', value: '12K' },
      { label: 'Edge regions', value: '300+' },
      { label: 'Bundle', value: '38 KB' },
    ],
    architecture: [
      { layer: 'Identity', detail: 'Firebase Auth issues tokens; a custom claim carries the active session fingerprint.' },
      { layer: 'Presence', detail: 'Realtime Database presence node per user; a new login atomically evicts the previous session.' },
      { layer: 'Edge', detail: 'Edge workers verify token and fingerprint before serving protected assets, closing direct-URL leaks.' },
      { layer: 'Client', detail: 'Dependency-free UI with a hand-written CSS system and graceful forced-logout messaging.' },
    ],
    challenges: [
      'Race between two simultaneous logins; resolved with a server-timestamped transaction as the single source of truth.',
      'Offline tabs reviving stale sessions, handled by revalidating on visibility change.',
    ],
    outcome: 'Credential sharing on the paid tier effectively disappeared within the first billing cycle.',
    blueprint: 'ledger',
  },
];
