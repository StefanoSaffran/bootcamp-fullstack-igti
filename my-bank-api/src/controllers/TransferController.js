import Account from '../models/Account.js';
import AppError from '../errors/AppErrors.js';

class TransferController {
  async update(request, response) {
    const { conta_origem, conta_destino, valor } = request.body;

    const originAccountExists = await Account.findOne({ conta: conta_origem });

    const destinyAccountExists = await Account.findOne({
      conta: conta_destino,
    });

    if (!originAccountExists || !destinyAccountExists)
      throw new AppError('Account not found.');

    if (valor < 0) throw new AppError('Negative values are not permitted.');

    if (originAccountExists.balance - valor < 0)
      throw new AppError('Transfer not permitted, insuffient funds.');

    const isSameAgency =
      originAccountExists.agencia === destinyAccountExists.agencia;

    const updatedOriginAccount = await Account.findByIdAndUpdate(
      originAccountExists.id,
      {
        balance: isSameAgency
          ? originAccountExists.balance - valor
          : originAccountExists.balance - (valor + 8),
      },
      { new: true },
    );

    await Account.findByIdAndUpdate(
      destinyAccountExists.id,
      {
        balance: destinyAccountExists.balance + valor,
      },
      { new: true },
    );

    return response.json(updatedOriginAccount.balance);
  }
}

export default new TransferController();
