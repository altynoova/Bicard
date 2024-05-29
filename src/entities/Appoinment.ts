export type Appointment = {
  id: number
  name: string
  age: string
  email: string
  phoneNumber: string
  subMedServiceId: string
  doctorName: string
  timeStamp: string
}

export type CreateAppointmentModel = {
  name: string
  email: string
  phoneNumber: string
  doctorId: number
  age: string
  timeAtSchedule: string
}
