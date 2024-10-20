"use client";

import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "A Thread name is required").max(50).trim(),
  thread: z.array(
    z.object({
      id: z.number(),
      tweet: z.string().min(1, "A tweet can't be empty").max(280).trim(),
    }),
  ),
});

type FormSchema = z.infer<typeof formSchema>;

export { formSchema };
export type { FormSchema };
