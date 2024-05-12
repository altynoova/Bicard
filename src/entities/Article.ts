export type Article = {
  id: number;
  title: string;
  filePath: string;
  authorName: string;
  timestamp: Date
};

export type ArticleRequestModel = {
  title: string;
  filePath: string;
  authorName: string;
  timestamp: Date
 }