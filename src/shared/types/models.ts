export interface Video {
  created_at: string;
  videoUrl: string;
  userId: string;
  description: string;
  title: string;
  numComments: number;
  id: string;
}

export interface Comment {
  createdAt: string;
  content: string;
  videoId: string;
  userId: string;
  id: string;
}
