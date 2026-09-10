import { sendDiscordError } from "./discord";

function serializeError(error: unknown): string {
  if (error instanceof Error) {
    return `${error.name}: ${error.message}\n${error.stack || ""}`;
  }
  if (typeof error === "string") return error;
  try {
    return JSON.stringify(error, null, 2);
  } catch {
    return String(error);
  }
}

export async function logError(error: unknown, context: string) {
  const errorMessage = serializeError(error);

  console.error(`[ERROR] ${context}:`, errorMessage);

  if (process.env.NODE_ENV === "production") {
    await sendDiscordError(context, errorMessage).catch((err) => {
      console.error("[LOGGER] Failed to send Discord error:", err);
    });
  }
}
