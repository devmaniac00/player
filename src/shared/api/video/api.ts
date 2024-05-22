import { z } from "zod";

import { VideoSchema } from "./types";
import { normalizeVideo } from "./normalizers";

const endpoints = {
  get: {
    url: "https://take-home-assessment-423502.uc.r.appspot.com/api/videos?user_id=anakon_73",
    method: "get",
    schema: z.object({ videos: z.array(VideoSchema) }),
  },
  byId: {
    url: "https://take-home-assessment-423502.uc.r.appspot.com/api/videos?user_id=anakon_73",
    method: "get",
    schema: z.object({ videos: z.array(VideoSchema) }),
  },
  create: {
    url: "https://take-home-assessment-423502.uc.r.appspot.com/api/videos?user_id=anakon_73",
    method: "post",
    schema: z.any(),
  },
};

export { endpoints as videoEndpoints };

export async function getVideos() {
  const { url, schema, method } = endpoints.get;

  return schema
    .parse(await fetch(url, { method }).then((r) => r.json()))
    .videos.map((video) => normalizeVideo(video));
}

export type VideoByIdParams = { id: string };
export async function videoById({ id }: VideoByIdParams) {
  const { url, schema, method } = endpoints.get;

  const videos = schema
    .parse(await fetch(url, { method }).then((r) => r.json()))
    .videos.map((video) => normalizeVideo(video));

  return videos.find((video) => video.id === id);
}

export type CreateVideoParams = {
  user_id: string;
  description: string;
  video_url: string;
  title: string;
};
export async function createVideo({
  description,
  title,
  user_id,
  video_url,
}: CreateVideoParams) {
  const { url, method, schema } = endpoints.create;

  const data = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      description,
      title,
      user_id,
      video_url,
    }),
  }).then((r) => r.json());

  return schema.parse(data);
}
