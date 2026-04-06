/**
 * Allowed webhook event types sent by BlueBubbles.
 */
export const BLUEBUBBLES_WEBHOOK_EVENT_TYPES = [
    "new-message",
    "updated-message",
    "message-send-error",
    "group-name-change",
    "group-icon-changed",
    "group-icon-removed",
    "participant-removed",
    "participant-added",
    "participant-left",
    "chat-read-status-changed",
    "typing-indicator",
    "scheduled-message-error",
    "server-update",
    "new-server",
    "new-findmy-location",
    "hello-world",
    "incoming-facetime",
    "ft-call-status-changed",
    // Keep both for compatibility:
    // - "imessage-alias-removed" appears in webhook option docs
    // - "imessage-aliases-removed" is emitted by some server versions
    "imessage-alias-removed",
    "imessage-aliases-removed",
    "theme-backup-created",
    "theme-backup-updated",
    "theme-backup-deleted",
    "settings-backup-created",
    "settings-backup-updated",
    "settings-backup-deleted"
] as const;

export type BlueBubblesWebhookEventType = (typeof BLUEBUBBLES_WEBHOOK_EVENT_TYPES)[number];

/**
 * Partial message shape that BlueBubbles commonly sends for message-related events.
 * Unknown extra fields are preserved for forward compatibility.
 */
export type BlueBubblesMessageData = {
    guid: string;
    text: string | null;
    isFromMe: boolean;
    dateCreated: number;
    dateRead?: number | null;
    dateDelivered?: number | null;
    dateEdited?: number | null;
    dateRetracted?: number | null;
    cacheRoomnames?: string | null;
    handle?: { address?: string; id?: string } | null;
    chats?: Array<{ guid: string; displayName?: string | null }>;
    attachments?: Array<{ guid: string; mimeType?: string; transferName?: string }>;
    [key: string]: unknown;
};

export type BlueBubblesChatReadStatusChangedData = {
    chatGuid: string;
    read: boolean;
};

export type BlueBubblesTypingIndicatorData = {
    display: boolean;
    guid: string;
};

export type BlueBubblesScheduledMessageData = {
    id: number;
    type: string;
    payload: Record<string, unknown>;
    scheduledFor: string | number | Date;
    schedule: Record<string, unknown>;
    status: string;
    error: string | null;
    sentAt: string | number | Date | null;
    created: string | number | Date;
    [key: string]: unknown;
};

export type BlueBubblesFindMyLocationData = {
    handle: string | null;
    coordinates: [number, number];
    long_address: string | null;
    short_address: string | null;
    subtitle: string | null;
    title: string | null;
    last_updated: number;
    is_locating_in_progress: 0 | 1;
    status: "legacy" | "live" | "shallow";
};

export type BlueBubblesIncomingFaceTimeData =
    | {
          caller: string;
          timestamp: number;
      }
    // Some versions send this payload JSON-stringified.
    | string;

export type BlueBubblesFaceTimeCallStatusData = {
    uuid: string;
    status_id: number;
    status: string;
    ended_error: string;
    ended_reason: string;
    address: string;
    handle?: Record<string, unknown> | null;
    image_url: string | null;
    is_outgoing: boolean;
    is_audio: boolean;
    is_video: boolean;
    url?: string | null;
};

export type BlueBubblesAliasesRemovedData = {
    aliases: string[];
};

export type BlueBubblesBackupEventData = Record<string, unknown> | null;

export type BlueBubblesWebhookDataByType = {
    "new-message": BlueBubblesMessageData;
    "updated-message": BlueBubblesMessageData;
    "message-send-error": BlueBubblesMessageData;
    "group-name-change": BlueBubblesMessageData;
    "group-icon-changed": BlueBubblesMessageData;
    "group-icon-removed": BlueBubblesMessageData;
    "participant-removed": BlueBubblesMessageData;
    "participant-added": BlueBubblesMessageData;
    "participant-left": BlueBubblesMessageData;
    "chat-read-status-changed": BlueBubblesChatReadStatusChangedData;
    "typing-indicator": BlueBubblesTypingIndicatorData;
    "scheduled-message-error": BlueBubblesScheduledMessageData;
    "server-update": string;
    "new-server": string;
    "new-findmy-location": BlueBubblesFindMyLocationData;
    "hello-world": null;
    "incoming-facetime": BlueBubblesIncomingFaceTimeData;
    "ft-call-status-changed": BlueBubblesFaceTimeCallStatusData;
    "imessage-alias-removed": BlueBubblesAliasesRemovedData;
    "imessage-aliases-removed": BlueBubblesAliasesRemovedData;
    "theme-backup-created": BlueBubblesBackupEventData;
    "theme-backup-updated": BlueBubblesBackupEventData;
    "theme-backup-deleted": BlueBubblesBackupEventData;
    "settings-backup-created": BlueBubblesBackupEventData;
    "settings-backup-updated": BlueBubblesBackupEventData;
    "settings-backup-deleted": BlueBubblesBackupEventData;
};

/**
 * Generic payload helper for a specific event type.
 */
export type BlueBubblesWebhookPayloadFor<TType extends BlueBubblesWebhookEventType> = {
    type: TType;
    data: BlueBubblesWebhookDataByType[TType];
};

/**
 * Discriminated union for all webhook payloads.
 * Switch on `payload.type` and TypeScript narrows `payload.data` automatically.
 */
export type BlueBubblesWebhookPayload = {
    [TType in BlueBubblesWebhookEventType]: BlueBubblesWebhookPayloadFor<TType>;
}[BlueBubblesWebhookEventType];
