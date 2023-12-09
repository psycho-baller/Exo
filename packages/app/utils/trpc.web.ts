import { createTRPCReact } from "@trpc/react-query";

import type { AppRouter } from "@acme/api";

// @ts-ignore
export const api = createTRPCReact<AppRouter>();

export { type RouterInputs, type RouterOutputs } from "@acme/api";
