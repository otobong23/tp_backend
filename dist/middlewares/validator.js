"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTransactionDTO = exports.TransactionDTO = exports.updateUserDTO = exports.getUserDTO = exports.AdminUpdateData = exports.AdminLoginDto = exports.pageLimitDTO = exports.withdrawalDTO = exports.depositDTO = exports.cryptoLabelSchema = exports.watchlistSchema = exports.changePasswordSchema = exports.acceptCodeSchema = exports.signinSchema = exports.signupSchema = void 0;
const joi_1 = __importDefault(require("joi"));
// email: Joi.string().min(6).max(60).required().email({
//   tlds: { allow:[ 'com', 'net' ] }
// }),
//password: Joi.string().required().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$'))
exports.signupSchema = joi_1.default.object({
    firstName: joi_1.default.string().min(2).max(20).required(),
    lastName: joi_1.default.string().min(2).max(20).required(),
    username: joi_1.default.string().min(4).max(60).required(),
    password: joi_1.default.string().required().min(6)
});
exports.signinSchema = joi_1.default.object({
    username: joi_1.default.string().min(6).max(60).required(),
    password: joi_1.default.string().required().min(6)
});
exports.acceptCodeSchema = joi_1.default.object({
    providedCode: joi_1.default.number().required()
});
exports.changePasswordSchema = joi_1.default.object({
    newPassword: joi_1.default.string().required().min(6),
    oldPassword: joi_1.default.string().required().min(6)
});
exports.watchlistSchema = joi_1.default.object({
    watchlist: joi_1.default.alternatives().try(joi_1.default.array().items(joi_1.default.string()).required(), joi_1.default.string().required())
});
exports.cryptoLabelSchema = joi_1.default.object({
    cryptoLabel: joi_1.default.alternatives().try(joi_1.default.string().valid('ethereum'), joi_1.default.string().valid('bitcoin'), joi_1.default.string().valid('usd'))
});
exports.depositDTO = joi_1.default.object({
    amount: joi_1.default.number().required(),
    blockchain: joi_1.default.alternatives().try(joi_1.default.string().valid('USDT'), joi_1.default.string().valid('BTC'), joi_1.default.string().valid('ETH')).required(),
    image: joi_1.default.string().optional()
});
exports.withdrawalDTO = joi_1.default.object({
    walletAddress: joi_1.default.optional(),
    amount: joi_1.default.number().positive().required(),
    blockchain: joi_1.default.alternatives().try(joi_1.default.string().valid('USDT'), joi_1.default.string().valid('BTC'), joi_1.default.string().valid('ETH')).required(),
});
exports.pageLimitDTO = joi_1.default.object({
    limit: joi_1.default.number().positive().optional().default(50),
    page: joi_1.default.number().positive().optional().default(1)
});
exports.AdminLoginDto = joi_1.default.object({
    username: joi_1.default.string().required(),
    password: joi_1.default.string().required()
});
exports.AdminUpdateData = joi_1.default.object({
    username: joi_1.default.string().optional(),
    password: joi_1.default.string().optional(),
    walletAddress: joi_1.default.object({
        BTC: joi_1.default.string().optional(),
        ETH: joi_1.default.string().optional(),
        USDT: joi_1.default.string().optional()
    }).optional(),
});
exports.getUserDTO = joi_1.default.object({
    username: joi_1.default.string().required()
});
exports.updateUserDTO = joi_1.default.object({
    firstName: joi_1.default.string().optional(),
    lastName: joi_1.default.string().optional(),
    username: joi_1.default.string().optional(),
    verified: joi_1.default.boolean().optional(),
    wallet: joi_1.default.object({
        balance: joi_1.default.number().optional(),
        assetValue: joi_1.default.number().optional(),
        assetLoss: joi_1.default.number().optional(),
        watchList: joi_1.default.array().items(joi_1.default.string()).optional(),
    })
});
exports.TransactionDTO = joi_1.default.object({
    status: joi_1.default.string().valid('pending', 'completed', 'failed').required(),
});
exports.getTransactionDTO = joi_1.default.object({
    transactionID: joi_1.default.string().required()
});
