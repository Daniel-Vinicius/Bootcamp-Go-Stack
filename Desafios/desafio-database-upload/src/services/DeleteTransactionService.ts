import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const transactionsRepository = getRepository(Transaction);

    if (!id) {
      throw new AppError('Id is required');
    }

    await transactionsRepository
      .delete(id)
      .then(() => id)
      .catch(() => {
        throw new AppError('Does not exist Transaction');
      });
  }
}

export default DeleteTransactionService;