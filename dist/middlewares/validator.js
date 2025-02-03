"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cryptoLabelSchema = exports.watchlistSchema = exports.changePasswordSchema = exports.acceptCodeSchema = exports.signinSchema = exports.signupSchema = void 0;
const joi_1 = __importDefault(require("joi"));
// email: Joi.string().min(6).max(60).required().email({
//   tlds: { allow:[ 'com', 'net' ] }
// }),
//password: Joi.string().required().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$'))
exports.signupSchema = joi_1.default.object({
    firstName: joi_1.default.string().min(2).max(20).required(),
    lastName: joi_1.default.string().min(2).max(20).required(),
    username: joi_1.default.string().min(6).max(60).required(),
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
