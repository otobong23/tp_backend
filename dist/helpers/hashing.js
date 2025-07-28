"use strict";
// import {hash, compare} from 'bcrypt'
// import { createHmac } from 'crypto'
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hmacProcess = exports.validateHash = void 0;
// const doHash = (value:string | Buffer, saltValue: string | number) => hash(value, saltValue)
// export const validateHash = (value:string | Buffer, hash:string) => compare(value, hash)
// export const hmacProcess = (value: any, key: any) => createHmac('sha256',key).update(value).digest('hex')
// export default doHash
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const crypto_1 = require("crypto");
const doHash = (value, saltRounds) => {
    // bcryptjs only works with string, not Buffer
    const valueStr = typeof value === 'string' ? value : value.toString();
    return bcryptjs_1.default.hash(valueStr, Number(saltRounds));
};
const validateHash = (value, hashed) => {
    const valueStr = typeof value === 'string' ? value : value.toString();
    return bcryptjs_1.default.compare(valueStr, hashed);
};
exports.validateHash = validateHash;
const hmacProcess = (value, key) => (0, crypto_1.createHmac)('sha256', key).update(value).digest('hex');
exports.hmacProcess = hmacProcess;
exports.default = doHash;
