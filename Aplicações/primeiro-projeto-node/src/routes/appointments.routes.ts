import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';

// Appointment recebe primeiro o provider e depois o date
import Appointment from '../models/Appointment';

const appointmentsRouter = Router();

const appointments: Appointment[] = [];

appointmentsRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parsedDate = startOfHour(parseISO(date));
  const findAppointmentInSameDate = appointments.find(appointment =>
    isEqual(parsedDate, appointment.date),
  );

  if (findAppointmentInSameDate) {
    return response
      .status(400)
      .json({ message: 'Thies appointment is already booked' });
  }

  const appointment = new Appointment(provider, parsedDate);

  appointments.push(appointment);

  return response.json(appointment);
});

appointmentsRouter.get('/', (request, response) => {
  return response.json(appointments);
});

export default appointmentsRouter;
