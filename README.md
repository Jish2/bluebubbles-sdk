# BlueBubbles SDK

The official home of client SDKs for the [BlueBubbles Server API](https://bluebubbles.app).

Each SDK in `sdks/` provides a fully-typed, idiomatic client for interacting with a BlueBubbles server from your language of choice. The `openapi.yaml` spec (derived from the [official BlueBubbles Postman collection](https://documenter.getpostman.com/view/765844/UV5RnfwM)) serves as the source of truth and drives SDK generation via [OpenAPI Generator](https://openapi-generator.tech).

---

## Supported Languages

| Language | Package | Directory | Registry |
|---|---|---|---|
| TypeScript (fetch) | `@bluebubbles/sdk` | [`sdks/typescript`](sdks/typescript) | npm |
| ~~Python~~ | ~~`bluebubbles-sdk`~~ | ~~[`sdks/python`](sdks/python)~~ | ~~PyPI~~ |
| ~~Dart (dio)~~ | ~~`bluebubbles_sdk`~~ | ~~[`sdks/dart`](sdks/dart)~~ | ~~pub.dev~~ |
| ~~Kotlin~~ | ~~`com.bluebubbles:sdk`~~ | ~~[`sdks/kotlin`](sdks/kotlin)~~ | ~~Maven Central~~ |
| ~~Swift 5~~ | ~~`BlueBubblesSDK`~~ | ~~[`sdks/swift`](sdks/swift)~~ | ~~SwiftPM / CocoaPods~~ |

Want a language that isn't listed? See [Adding a New Language](#adding-a-new-language).

---

## Quick Start

### Prerequisites

One of:
- **Node.js 16+** — uses `npx @openapitools/openapi-generator-cli` (recommended, no Java required)
- **Docker** — uses the official generator image
- **Java 11+** — uses the generator JAR directly

### Generate All SDKs

```bash
./scripts/generate.sh
```

### Generate a Specific Language

```bash
./scripts/generate.sh typescript
./scripts/generate.sh python
./scripts/generate.sh dart
./scripts/generate.sh kotlin
./scripts/generate.sh swift
```

The generator name matches the filename under `config/languages/` (without `.yaml`).

---

## Repository Structure

```
bluebubbles-sdk/
├── openapi.yaml              # BlueBubbles OpenAPI 3.0 spec (source of truth)
├── openapitools.json         # Pins the openapi-generator-cli version
├── scripts/
│   └── generate.sh           # Regenerate one or all SDKs from the spec
├── config/
│   └── languages/
│       ├── typescript.yaml   # Generator config for TypeScript
│       ├── python.yaml       # Generator config for Python
│       ├── dart.yaml         # Generator config for Dart
│       ├── kotlin.yaml       # Generator config for Kotlin
│       └── swift.yaml        # Generator config for Swift 5
├── sdks/
│   ├── typescript/           # TypeScript SDK
│   ├── python/               # Python SDK
│   ├── dart/                 # Dart SDK
│   ├── kotlin/               # Kotlin SDK
│   └── swift/                # Swift SDK
├── docs/
│   └── adding-a-language.md  # How to add a new language
└── .github/
    └── workflows/
        ├── generate.yml      # Regenerate SDKs when openapi.yaml changes
        └── validate.yml      # Validate the OpenAPI spec on every PR
```

> **Note:** The SDKs in `sdks/` are generated from `openapi.yaml`. To fix an SDK issue, update `openapi.yaml` or the language config in `config/languages/`, then run `./scripts/generate.sh`.

---

## Adding a New Language

1. Pick a generator name from the [full generators list](https://openapi-generator.tech/docs/generators).
2. Create a config file at `config/languages/<name>.yaml` (copy an existing one as a template).
3. Run `./scripts/generate.sh <name>` to test locally.
4. Open a PR — the CI will validate and regenerate the SDK automatically.

See [docs/adding-a-language.md](docs/adding-a-language.md) for a detailed walkthrough.

---

## Updating the OpenAPI Spec

The spec lives in `openapi.yaml` and was originally generated from the [BlueBubbles Postman collection](https://documenter.getpostman.com/view/765844/UV5RnfwM). If the BlueBubbles Server API changes:

1. Export the updated Postman collection and re-convert it to OpenAPI 3, **or** edit `openapi.yaml` directly.
2. Run `./scripts/generate.sh` to regenerate all SDKs.
3. Commit both `openapi.yaml` and the updated `sdks/` directories.
4. Bump the version in `openapitools.json` if you want to pick up a newer generator.

---

## Development

```bash
# Install the CLI tool globally (optional, script uses npx by default)
npm install -g @openapitools/openapi-generator-cli

# List all available generators
npx @openapitools/openapi-generator-cli list

# Validate the spec
npx @openapitools/openapi-generator-cli validate -i openapi.yaml
```

---

## Contributing

Pull requests are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting changes.

---

## License

[MIT](LICENSE)
