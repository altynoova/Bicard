export type Vacancy = {
  id: number;
  position: string;
  requirements: string;
  description: string;
  timestamp: Date
};

export type VacancyRequestModel = {
  position: string;
  requirements: string;
  description: string;
 }
 export type Formdata = {
  File: File | null;
 }