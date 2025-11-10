# Repository Guidelines

## Project Structure & Module Organization
Source lives under `src`, with UI shells in `App.tsx` and routing in `src/routes`. Feature folders (for example `src/modules/timer`, `src/modules/walle`) co-locate context, hooks, and services. Shared UI sits in `src/components` and layout primitives in `src/layouts`. Styles come from `src/styles` and global CSS (`src/App.css`, `src/index.css`), while audio cues reside in `src/audio`. Public assets (favicons, static images) belong in `public`; keep build artifacts out of version control.

## Build, Test, and Development Commands
Use `pnpm install` once per machine. `pnpm dev` runs the Vite dev server with fast refresh. `pnpm build` performs a TypeScript project build plus `vite build`; run this before tagging releases. `pnpm preview` serves the production bundle locally. `pnpm lint` applies the ESLint config in `eslint.config.js`; address its findings before pushing.

## Coding Style & Naming Conventions
Write React components in TypeScript with functional components and hooks. Favor 2-space indentation (see `src/App.tsx`). Export reusable pieces from index files inside each module to keep imports shallow. Name components in PascalCase, hooks in camelCase prefixed with `use`, and context providers with the `Provider` suffix. Keep side effects inside `React.useEffect` and place constants in `src/utils` or module-level `constants.ts`. Run `pnpm lint --fix` for formatting adjustments.

## Testing Guidelines
No automated test runner ships with the repo yet, so add targeted tests (React Testing Library or Vitest) next to the modules they cover, e.g., `src/modules/timer/__tests__/Timers.provider.test.tsx`. Until a suite exists, perform a manual smoke pass: start `pnpm dev`, exercise timer creation, Walle workflows, audio playback, and GA opt-out query params. Document any testing gaps in the PR description.

## Commit & Pull Request Guidelines
Recent history mixes version tags (`v1.0.10`) with conventional prefixes such as `feat:` and `doc:`. Follow that style: `<type>: <summary>` in the imperative mood, and cut release commits as `vX.Y.Z`. For pull requests, include: a short summary, linked issue or tracking ticket, screenshots/GIFs for UI updates, a rundown of tests performed, and any new configuration steps (e.g., GA keys created via `node create-ga-config.cjs`).

## Security & Configuration Tips
GA4 and Walle data are created from scripts (`create-ga-config.cjs`, `create-walle.cjs`). Store secrets outside the repo and reference them through local `.env` files or secure CI variables. Clear cached audio objects by calling `UtilAudio.cleanupAudio()` when unmounting long-lived components to avoid leaking resources.
