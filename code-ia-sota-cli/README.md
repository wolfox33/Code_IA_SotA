# code-ia-sota

Agent scaffold installer for `AGENTS.md` and `.agents`.

## Usage

```sh
npx code-ia-sota
```

Installs the canonical `AGENTS.md` and `.agents/` scaffold into the current directory.

This installer is intentionally a personal bootstrap. It clones the current scaffold state from the GitHub repository at install time instead of pinning a packaged template snapshot.

When run in a terminal, the installer also offers a tool selector inspired by OpenSpec so you can generate lightweight integrations for supported CLIs/IDEs on top of that base scaffold.

Supported tool ids:

- `codex`
- `claude`
- `cursor`
- `windsurf`

Non-interactive examples:

```sh
# Base scaffold only
npx code-ia-sota --tools none

# Install base scaffold plus Claude + Cursor shims
npx code-ia-sota --tools claude,cursor

# Install every supported integration
npx code-ia-sota --tools all

# List supported tool ids
npx code-ia-sota --list-tools
```

Generated integrations:

- `claude` -> `CLAUDE.md`
- `cursor` -> `.cursor/rules/code-ia-sota.mdc`
- `windsurf` -> `.windsurf/rules/code-ia-sota.md`
- `codex` -> no extra file; uses the root scaffold directly

## Harness validation

```sh
npm run validate:harness
```

Validates `.agents/skills/*/SKILL.md` and `.agents/workflows/*.md`.
The local npm script validates the repository root from the CLI package directory.

You can also run:

```sh
code-ia-sota validate [path]
```

## Local development

```sh
npm install
npm link
code-ia-sota
```

## Package test

```sh
npm pack
npx ./code-ia-sota-0.1.1.tgz
```

## GitHub Actions publish

The repository workflow `.github/workflows/publish-cli.yml` publishes the package from `code-ia-sota-cli/` on pushes to `main` that change the CLI files, or by manual dispatch.

Required secret:

- `NPM_TOKEN` with publish permission for the `code-ia-sota` package on npm
