"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adminController_1 = __importDefault(require("../controllers/adminController"));
const express_1 = require("express");
const identification_1 = require("../middlewares/identification");
const adminRouter = (0, express_1.Router)();
// Admin Auth
adminRouter.post('/login', adminController_1.default.login.bind(adminController_1.default));
// Admin profile
adminRouter.get('/global-data', adminController_1.default.globalData.bind(adminController_1.default));
adminRouter.use(identification_1.identifer);
adminRouter.get('/', adminController_1.default.getAdmin.bind(adminController_1.default));
adminRouter.put('/', adminController_1.default.updateAdmin.bind(adminController_1.default));
// Dashboard stats
adminRouter.get('/dashboard/total-users', adminController_1.default.getTotalUsers.bind(adminController_1.default));
// Users
adminRouter.get('/users', adminController_1.default.getAllUsers.bind(adminController_1.default)); // paginated via body
adminRouter.get('/user', adminController_1.default.getUser.bind(adminController_1.default));
adminRouter.put('/user/', adminController_1.default.updateUser.bind(adminController_1.default));
adminRouter.delete('/user/', adminController_1.default.deleteUser.bind(adminController_1.default));
adminRouter.get('/users/search', adminController_1.default.searchUsers.bind(adminController_1.default));
// Transactions
adminRouter.get('/transactions', adminController_1.default.getTransactions.bind(adminController_1.default)); // paginated via body
adminRouter.get('/user/transactions/', adminController_1.default.getUserTransactions.bind(adminController_1.default));
adminRouter.put('/transactions/', adminController_1.default.updateTransaction.bind(adminController_1.default));
adminRouter.delete('/transactions/', adminController_1.default.deleteTransaction.bind(adminController_1.default));
exports.default = adminRouter;
