import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  CommentsByVideoIdParams,
  commentsByVideoId,
  createComment,
} from "./api";

const entity = "comment";
const Scopes = { ByVideoId: "by-video-id" };

const keys = {
  byVideoId: (params: CommentsByVideoIdParams) => [
    { entity, scope: Scopes.ByVideoId, ...params },
  ],
} as const;

export function useCommentsByVideoIdQuery(params: CommentsByVideoIdParams) {
  return queryOptions({
    queryKey: keys.byVideoId(params),
    queryFn: ({ queryKey: [{ video_id }] }) => commentsByVideoId({ video_id }),
    enabled: !!params.video_id,
  });
}

export function useCommentsByVideoId(params: CommentsByVideoIdParams) {
  return useQuery(useCommentsByVideoIdQuery(params));
}

export function useCreateComment(params: CommentsByVideoIdParams) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createComment,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: keys.byVideoId(params) }),
  });
}
