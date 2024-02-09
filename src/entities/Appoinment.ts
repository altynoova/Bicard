export type Appointment = {
  id: number
  name: string
  age: string
  email: string
  phoneNumber: string
  serviceType: string
  doctorName: string
  timeStamp: string
}

export type CreateAppointmentModel = {
  name: string
  email: string
  phoneNumber: string
  subMedServiceId: number
  doctorId: number
  age: string
  timeAtSchedule: string
}
