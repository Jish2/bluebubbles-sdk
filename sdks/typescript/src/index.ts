import openapiClient from "openapi-fetch";
import type { ClientOptions } from "openapi-fetch";
import type { paths } from "./schema.js";

export type { paths, components, operations } from "./schema.js";
export type { ClientOptions, Middleware, MaybeOptionalInit } from "openapi-fetch";

/**
 * Create a type-safe BlueBubbles API client.
 *
 * @example
 * ```ts
 * import { createClient } from "@jgoon/bluebubbles";
 *
 * const client = createClient({ baseUrl: "http://localhost:1234" });
 *
 * const { data, error } = await client.GET("/api/v1/server/info", {
 *   params: { query: { password: "your-password" } },
 * });
 * ```
 */
export function createClient(options?: ClientOptions) {
  return openapiClient<paths>(options);
}
