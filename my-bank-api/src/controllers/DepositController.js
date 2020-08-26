import Account from '../models/Account.js';
import AppError from '../errors/AppErrors.js';

class DepositController {
  async update(request, response) {
    const { agencia, conta, valor } = request.body;

    const accountExists = await Account.findOne({ agencia, conta });

    if (!accountExists) {
      throw new AppError('Account not found.');
    }

    if (valor < 0) throw new AppError('Negative values are not permitted.');

    const updatedAccount = await Account.findByIdAndUpdate(
      accountExists.id,
      { balance: accountExists.balance + valor },
      { new: true },
    );

    return response.json(updatedAccount);
  }
}

export default new DepositController();
