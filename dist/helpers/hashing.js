"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hmacProcess = exports.validateHash = void 0;
const bcrypt_1 = require("bcrypt");
const crypto_1 = require("crypto");
const doHash = (value, saltValue) => (0, bcrypt_1.hash)(value, saltValue);
const validateHash = (value, hash) => (0, bcrypt_1.compare)(value, hash);
exports.validateHash = validateHash;
const hmacProcess = (value, key) => (0, crypto_1.createHmac)('sha256', key).update(value).digest('hex');
exports.hmacProcess = hmacProcess;
exports.default = doHash;
