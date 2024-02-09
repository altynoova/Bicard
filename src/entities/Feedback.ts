export type Feedback = {
  id: number
  message: string
  userName: string
  timeStamp: string
}

export type CreateFeedbackModel = {
  message: string
  userId: number
  doctorId: number
}
