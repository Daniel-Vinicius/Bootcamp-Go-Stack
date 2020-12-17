import { EntityRepository, Repository } from 'typeorm';

import Appointment from '../models/Appointment';

@EntityRepository(Appointment)
class AppointmentsRepository extends Repository<Appointment> {
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({
      where: {
        date,
      },
    });

    return findAppointment || null;
  }
}

export default AppointmentsRepository;

/*
const findAppointment = await this.findOne({
    Este where significa: onde date que está na Entity
    = date passada pro findByDate

      where: {
        date,
 },
});
*/
