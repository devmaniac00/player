import { getYouTubeVideoId } from "@/shared/lib/utils";

export interface Props {
  author: string;
  title: string;
  videoUrl: string;
}

export const VideoCard = ({ author, title, videoUrl }: Props) => {
  const videoId = getYouTubeVideoId(videoUrl);

  return (
    <div className='max-w-60'>
      <img
        className='w-full h-32 object-cover rounded-lg'
        src={`http://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
      />
      <div className='line-clamp-2 text-lg'>{title}</div>
      <div className='line-clamp-2 text-gray-600 text-xs'>{author}</div>
    </div>
  );
};
