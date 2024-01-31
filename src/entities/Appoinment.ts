export type Appointment = {
  id: number;
  name: string;
  age: string;
  email: string;
  phoneNumber: string;
  serviceType: string;
  doctorName: string;
  timeStamp: string;
};

export type AppointmentRequest = Appointment & {
  isConfirmed: boolean;
  timeAtSchedule: string;
  confirmedByUserId: number;
}

export type AppointmentConfirmationModel = {
  id: number;
  timeAtSchedule: string;
  confirmedByUserId: number;
}