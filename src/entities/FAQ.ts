export type FAQList = {
  id: number;
  type: string;
  faqs: FAQ[];
};

export type FAQ = {
  id: number;
  question: string;
  answer: string;
  type: string;
};

export type FAQRequestModel = {
  question: string;
  answer: string;
  type: string;
 }