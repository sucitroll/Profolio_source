# Project memory

## Product intent & audience

- Personal portfolio website for systems engineer "SuciTroll".
- Showcases interactive project archives and granular technical capabilities.
- Audience: recruiters, collaborators, technical peers evaluating engineering depth.

## Brand personality & voice

- Swiss-editorial, high-craft, architectural.
- Restrained, precise, systems-minded tone rather than flashy or marketing-heavy.

## Visual design & UX direction

- Dual light and dark themes.
- Swiss-editorial layout: strong typographic hierarchy, generous whitespace, grid discipline.
- Single-page structure with section anchors: Contact, Capabilities, and others.
- Fold-out / slide-out menu used on narrower screens, including the preview panel.
- Smooth-scroll to anchored sections when menu links are clicked.
- Prefer Tailwind utility classes, React hooks, and `lucide-react` icons.
- Import project modules via `@/` path alias (`@/` → `src/`).

## Decisions, constraints & rationale

- Framework: Vite + React (JSX) with Tailwind CSS; no extra UI/icon packages unless explicitly requested.
- Mobile menu bug fixed: when the fold-out menu was open, body/page scrolling was locked, and the smooth-scroll to the target section was being ignored before scrolling re-enabled. Fix order: re-enable scrolling first, then trigger scroll-to-section, and close the menu on link click.
- Menu links should always close the menu and navigate to the target section on both narrow and wide screens.

## Open questions & assumptions

- Assumes sections (Contact, Capabilities, etc.) have stable `id` anchors matching menu link targets.
- Not browser-tested in-session; user should verify menu navigation in preview.
- Full section list and exact anchor IDs not yet confirmed beyond Contact and Capabilities.