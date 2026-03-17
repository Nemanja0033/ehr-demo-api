import { z } from 'zod';

export const createHrAuthSchema = z.object({
  body: z.object({
    email: z.email("Invalid email format"),
    password: z.string()
      .min(6, "Password must be at least 6 characters")
      .max(50, "Password too long"),
    name: z.string()
      .min(1, "Name is required")
      .max(100, "Name too long")
      .trim(),
  }),
});
