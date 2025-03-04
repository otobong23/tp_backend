import { addToWatchlist, getUsdtRate, getUser, getWallet } from '../controllers/walletControlller'
import { identifer } from '../middlewares/identification'
import { Router } from 'express'

const walletRouter = Router()

walletRouter.get('/getWallet', identifer, getWallet)
walletRouter.post('/addToWatchlist', identifer, addToWatchlist)
walletRouter.get('/getUser', identifer, getUser)

walletRouter.post('/getUsdtRate', getUsdtRate)

export default walletRouter