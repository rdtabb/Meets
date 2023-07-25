import { z, ZodType } from "zod";
import type { EditProfilePopupData } from "../types/Types";

export const formSchema: ZodType<EditProfilePopupData> = z.object({
  username: z
    .string()
    .regex(/^[A-Za-z0-9\s]+$/, {
      message: "Username can contain only letters and numbers",
    })
    .trim()
    .max(70),
  status: z
    .string()
    .trim()
    .min(2, {
      message: "Status must be at lest 2 characters long",
    })
    .max(70),
});
