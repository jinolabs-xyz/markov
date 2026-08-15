# packages/

Shared TypeScript libraries consumed across apps and Node services. Each package
is scoped under `@sextant/*`.

Planned:

- **`@sextant/types`** — shared domain types (instruments, levels, positioning).
- **`@sextant/sdk`** — typed client for Sextant services (incl. an MCP server so
  external agents can query a trader's own levels, rules, and history).
- **`@sextant/ui`** — shared React components and charting primitives.
- **`@sextant/config`** — shared eslint / tsconfig / prettier presets.

> Add a package by creating a folder here with its own `package.json`.
