import { z } from "zod";

export interface User {
  id: string;
  email: string;
  name: string;
  provider: "GOOGLE" | "GITHUB";
}

export const ZapCreateSchema = z.object({
  availableTriggerId: z.string(),
  triggerMetadata: z.any().optional(),
  actions: z.array(
    z.object({
      availableActionId: z.string(),
      actionMetadata: z.any().optional(),
    })
  ),
});
