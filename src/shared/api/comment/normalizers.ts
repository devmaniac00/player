import { z } from "zod";
import { Comment } from "@/shared/types";
import { objectPick } from "../lib";
import { CommentSchema } from "./types";

export function normalizeComment(
  comment: z.infer<typeof CommentSchema>
): Comment {
  const { created_at, user_id, video_id } = comment;

  return {
    ...objectPick(comment, ["id", "content"]),
    createdAt: created_at,
    userId: user_id,
    videoId: video_id,
  };
}
