export interface Capability {
  index: string;
  title: string;
  lead: string;
  scope: string[];
  deliverables: string[];
  method: string;
}

export const CAPABILITIES: Capability[] = [
  {
    index: '01',
    title: 'Full-Stack Web Architecture',
    lead: 'High-craft SPAs, SSR platforms, custom design systems, multi-tenant dashboards, OAuth2 and edge auth.',
    scope: ['React / Next.js SPAs and SSR', 'Design systems from tokens up', 'Multi-tenant admin consoles', 'OAuth2, PKCE, edge sessions'],
    deliverables: ['Production web app', 'Component library', 'Auth and role model', 'Deployment pipeline'],
    method: 'Data model first, interface second. Every screen maps to one job, every request is measured.',
  },
  {
    index: '02',
    title: 'High-Concurrency Systems & C++',
    lead: 'Custom game servers, binary packet parsers, TCP/UDP socket engines, multi-threaded memory-safe runtimes.',
    scope: ['Authoritative game servers', 'Binary protocol parsers', 'epoll / io_uring socket engines', 'Lock-free job systems'],
    deliverables: ['Server binary + CMake build', 'Protocol specification', 'Load-test harness', 'Profiling report'],
    method: 'Measure the hot path, own the allocator, fuzz every parser before it sees real traffic.',
  },
  {
    index: '03',
    title: 'Autonomous Bots & Workflow Automation',
    lead: '24/7 headless scrapers, Telegram and Discord bot ecosystems, state-machine scripting, anti-detection pipelines.',
    scope: ['Headless browser fleets', 'Telegram / Discord bots', 'State-machine workflows', 'Proxy and fingerprint rotation'],
    deliverables: ['Supervised daemon', 'Job queue + retries', 'Control bot / dashboard', 'Runbook'],
    method: 'Assume every run will crash. Design for idempotent jobs, resumable state and self-healing.',
  },
  {
    index: '04',
    title: 'Linux Infrastructure & DevOps',
    lead: 'Bare-metal and Ubuntu VPS orchestration, Nginx reverse proxies, Docker, Cloudflare tunnels, zero-downtime CI/CD.',
    scope: ['VPS hardening and provisioning', 'Nginx / Caddy reverse proxies', 'Docker Compose stacks', 'Cloudflare DNS, Tunnels, WAF'],
    deliverables: ['Provisioning scripts', 'CI/CD workflows', 'Backup and restore plan', 'Monitoring and alerts'],
    method: 'Servers are cattle. Everything reproducible from a script, every backup proven by a restore.',
  },
  {
    index: '05',
    title: 'Low-Level Tooling & Reverse Engineering',
    lead: 'Binary format inspection, custom Lua scripting runtimes, cross-compiled C++ ImGui HUDs, protocol analysis.',
    scope: ['File format reconstruction', 'Network protocol analysis', 'Embedded Lua runtimes', 'ImGui overlays and HUDs'],
    deliverables: ['Format / protocol docs', 'Parser and tooling', 'Cross-platform builds', 'Test corpora'],
    method: 'Capture, hypothesise, verify. Document every byte so the next person never has to guess.',
  },
  {
    index: '06',
    title: 'AI Agent & LLM Orchestration',
    lead: 'Local Ollama inference pipelines, autonomous CLI coding agents, multi-model routing gateways, RAG datasets.',
    scope: ['Local inference with Ollama', 'Multi-provider routing', 'Tool-using agents', 'Retrieval pipelines and corpora'],
    deliverables: ['Agent runtime', 'Model gateway', 'Evaluation set', 'Cost and latency dashboard'],
    method: 'Cheapest model that passes the eval wins. Every tool call is typed, logged and reversible.',
  },
  {
    index: '07',
    title: 'Payment & Multi-Site Operations',
    lead: 'High-volume multi-domain transaction hubs, webhook reconciliation, real-time ledger auditing, anti-fraud routing.',
    scope: ['Multi-gateway integration', 'Webhook reconciliation', 'Double-entry ledgers', 'Risk scoring and routing'],
    deliverables: ['Operations console', 'Ledger schema', 'Reconciliation jobs', 'Audit exports'],
    method: 'Money is append-only. Balances are derived, events are idempotent, every cent is traceable.',
  },
  {
    index: '08',
    title: 'Performance Engineering & Interface Craft',
    lead: '120 fps motion engineering, sub-100 ms API optimisation, bundle reduction, custom Canvas and WebGL visuals.',
    scope: ['Motion systems on transform / opacity', 'API and query profiling', 'Bundle and asset budgets', 'Canvas / WebGL rendering'],
    deliverables: ['Performance audit', 'Optimised build', 'Motion spec', 'Regression budgets in CI'],
    method: 'Set a budget, measure against it, ship nothing that breaks it.',
  },
];
