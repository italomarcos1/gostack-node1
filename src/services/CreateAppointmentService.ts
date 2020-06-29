import { startOfHour } from 'date-fns';
import Appointment from '../models/Appointment';
import AppointmentRepository from '../repositories/AppointmentsRepository';

interface Request {
  provider: string;
  date: Date;
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentRepository;

  constructor(appointmentsRepository: AppointmentRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public async execute({ provider, date }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(date);
    const alreadyBooked = this.appointmentsRepository.findByDate(
      appointmentDate,
    );

    if (alreadyBooked) {
      throw Error('Already booked.');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
