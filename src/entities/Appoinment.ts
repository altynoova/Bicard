export type Appointment = {
  id: number
  name: string
  email: string
  phoneNumber: string
  age: string
  isConfirmed: boolean
  date: string
  doctorId: number
  timeStamp: string
}

export type CreateAppointmentModel = {
  name: string
  email: string
  phoneNumber: string
  doctorId: number
  age: string
  date: string
}
