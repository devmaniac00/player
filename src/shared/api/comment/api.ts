import { z } from "zod";
import { CommentSchema } from "./types";
import { normalizeComment } from "./normalizers";

const endpoints = {
  byVideoId: {
    url: ({ video_id }: CommentsByVideoIdParams) =>
      `https://take-home-assessment-423502.uc.r.appspot.com/api/videos/comments?video_id=${video_id}`,
    method: "get",
    schema: z.object({ comments: z.array(CommentSchema) }),
  },
  create: {
    url: ({ video_id }: Pick<CreateCommentParams, "video_id">) =>
      `https://take-home-assessment-423502.uc.r.appspot.com/api/videos/comments?video_id=${video_id}`,
    method: "post",
    schema: z.any(),
  },
};

export { endpoints as commentEndpoints };

export type CommentsByVideoIdParams = { video_id: string };
export async function commentsByVideoId({ video_id }: CommentsByVideoIdParams) {
  const { url, method, schema } = endpoints.byVideoId;

  const a = schema
    .parse(await fetch(url({ video_id }), { method }).then((r) => r.json()))
    .comments.map((comment) => normalizeComment(comment));

  console.log(a);

  return a;
}

export type CreateCommentParams = {
  video_id: string;
  content: string;
  user_id: string;
};
export async function createComment({
  content,
  user_id,
  video_id,
}: CreateCommentParams) {
  const { url, method, schema } = endpoints.create;

  const data = await fetch(url({ video_id }), {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content,
      user_id,
      video_id,
    }),
  }).then((r) => r.json());

  return schema.parse(data);
}
