import FakeAppointmentsRepository from '@modules/appointments/repositories/FakeAppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should create an appointment', async () => {
    const repository = new FakeAppointmentsRepository();
    const createAppointmentService = new CreateAppointmentService(repository);

    const appointment = await createAppointmentService.execute({
      date: new Date(),
      provider_id: '123123123',
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('123123123');
  });
});
