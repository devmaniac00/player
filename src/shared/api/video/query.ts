import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { createVideo, getVideos, videoById, type VideoByIdParams } from "./api";

const entity = "videos";
const Scopes = { All: "all", ById: "by-id" };

const keys = {
  getVideos: () => [{ entity, scope: Scopes.All }],
  byId: (params: VideoByIdParams) => [
    { entity, scope: Scopes.ById, ...params },
  ],
} as const;

export { entity as videoEntity, Scopes as videoScopes, keys as videoKeys };

export function useVideosQuery() {
  return queryOptions({
    queryKey: keys.getVideos(),
    queryFn: getVideos,
    refetchOnWindowFocus: false,
  });
}

export function useVideos() {
  return useQuery(useVideosQuery());
}

export function useVideoByIdQuery(params: VideoByIdParams) {
  return queryOptions({
    queryKey: keys.byId(params),
    queryFn: ({ queryKey: [{ id }] }) => videoById({ id: id }),
    enabled: !!params.id,
    refetchOnWindowFocus: false,
  });
}

export function useVideoById(params: VideoByIdParams) {
  return useQuery(useVideoByIdQuery(params));
}

export function useCreateVideo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createVideo,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: keys.getVideos() }),
  });
}
