export type Blog = {
  id: number;
  title: string;
  text: string;
  authorId: string;
  photoPath: string;
  timestamp: Date
};

export type BlogRequestModel = {
  title: string;
  text: string;
  authorId: string;
  photo: File | null;

 }