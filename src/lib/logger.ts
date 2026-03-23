// Lightweight structured JSON logger — zero external dependencies.

type LogLevel = "debug" | "info" | "warn" | "error";

const LOG_LEVELS: Record<LogLevel, number> = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

const SENSITIVE_KEYS = new Set([
  "email",
  "password",
  "apikey",
  "apiKey",
  "token",
  "secret",
  "authorization",
]);

function getConfiguredLevel(): LogLevel {
  const envLevel = (
    typeof process !== "undefined" ? process.env?.LOG_LEVEL : undefined
  )?.toLowerCase() as LogLevel | undefined;

  if (envLevel && envLevel in LOG_LEVELS) return envLevel;

  const isDev =
    typeof process !== "undefined" && process.env?.NODE_ENV === "development";
  return isDev ? "debug" : "info";
}

/**
 * Recursively redact sensitive fields in a context object.
 * Returns a shallow-ish copy — nested objects are copied only when they
 * contain a key that needs redacting.
 */
export function redact<T>(value: T): T {
  if (value === null || value === undefined) return value;
  if (typeof value !== "object") return value;
  if (Array.isArray(value)) return value.map(redact) as unknown as T;

  const result: Record<string, unknown> = {};
  for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
    if (SENSITIVE_KEYS.has(key) || SENSITIVE_KEYS.has(key.toLowerCase())) {
      result[key] = typeof val === "string" ? "[REDACTED]" : "[REDACTED]";
    } else if (val !== null && typeof val === "object") {
      result[key] = redact(val);
    } else {
      result[key] = val;
    }
  }
  return result as T;
}

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  [key: string]: unknown;
}

function emit(level: LogLevel, message: string, context?: Record<string, unknown>): void {
  const threshold = getConfiguredLevel();
  if (LOG_LEVELS[level] < LOG_LEVELS[threshold]) return;

  const entry: LogEntry = {
    timestamp: new Date().toISOString(),
    level,
    message,
    ...context,
  };

  const line = JSON.stringify(entry);

  switch (level) {
    case "error":
      console.error(line);
      break;
    case "warn":
      console.warn(line);
      break;
    case "debug":
      console.debug(line);
      break;
    default:
      console.log(line);
  }
}

export const logger = {
  debug(message: string, context?: Record<string, unknown>) {
    emit("debug", message, context);
  },
  info(message: string, context?: Record<string, unknown>) {
    emit("info", message, context);
  },
  warn(message: string, context?: Record<string, unknown>) {
    emit("warn", message, context);
  },
  error(message: string, context?: Record<string, unknown>) {
    emit("error", message, context);
  },
};
