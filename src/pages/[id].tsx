import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";

import { useVideoById } from "@/shared/api/video";
import {
  commentsByVideoId,
  useCommentsByVideoId,
  useCreateComment,
} from "@/shared/api/comment";
import { VButton } from "@/shared/ui/VButton";
import { VCommentCard } from "@/entities/comment/VCommentCard";

function VideoPage() {
  const {
    query: { id },
  } = useRouter();

  const { mutate } = useCreateComment({ video_id: id as string });

  const [user, setUser] = useState("");
  const [comment, setComment] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    mutate({
      content: comment,
      user_id: user,
      video_id: id as string,
    });

    setUser("");
    setComment("");
  }

  const { data: video, isLoading } = useVideoById({
    id: id as string,
  });

  const { data: comments, isLoading: isLoadingComments } = useCommentsByVideoId(
    { video_id: id as string }
  );

  useEffect(() => console.log(comments), [comments]);

  const videoUrl = video?.videoUrl.replace("watch?v=", "embed/");

  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + "." : ""));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Head>
        <title>{video?.title}</title>
      </Head>
      <div className='max-w-[1440px] px-[150px] mx-auto'>
        <div className='my-10'>
          {isLoading ? (
            <h2 className='text-center text-4xl font-bold'>Is Loading{dots}</h2>
          ) : video === undefined ? (
            <div className='flex flex-col gap-5 items-center'>
              <h2 className='text-center text-4xl font-bold'>
                Video Not Found
              </h2>
              <Link
                className='text-blue-600 text-xl font-medium hover:text-blue-700 duration-200 transition-colors'
                href='/'
              >
                Go Home
              </Link>
            </div>
          ) : (
            <div>
              <Link
                className='text-blue-600 text-xl font-medium hover:text-blue-700 duration-200 transition-colors'
                href='/'
              >
                Go Home
              </Link>
              <iframe
                className='rounded-xl mt-5 mb-5'
                width='100%'
                height='600'
                src={videoUrl}
              />
              <div className='mb-10'>
                <h3 className='text-2xl font-medium'>{video.title}</h3>
                <p className='mb-2'>{video.description}</p>
                <p className='text-sm text-gray-600 cursor-pointer'>
                  {video.userId}
                </p>
              </div>
              <div>
                <h2 className='text-3xl font-bold mb-6'>Comments</h2>
                <form className='mb-4' onSubmit={(e) => onSubmit(e)}>
                  <div className='flex flex-col gap-2 mb-3'>
                    <label className='text-sm text-gray-600'>User</label>
                    <input
                      type='text'
                      className='border rounded-lg p-2 focus:outline-blue-600 max-w-52'
                      value={user}
                      onChange={(e) => setUser(e.target.value)}
                      required
                    />
                  </div>
                  <div className='flex flex-col gap-2 mb-6'>
                    <label className='text-sm text-gray-600'>Comment</label>
                    <textarea
                      className='border rounded-lg p-2 focus:outline-blue-600 max-w-sm resize-none'
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                    />
                  </div>
                  <VButton type='submit'>Send Comment</VButton>
                </form>
                {isLoadingComments ? (
                  <div className='font-medium text-2xl'>Is Loading{dots}</div>
                ) : comments?.length === 0 || comments === undefined ? (
                  <div>No Comments</div>
                ) : (
                  <div className='ml-2 flex flex-col gap-2'>
                    {comments.map(({ userId, content }) => (
                      <VCommentCard author={userId} content={content} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default VideoPage;
