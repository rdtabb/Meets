import { z, ZodType } from "zod";
import type { EditProfilePopupData } from "../types/Types";

export const formSchema: ZodType<EditProfilePopupData> = z.object({
  username: z.string().trim().max(70),
  status: z
    .string()
    .trim()
    .min(2, {
      message: "Status must be at lest 2 characters long",
    })
    .max(70),
});
