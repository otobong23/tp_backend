import {Router} from 'express';
import authRouter from './authRouter'
import transactionRouter from './transactionRouter'
import walletRouter from "./walletRouter";
import adminRouter from './adminRouter';


const router = Router()

router.use('/auth', authRouter)
router.use('/user',transactionRouter)
router.use('/user', walletRouter)
router.use('/admin', adminRouter)

export default router