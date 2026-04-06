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

## Webhooks

Types and runtime guards for BlueBubbles webhook payloads are included. Import from the main entry or the `/webhooks` subpath:

```ts
import {
  BlueBubblesWebhookPayload,
  isBlueBubblesWebhookPayload,
} from "@jgoon/bluebubbles";

// or, for a targeted import:
import {
  BlueBubblesWebhookPayload,
  isBlueBubblesWebhookPayload,
} from "@jgoon/bluebubbles/webhooks";
```

The payload is a discriminated union — switch on `payload.type` and TypeScript narrows `payload.data` automatically:

```ts
function handleWebhook(raw: unknown) {
  if (!isBlueBubblesWebhookPayload(raw)) return;

  switch (raw.type) {
    case "new-message":
      console.log(raw.data.guid, raw.data.text);
      break;
    case "typing-indicator":
      console.log(raw.data.guid, raw.data.display);
      break;
  }
}
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

