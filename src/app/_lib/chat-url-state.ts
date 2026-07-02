"use client";

import { parseAsBoolean, parseAsString, useQueryStates } from "nuqs";

export const chatUrlParsers = {
  chat_open: parseAsBoolean.withDefault(false),
  chat_initial_message: parseAsString.withDefault(""),
};

export function useChatUrlState() {
  return useQueryStates(chatUrlParsers);
}
