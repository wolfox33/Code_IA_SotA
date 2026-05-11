# code-ia-sota

Agent scaffold installer for `AGENTS.md` and `.agents`.

## Usage

```sh
npx code-ia-sota
```

Installs the canonical `AGENTS.md` and `.agents/` scaffold into the current directory.

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
npx ./code-ia-sota-0.1.0.tgz
```
