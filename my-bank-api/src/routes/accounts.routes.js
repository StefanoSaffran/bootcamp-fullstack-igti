import express from 'express';

import AccountController from '../controllers/AccountController.js';
import AverageController from '../controllers/AverageController.js';
import CustomersController from '../controllers/CustomersController.js';
import DepositController from '../controllers/DepositController.js';
import WithdrawalController from '../controllers/WithdrawalController.js';
import TransferController from '../controllers/TransferController.js';

const { Router } = express;

const accountsRouter = Router();

accountsRouter.post('/', AccountController.create);
accountsRouter.get('/balance', AccountController.show);
accountsRouter.delete('/', AccountController.delete);

accountsRouter.get('/lower-balance', AccountController.index);

accountsRouter.get('/higher-balance', CustomersController.index);
accountsRouter.patch('/private-agency', CustomersController.update);

accountsRouter.get('/average-balance', AverageController.show);

accountsRouter.patch('/deposit', DepositController.update);

accountsRouter.patch('/withdrawal', WithdrawalController.update);

accountsRouter.patch('/transfer', TransferController.update);

export default accountsRouter;
