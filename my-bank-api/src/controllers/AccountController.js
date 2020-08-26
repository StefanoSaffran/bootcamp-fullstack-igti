import Account from '../models/Account.js';
import AppError from '../errors/AppErrors.js';

class AccountController {
  async create(request, response) {
    const { agencia, conta, name } = request.body;

    const accountExists = await Account.findOne({ agencia, conta });

    if (accountExists) throw new AppError('Account already exists.');

    const newAccount = await Account.create({
      agencia,
      conta,
      name,
      balance: 0,
    });

    return response.json(newAccount);
  }

  async index(request, response) {
    const { quantidade } = request.body;

    const accounts = await Account.find()
      .sort({ balance: 1 })
      .limit(quantidade);

    return response.json(accounts);
  }

  async show(request, response) {
    const { agencia, conta } = request.body;

    const accountExists = await Account.findOne({ agencia, conta });

    if (!accountExists) throw new AppError('Account not found.');

    return response.json(accountExists.balance);
  }

  async delete(request, response) {
    const { agencia, conta } = request.body;

    const accountExists = await Account.findOne({ agencia, conta });

    if (!accountExists) throw new AppError('Account not found.');

    await Account.findByIdAndRemove(accountExists.id);

    const accounts = await Account.countDocuments({ agencia });

    return response.json(accounts);
  }
}

export default new AccountController();
