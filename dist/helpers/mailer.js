"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = sendResetMail;
exports.sendMail = sendMail;
exports.sendTransactionStatus = sendTransactionStatus;
const nodemailer = __importStar(require("nodemailer"));
const react_1 = require("react");
const server_1 = require("react-dom/server");
const mail_1 = __importDefault(require("./mail"));
const dotenv_1 = require("dotenv");
const transactionmail_1 = __importDefault(require("./transactionmail"));
const TransactionStatusEmail_1 = __importDefault(require("./TransactionStatusEmail"));
(0, dotenv_1.config)();
const transport = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: false,
    port: 587,
    tls: {
        rejectUnauthorized: false, // This is necessary in some environments (e.g., local testing)
    },
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
});
async function sendResetMail(to, username, code) {
    const from = process.env.EMAIL_USER;
    const htmlContent = (0, server_1.renderToStaticMarkup)((0, react_1.createElement)(mail_1.default, { username, code }));
    const mailOptions = {
        from,
        to,
        subject: 'Reja: Reset Code',
        html: htmlContent,
    };
    const sendMail = await transport.sendMail(mailOptions);
    return sendMail.accepted[0] === to;
}
async function sendMail(to, email, amount, transactionId, type) {
    const from = process.env.EMAIL_USER;
    const htmlContent = (0, server_1.renderToStaticMarkup)((0, react_1.createElement)(transactionmail_1.default, { email, amount, transactionId, type }));
    const mailOptions = {
        from,
        to,
        subject: 'REJAH: Incoming Transaction Request',
        html: htmlContent,
    };
    const sendMail = await transport.sendMail(mailOptions);
    return sendMail.accepted[0] === to;
}
async function sendTransactionStatus(to, email, amount, transactionId, type, status, reason) {
    const from = process.env.EMAIL_USER;
    const htmlContent = (0, server_1.renderToStaticMarkup)((0, react_1.createElement)(TransactionStatusEmail_1.default, { email, transactionId, amount, type, status, reason }));
    const mailOptions = {
        from,
        to,
        subject: 'REJAH: Incoming Transaction Request',
        html: htmlContent,
    };
    const sendMail = await transport.sendMail(mailOptions);
    return sendMail.accepted[0] === to;
}
