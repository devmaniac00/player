import { z } from "zod";

export const CommentSchema = z.object({
  created_at: z.string(),
  content: z.string(),
  user_id: z.string(),
  video_id: z.string(),
  id: z.string(),
});
