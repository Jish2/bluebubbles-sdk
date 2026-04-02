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

Each language SDK lives in `sdks/<language>/` and uses the best generation tool for that ecosystem. There is no requirement to use the same generator across languages.

1. Create the SDK directory: `sdks/<your-language>/`
2. Set up the generation tooling (e.g. install a code generator, write a config).
3. Add a `generate_<language>` function to `scripts/generate.sh` and add the language to `ALL_LANGUAGES`.
4. Run `./scripts/generate.sh <your-language>` to test locally.
5. Open a PR.

---

## Fixing the OpenAPI Spec

`openapi.yaml` is the source of truth. All SDKs are generated from it.

1. Edit `openapi.yaml`.
2. Regenerate: `./scripts/generate.sh`
3. Commit `openapi.yaml` and all changed `sdks/` directories together.

> Do **not** edit generated files inside `sdks/` directly (e.g. `schema.d.ts`). They are overwritten on every generation run.

---

## Pull Request Guidelines

- **One concern per PR.** Keep spec changes, new languages, and tooling changes in separate PRs.
- **Regenerate before opening a PR.** Run `./scripts/generate.sh` so the SDKs in the PR are up to date.
- **Don't edit generated files.** If an SDK looks wrong, fix the spec or the generation config.
- **Describe your change.** Explain what you changed and why in the PR description.

---

## Local Setup

### Requirements

- Node.js 18+ (for the TypeScript SDK)

### Generate all SDKs locally

```bash
./scripts/generate.sh
```

### Generate a single language

```bash
./scripts/generate.sh typescript
```

---

## Questions?

Open a [GitHub Discussion](../../discussions) or file an [Issue](../../issues).
