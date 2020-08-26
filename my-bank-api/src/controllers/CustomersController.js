import Account from '../models/Account.js';

class CustomersController {
  async index(request, response) {
    const { quantidade } = request.body;

    const accounts = await Account.find()
      .sort({ balance: -1, name: 1 })
      .limit(quantidade);

    return response.json(accounts);
  }

  async update(request, response) {
    const accounts = await Account.find();

    const agencies = Array.from(
      new Set(
        accounts.map(account => {
          console.log(account.agencia);
          return account.agencia;
        }),
      ),
    );

    const accountsToReturn = [];
    for (const agency of agencies) {
      const agencyAccount = await Account.find({ agencia: agency })
        .sort({ balance: -1 })
        .limit(1);

      console.log(agencyAccount);

      const updatedAccount = await Account.findByIdAndUpdate(
        agencyAccount[0].id,
        { agencia: 99 },
        { new: true },
      );

      accountsToReturn.push(updatedAccount);
    }

    return response.json(accountsToReturn);
  }
}

export default new CustomersController();
