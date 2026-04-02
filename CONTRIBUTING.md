# Contributing to BlueBubbles SDK

Thank you for contributing! This document covers the most common contribution workflows.

---

## Ways to Contribute

| Type | Description |
|---|---|
| **Add a language** | Add a new SDK for a language not yet supported |
| **Fix the spec** | Correct or improve `openapi.yaml` |
| **Improve tooling** | Improve the generation scripts or CI |
| **Improve docs** | Fix typos, add examples, clarify steps |

---

## Adding a New Language

The fastest way to add a language is:

```bash
# 1. Pick a generator name from https://openapi-generator.tech/docs/generators
# 2. Create a config file
cp config/languages/typescript.yaml config/languages/<your-language>.yaml

# 3. Edit the new file — at minimum update:
#    - generatorName
#    - outputDir
#    - additionalProperties (package name, author, etc.)

# 4. Generate and inspect
./scripts/generate.sh <your-language>

# 5. Commit everything
git add config/languages/<your-language>.yaml sdks/<your-language>/
git commit -m "feat: add <your-language> SDK"
```

See [docs/adding-a-language.md](docs/adding-a-language.md) for a full walkthrough with examples.

---

## Fixing the OpenAPI Spec

`openapi.yaml` is the source of truth. All SDKs are generated from it.

1. Edit `openapi.yaml`.
2. Validate: `npx @openapitools/openapi-generator-cli validate -i openapi.yaml`
3. Regenerate: `./scripts/generate.sh`
4. Commit `openapi.yaml` and all changed `sdks/` directories together.

> Do **not** edit files inside `sdks/` directly. They are overwritten on every generation run.

---

## Pull Request Guidelines

- **One concern per PR.** Keep spec changes, new languages, and tooling changes in separate PRs.
- **Regenerate before opening a PR.** Run `./scripts/generate.sh` so the SDKs in the PR are up to date.
- **Don't edit generated files.** If an SDK looks wrong, fix the spec or the language config.
- **Describe your change.** Explain what you changed and why in the PR description.

---

## Local Setup

### Requirements

One of:
- Node.js 16+ (preferred — `npx` handles the generator automatically)
- Docker
- Java 11+

### Generate all SDKs locally

```bash
./scripts/generate.sh
```

### Validate the spec

```bash
npx @openapitools/openapi-generator-cli validate -i openapi.yaml
```

### List all available generators

```bash
npx @openapitools/openapi-generator-cli list
```

### Show all config options for a generator

```bash
npx @openapitools/openapi-generator-cli config-help -g typescript-fetch
```

---

## Questions?

Open a [GitHub Discussion](../../discussions) or file an [Issue](../../issues).
