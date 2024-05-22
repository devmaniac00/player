import { FormEvent, useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

import { useCreateVideo } from "@/shared/api/video";
import { VButton } from "@/shared/ui/VButton";

export interface Props {
  open: boolean;
  onClose: () => void;
}

export const VideoCreate = ({ open, onClose }: Props) => {
  const { mutate } = useCreateVideo();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    mutate({
      title,
      description,
      video_url: videoUrl,
      user_id: "anakon_73",
    });

    onClose();
  }

  function onReset() {
    setTitle("");
    setDescription("");
    setVideoUrl("");
  }

  useEffect(() => onReset(), [open]);

  return (
    <Dialog className='relative z-50' onClose={onClose} open={open}>
      <div className='fixed inset-0 flex w-screen items-center justify-center p-4'>
        <div className='w-full h-full bg-black/25 fixed' />
        <DialogPanel className='space-y-4 border relative z-10 bg-white py-8 px-12 rounded-2xl'>
          <DialogTitle className='font-bold'>Create new video</DialogTitle>
          <form
            onSubmit={(e) => onSubmit(e)}
            className='flex flex-col gap-3 w-96'
          >
            <div className='flex flex-col gap-2'>
              <label className='text-sm text-gray-600'>Title</label>
              <input
                type='text'
                className='border rounded-lg p-2 focus:outline-blue-600'
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                required
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='text-sm text-gray-600'>Description</label>
              <textarea
                className='border rounded-lg p-2 focus:outline-blue-600 resize-none'
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                required
              />
            </div>
            <div className='flex flex-col gap-2'>
              <label className='text-sm text-gray-600'>Video's URL</label>
              <input
                type='text'
                className='border rounded-lg p-2 focus:outline-blue-600'
                onChange={(e) => setVideoUrl(e.target.value)}
                value={videoUrl}
                required
              />
            </div>
            <div className='flex justify-end gap-2'>
              <VButton type='submit' variant='success'>
                Create
              </VButton>
              <VButton type='button' onClick={onClose} variant='danger'>
                Cancel
              </VButton>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};
