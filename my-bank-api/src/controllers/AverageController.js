import Account from '../models/Account.js';
import AppError from '../errors/AppErrors.js';

class AverageController {
  async show(request, response) {
    const { agencia } = request.body;

    const accounts = await Account.find({ agencia });
    console.log(accounts.length);

    if (!accounts.length) throw new AppError('Agency not found.');

    const totalBalance = accounts.reduce((accumulator, { balance }) => {
      accumulator += balance;
      return accumulator;
    }, 0);

    const averageBalance = totalBalance / accounts.length;

    return response.json(Number(averageBalance.toFixed(2)));
  }
}

export default new AverageController();
