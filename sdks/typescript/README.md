# TypeScript SDK

The TypeScript SDK for BlueBubbles is a type-safe client powered by [openapi-typescript](https://openapi-ts.dev) and [openapi-fetch](https://openapi-ts.dev/openapi-fetch). Types are generated directly from the OpenAPI spec.

## Install

```bash
npm install @jgoon/bluebubbles
```

## Usage

```ts
import { createClient } from "@jgoon/bluebubbles";

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

## Type-only import

If you prefer to use `openapi-fetch` directly (or another HTTP client), you can import just the generated types:

```ts
import createClient from "openapi-fetch";
import type { paths } from "@jgoon/bluebubbles";

const client = createClient<paths>({ baseUrl: "http://localhost:1234" });
```

## Development

From `sdks/typescript/`:

```bash
npm ci
npm run generate
npm run build
```

