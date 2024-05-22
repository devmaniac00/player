import { z } from "zod";
import { Video } from "@/shared/types";
import { objectPick } from "../lib";
import { VideoSchema } from "./types";

export function normalizeVideo(video: z.infer<typeof VideoSchema>): Video {
  const { user_id, video_url, created_at, num_comments } = video;

  return {
    ...objectPick(video, ["description", "title", "id"]),
    userId: user_id,
    videoUrl: video_url,
    created_at: created_at,
    numComments: num_comments,
  };
}
