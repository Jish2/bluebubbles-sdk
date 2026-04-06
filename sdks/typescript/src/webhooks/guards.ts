import {
    BLUEBUBBLES_WEBHOOK_EVENT_TYPES,
    BlueBubblesWebhookEventType,
    BlueBubblesWebhookPayload
} from "./types.js";

export const isBlueBubblesWebhookEventType = (value: unknown): value is BlueBubblesWebhookEventType => {
    return (
        typeof value === "string"
        && (BLUEBUBBLES_WEBHOOK_EVENT_TYPES as readonly string[]).includes(value)
    );
};

export const isBlueBubblesWebhookPayload = (value: unknown): value is BlueBubblesWebhookPayload => {
    if (!value || typeof value !== "object") return false;
    const candidate = value as Record<string, unknown>;
    return isBlueBubblesWebhookEventType(candidate["type"]) && Object.prototype.hasOwnProperty.call(candidate, "data");
};
