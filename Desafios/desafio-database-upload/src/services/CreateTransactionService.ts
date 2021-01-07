import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import Category from '../models/Category';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: string;
}
class CreateTransactionService {
  public async execute({
    title,
    value,
    type,
    category,
  }: Request): Promise<Transaction> {
    const transactionsRepository = getRepository(Transaction);
    const categoriesRepository = getRepository(Category);

    if (!title || !category || !type || !value) {
      throw new AppError('Please fill in all fields');
    }

    const types = 'income' || 'outcome';

    if (type !== types) {
      throw new AppError('Income and Outcome are mandatory');
    }

    const categoryExists = await categoriesRepository.findOne({
      where: { category },
    });

    if (categoryExists) {
      const transaction = transactionsRepository.create({
        title,
        value,
        type,
        category_id: categoryExists.id,
      });

      await transactionsRepository.save(transaction);

      return transaction;
    }

    const createCategory = categoriesRepository.create({
      title: category,
    });

    await categoriesRepository.save(createCategory);

    const id_category = await categoriesRepository.findOne();

    if (!id_category) {
      throw new AppError('s');
    }

    const transaction = transactionsRepository.create({
      title,
      value,
      type,
      category_id: id_category.id,
    });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
