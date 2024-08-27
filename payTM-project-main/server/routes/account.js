// this is the subroute after /account/.

import express from 'express';
import { authMiddleware } from '../middleware/token.js';
import { getBalanceController, transferController } from '../controllers/accountController.js';

const accountRouter = express.Router();

accountRouter.get("/balance", authMiddleware, getBalanceController);
accountRouter.post("/transfer", authMiddleware, transferController);

export default accountRouter;

