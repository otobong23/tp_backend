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
exports.welcomeMessage = exports.sendCode = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mail_1 = __importStar(require("../helpers/mail"));
const react_1 = __importDefault(require("react"));
const server_1 = __importDefault(require("react-dom/server"));
const transport = nodemailer_1.default.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    secure: false,
    port: 587,
    tls: {
        rejectUnauthorized: false, // This is necessary in some environments (e.g., local testing)
    },
    auth: {
        user: process.env.NODE_MAIL_ADDRESS,
        pass: process.env.NODE_MAIL_PASSWORD,
    }
});
const sendCode = async (to, code, firstName) => {
    const htmlContent = server_1.default.renderToStaticMarkup(react_1.default.createElement(mail_1.default, { firstName, code }));
    const sendMail = await transport.sendMail({
        from: process.env.NODE_MAIL_ADDRESS,
        to: to,
        subject: 'TradePhere: Verification Code',
        html: htmlContent,
    });
    return sendMail.accepted[0] === to;
};
exports.sendCode = sendCode;
const welcomeMessage = async (to, firstName) => {
    const htmlContent = server_1.default.renderToStaticMarkup(react_1.default.createElement(mail_1.WelcomeTemplate, { firstName }));
    const sendMail = await transport.sendMail({
        from: process.env.NODE_MAIL_ADDRESS,
        to: to,
        subject: 'TradePhere: Welcome Message',
        html: htmlContent,
    });
    return sendMail.accepted[0] === to;
};
exports.welcomeMessage = welcomeMessage;
