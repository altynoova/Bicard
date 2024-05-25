export type Schedule = {
  id: number
  dayOfWeek: number
  startTime: string
  endTime: string
  doctorId: number
}

export type ScheduleModel = Omit<Schedule, 'id'>

