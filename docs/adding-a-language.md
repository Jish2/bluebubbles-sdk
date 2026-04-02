# Adding a New Language SDK

This guide walks you through adding a new language to the BlueBubbles SDK repository.

---

## Step 1 — Find Your Generator

OpenAPI Generator supports 50+ client generators. Browse the full list:

```
https://openapi-generator.tech/docs/generators
```

Look under **Client Generators**. Note the exact generator name (e.g. `typescript-fetch`, `go`, `ruby`, `java`).

To explore available options for any generator:

```bash
npx @openapitools/openapi-generator-cli config-help -g <generatorName>
```

Example:

```bash
npx @openapitools/openapi-generator-cli config-help -g go
```

---

## Step 2 — Create a Config File

Config files live in `config/languages/`. The filename (without `.yaml`) is the name you'll use with the script.

Copy an existing config as a starting point:

```bash
cp config/languages/typescript.yaml config/languages/<your-language>.yaml
```

Then edit it. The minimum required fields are:

```yaml
generatorName: <generator-name-from-step-1>
inputSpec: ../../openapi.yaml
outputDir: ../../sdks/<your-language>
```

> The `inputSpec` and `outputDir` paths are relative to the config file itself (i.e. `config/languages/`), so `../../` points to the repo root.

### Common `additionalProperties`

Each generator has its own set of properties. Run `config-help` (Step 1) to see all options.
Typical ones:

| Generator | Key properties |
|---|---|
| `typescript-fetch` | `npmName`, `npmVersion`, `supportsES6` |
| `python` | `packageName`, `projectName`, `packageVersion` |
| `dart-dio` | `pubName`, `pubVersion`, `nullSafe` |
| `kotlin` | `groupId`, `artifactId`, `packageName`, `library` |
| `swift5` | `projectName`, `podVersion`, `library` |
| `go` | `packageName`, `packageVersion`, `isGoSubmodule` |
| `java` | `groupId`, `artifactId`, `artifactVersion`, `library` |
| `ruby` | `gemName`, `gemVersion`, `moduleName` |
| `rust` | `packageName`, `packageVersion` |
| `csharp` | `packageName`, `packageVersion`, `targetFramework` |

---

## Step 3 — Generate Locally

Run the script to generate your SDK:

```bash
./scripts/generate.sh <your-language>
```

The generated output will appear in `sdks/<your-language>/`.

Inspect it to make sure the output looks reasonable. Pay attention to:
- Model class names
- API method names
- Whether `null`/optional fields are handled correctly

---

## Step 4 — Suppress Files You Don't Want (Optional)

If there are generated files you want to exclude (e.g. test scaffolding, CI configs bundled by the generator), create a `.openapi-generator-ignore` file inside the output directory.

The syntax is identical to `.gitignore`:

```
# sdks/<your-language>/.openapi-generator-ignore
.travis.yml
tox.ini
test/
```

After adding this file, re-run generation — the ignored files won't be overwritten.

---

## Step 5 — Commit and Open a PR

```bash
git add config/languages/<your-language>.yaml sdks/<your-language>/
git commit -m "feat: add <your-language> SDK"
git push origin your-branch
```

Then open a pull request. The CI will:
1. Validate `openapi.yaml`.
2. Dry-run generate all language configs (including yours) to catch config errors.

---

## Tips & Troubleshooting

### The generator produces empty models
The spec may be using `anyOf`/`oneOf` in ways the generator doesn't support. Try a different generator variant (e.g. `python-pydantic-v1` instead of `python`) or simplify the spec.

### Method names are ugly
Use `additionalProperties.modelNamePrefix` or `additionalProperties.apiNameSuffix` to customize naming.

### I want to pin a specific generator version
Update `openapitools.json`:
```json
{
  "generator-cli": {
    "version": "7.4.0"
  }
}
```

### Running with Docker instead of Node
```bash
docker run --rm \
  -v "$(pwd):/workspace" \
  openapitools/openapi-generator-cli generate \
  -c /workspace/config/languages/<your-language>.yaml \
  --skip-validate-spec
```

### List all available generators
```bash
npx @openapitools/openapi-generator-cli list
```
