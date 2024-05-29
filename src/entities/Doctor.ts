export type Doctor = {
  id: number
  name: string
  bio: string
  speciality: string
  education: string
  experience: string
  pathToPhoto: string
  phoneNumber: string
  email: string
  address: string
  userId: number
}

export type DoctorRequestModel = {
  name: string
  speciality: string
  bio: string
  education: string
  experience: string
  photo: File | null
  phoneNumber: string
  email: string
  address: string
  userId: number
}
export type TimeTable = {
  doctorId: number
  doctorName: string
  doctorSpecialty: string
  days: {
    date: string
    dayOfWeek: string
    startTime: string
    endTime: string
  }[]
}
export type TimeSlots = {
  date: string
  dayOfWeek: string
  startTime: string
  endTime: string
  timeslots: { Time: string; Status: 'available' | 'booked' }[]
}
export type DoctorTimetable = {
  date: string
  dayOfWeek: string
  startTime: string
  endTime: string
  timeslots: { Time: string; Status: 'available' | 'booked' }[]
}[]
