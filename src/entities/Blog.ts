export type Blog = {
  id: number;
  title: string;
  text: string;
  authorId: string;
  authorName: string;
  photoPath: string;
  timestamp: Date
};

export type BlogRequestModel = {
  id : number;
  title: string;
  text: string;
  authorId: string;
  photo: File | null;

 }