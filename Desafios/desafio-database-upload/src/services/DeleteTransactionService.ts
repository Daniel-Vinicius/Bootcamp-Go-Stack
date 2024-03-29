import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Transaction from '../models/Transaction';

interface Request {
  id: string;
}

class DeleteTransactionService {
  public async execute({ id }: Request): Promise<void> {
    const transactionsRepository = getRepository(Transaction);

    await transactionsRepository
      .delete(id)
      .then(() => id)
      .catch(() => {
        throw new AppError('Transaction Does not exist');
      });
  }
}

export default DeleteTransactionService;
