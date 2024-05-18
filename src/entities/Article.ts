export type Article = {
  id: number;
  title: string;
  filePath: string;
  authorName: string;
  timestamp: string
};

export type ArticleRequestModel = {
  title: string;
  File: File | null;
  authorName: string
 }