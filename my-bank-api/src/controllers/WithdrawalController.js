import Account from '../models/Account.js';
import AppError from '../errors/AppErrors.js';

class WithdrawalController {
  async update(request, response) {
    const { agencia, conta, valor } = request.body;

    const accountExists = await Account.findOne({ agencia, conta });

    if (!accountExists) throw new AppError('Account not found.');

    if (valor < 0) throw new AppError('Negative values are not permitted.');

    if (accountExists.balance - valor < 0)
      throw new AppError('Withdrawal not permitted, insuffient funds.');

    const updatedAccount = await Account.findByIdAndUpdate(
      accountExists.id,
      { balance: accountExists.balance - (valor + 1) },
      { new: true },
    );

    return response.json(updatedAccount);
  }
}

export default new WithdrawalController();
