export type Schedule = {
  id: number
  name: string
  startTime: string
  endTime: string
  employeeId: number
}

export type ScheduleModel = Omit<Schedule, 'id'>

