import { Router } from 'express'
import { identifer } from '../middlewares/identification'
import withdraw, { deposit, getTransactionHistory } from '../controllers/transactionController'

const transactionRouter = Router()

transactionRouter.post('/deposit', identifer, deposit)
transactionRouter.get('/getTransactions',identifer,getTransactionHistory)
transactionRouter.post('/withdraw', identifer, withdraw)

export default transactionRouter