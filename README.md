# BlueBubbles SDK

The official home of client SDKs for the [BlueBubbles Server API](https://bluebubbles.app).

Each SDK in `sdks/` provides a fully-typed, idiomatic client for interacting with a BlueBubbles server. The `openapi.yaml` spec (derived from the [official BlueBubbles Postman collection](https://documenter.getpostman.com/view/765844/UV5RnfwM)) serves as the source of truth, and each language uses the best available generation tool for that ecosystem.

---

## Supported Languages

| Language | Package | Directory | Status |
|---|---|---|---|
| TypeScript | [`@bluebubbles/sdk`](https://www.npmjs.com/package/@bluebubbles/sdk) | [`sdks/typescript`](sdks/typescript) | Active |

---

## TypeScript SDK

A type-safe client powered by [openapi-typescript](https://openapi-ts.dev) + [openapi-fetch](https://openapi-ts.dev/openapi-fetch). Zero manual typing — types are generated directly from the OpenAPI spec.

### Install

```bash
npm install @bluebubbles/sdk
```

### Usage

```ts
import { createClient } from "@bluebubbles/sdk";

const client = createClient({ baseUrl: "http://localhost:1234" });

// Every path, parameter, and response is fully typed
const { data, error } = await client.GET("/api/v1/server/info", {
  params: { query: { password: "your-password" } },
});

// Send a message
await client.POST("/api/v1/message/text", {
  params: { query: { password: "your-password" } },
  body: {
    chatGuid: "iMessage;-;+11234567890",
    message: "Hello from the SDK!",
  },
});
```

### Type-only import

If you prefer to use `openapi-fetch` directly (or another HTTP client), you can import just the types:

```ts
import createClient from "openapi-fetch";
import type { paths } from "@bluebubbles/sdk";

const client = createClient<paths>({ baseUrl: "http://localhost:1234" });
```

---

## Repository Structure

```
bluebubbles-sdk/
├── openapi.yaml              # BlueBubbles OpenAPI 3.0 spec (source of truth)
├── scripts/
│   └── generate.sh           # Regenerate one or all SDKs from the spec
└── sdks/
    └── typescript/            # TypeScript SDK (openapi-typescript + openapi-fetch)
        ├── package.json
        ├── tsconfig.json
        └── src/
            ├── index.ts       # Client factory + type re-exports
            └── schema.d.ts    # Generated types from openapi.yaml
```

---

## Regenerating

```bash
# All SDKs
./scripts/generate.sh

# TypeScript only
./scripts/generate.sh typescript
```

---

## Updating the OpenAPI Spec

The spec lives in `openapi.yaml` and was originally generated from the [BlueBubbles Postman collection](https://documenter.getpostman.com/view/765844/UV5RnfwM). If the BlueBubbles Server API changes:

1. Edit `openapi.yaml`.
2. Run `./scripts/generate.sh` to regenerate all SDKs.
3. Commit `openapi.yaml` and the updated `sdks/` directories.

---

## Contributing

Pull requests are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) before submitting changes.

---

## License

[MIT](LICENSE)
