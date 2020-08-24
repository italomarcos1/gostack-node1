import AppError from '@shared/errors/AppError';
import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointment', () => {
  it('should create an appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
    );

    const appointment = await createAppointmentService.execute({
      provider_id: '7012',
      date: new Date(),
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('7012');
  });

  it('should not create two appointments at the same date', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository();
    const createAppointmentService = new CreateAppointmentService(
      fakeAppointmentRepository,
    );

    await createAppointmentService.execute({
      provider_id: '7012',
      date: new Date(),
    });

    await expect(
      createAppointmentService.execute({
        provider_id: '7012',
        date: new Date(),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
