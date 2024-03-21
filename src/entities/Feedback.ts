export type Feedback = {
  id: number
  message: string
  userName: string
  timeStamp: string
}

export type CreateFeedbackModel = {
  phone: string
  message: string
}
