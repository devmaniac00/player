import Head from "next/head";
import { useEffect, useState } from "react";
import { Inter } from "next/font/google";

import { VideoCard } from "@/widgets/VideoCard";
import { VideoCreate } from "@/features/video/create";

import { useVideos } from "@/shared/api/video";
import { VButton } from "@/shared/ui/VButton";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

function ListPage() {
  const { data: videos, isLoading } = useVideos();

  const [open, setOpen] = useState(false);

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
        <title>Videos List</title>
      </Head>
      <VideoCreate onClose={() => setOpen(false)} open={open} />
      <div className='max-w-[1440px] mx-auto px-[150px]'>
        <div className='mt-10 mb-12 flex justify-between'>
          <h1 className='text-2xl'>Videos By Anakon73</h1>
          <VButton onClick={() => setOpen(true)}>Create new video</VButton>
        </div>
        {isLoading ? (
          <h2 className='text-center text-4xl font-bold'>Is Loading{dots}</h2>
        ) : (
          (videos?.length === 0 || videos === undefined) && (
            <h2 className='text-center text-4xl font-bold'>Not Found Videos</h2>
          )
        )}
        {}
        <div className='grid grid-cols-4 gap-5'>
          {videos?.map(({ userId, title, videoUrl, id }) => (
            <Link href={`/${id}`}>
              <VideoCard
                key={id}
                videoUrl={videoUrl}
                author={userId}
                title={title}
              />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default ListPage;
