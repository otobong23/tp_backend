import AdminService from '../controllers/adminController';
import { Router } from 'express';
import { identifer } from '../middlewares/identification';

const adminRouter = Router();

// Admin Auth
adminRouter.post('/login', AdminService.login.bind(AdminService));

// Admin profile
adminRouter.get('/global-data', AdminService.globalData.bind(AdminService));

adminRouter.use(identifer)
adminRouter.get('/', AdminService.getAdmin.bind(AdminService));
adminRouter.put('/', AdminService.updateAdmin.bind(AdminService));

// Dashboard stats
adminRouter.get('/dashboard/total-users', AdminService.getTotalUsers.bind(AdminService));

// Users
adminRouter.get('/users', AdminService.getAllUsers.bind(AdminService)); // paginated via body
adminRouter.get('/user', AdminService.getUser.bind(AdminService));
adminRouter.put('/user/', AdminService.updateUser.bind(AdminService));
adminRouter.get('/users/search', AdminService.searchUsers.bind(AdminService));

// Transactions
adminRouter.get('/transactions', AdminService.getTransactions.bind(AdminService)); // paginated via body
adminRouter.get('/user/transactions/', AdminService.getUserTransactions.bind(AdminService));
adminRouter.put('/transactions/', AdminService.updateTransaction.bind(AdminService));

export default adminRouter;
