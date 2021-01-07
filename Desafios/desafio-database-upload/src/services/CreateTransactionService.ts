import { getRepository, getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import TransactionsRepository from '../repositories/TransactionsRepository';
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
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const categoriesRepository = getRepository(Category);
    const transactions = await transactionsRepository.find();
    const { total } = await transactionsRepository.getBalance(transactions);

    if (!title || !category || !type || !value) {
      throw new AppError('Please fill in all fields');
    }

    if (!['income', 'outcome'].includes(type)) {
      throw new AppError('Income and Outcome are mandatory');
    }

    if (type === 'outcome' && total < value) {
      throw new AppError('You dont have enough balance');
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
      throw new AppError('Internal server error');
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
