import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

class AppointmentRepository {
  private appointments: Appointment[];

  public create(provider: string, date: Date): Appointment | null {
    const appointment = new Appointment(provider, date);

    this.appointments.push(appointment);

    return appointment;
  }

  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find((appointment) =>
      isEqual(date, appointment.date),
    );

    return findAppointment || null;
  }

  constructor() {
    this.appointments = [];
  }
}

export default AppointmentRepository;
