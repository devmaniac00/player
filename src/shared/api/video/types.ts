import { z } from "zod";

export const VideoSchema = z.object({
  created_at: z.string(),
  video_url: z.string(),
  user_id: z.string(),
  description: z.string(),
  title: z.string(),
  num_comments: z.number(),
  id: z.string(),
});
