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
exports.changePassword = exports.verifyCode = exports.sendVerificationCode = exports.isVerified = exports.signout = exports.signin = exports.signup = void 0;
const validator_1 = require("../middlewares/validator");
const usersModel_1 = __importStar(require("../models/usersModel"));
const hashing_1 = require("../helpers/hashing");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mailer_1 = require("../middlewares/mailer");
const signup = async (req, res) => {
    const { username, password, firstName, lastName } = req.body;
    try {
        const { error, value } = validator_1.signupSchema.validate(req.body);
        if (error) {
            res.status(406).json({ success: false, message: error.details[0].message });
            return;
        }
        const existingUser = await (0, usersModel_1.getUserByUsername)(username);
        if (existingUser) {
            res.status(404).json({ success: false, message: 'User already exists!' });
            return;
        }
        // const hashedPassword = doHash(password, 12)
        const newUser = new usersModel_1.default({
            ...value,
            // password: (await hashedPassword).toString()
        });
        // const info = await welcomeMessage(username, firstName);
        // if (info === true) console.log('username sent');
        newUser.save().then(() => {
            const token = jsonwebtoken_1.default.sign({
                userId: newUser.id,
                username: newUser.username,
                verified: newUser.verified
            }, process.env.TOKEN_SECRET || '', {
                expiresIn: '7d'
            });
            const Days = (7 * (24 * 3600000)); // 7 Days
            res.status(201).cookie('Authorization', 'Bearer ' + token, { expires: new Date(Date.now() + Days), httpOnly: process.env.NODE_ENV === 'production', secure: process.env.NODE_ENV === 'production' }).send({
                success: true,
                token,
                message: 'Account Created successfully',
                user: { firstName, lastName, username, createdAt: newUser.createdAt }
            });
            return;
        }).catch((e) => {
            console.log(e);
            res.status(500).send({ success: false, message: e.message });
            return;
        });
    }
    catch (e) {
        console.log(e);
        res.status(500).send({ success: false, message: e.message });
        return;
    }
};
exports.signup = signup;
const signin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const { error, value } = validator_1.signinSchema.validate(req.body);
        if (error) {
            res.status(406).json({ success: false, message: error.details[0].message });
            return;
        }
        const existingUser = await (0, usersModel_1.getUserByUsername)(username).select('+password');
        if (!existingUser) {
            res.status(404).json({ success: false, message: 'User does not exists!' });
            return;
        }
        // const result = validateHash(password, existingUser.password)
        const result = password === existingUser.password;
        if (!result) {
            res.status(406).json({ success: false, message: 'Invalid Credentials!' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({
            userId: existingUser.id,
            username: existingUser.username,
            verified: existingUser.verified
        }, process.env.TOKEN_SECRET || '', {
            expiresIn: '3d'
        });
        const Days = (7 * (24 * 3600000)); // 3 Days
        res.status(202).cookie('Authorization', 'Bearer ' + token, { expires: new Date(Date.now() + Days), httpOnly: process.env.NODE_ENV === 'production', secure: process.env.NODE_ENV === 'production' }).send({
            success: true,
            token,
            message: 'Logged In successfully'
        });
        return;
    }
    catch (e) {
        console.log(e);
        res.status(500).send({ success: false, message: e.message });
        return;
    }
};
exports.signin = signin;
const signout = async (req, res) => {
    res.clearCookie('Authorization').status(200).send({ success: true, message: 'Logged Out Successfully' });
};
exports.signout = signout;
const isVerified = async (req, res) => {
    const { username } = req.user;
    try {
        const existingUser = await (0, usersModel_1.getUserByUsername)(username);
        if (!existingUser) {
            res.status(404).json({ success: false, message: 'User does not exists!' });
            return;
        }
        res.status(200).send({ success: true, verified: existingUser.verified });
    }
    catch (e) {
        res.status(500).send({ success: false, message: e.message });
        return;
    }
};
exports.isVerified = isVerified;
const sendVerificationCode = async (req, res) => {
    const { username } = req.user;
    try {
        const existingUser = await (0, usersModel_1.getUserByUsername)(username);
        if (!existingUser) {
            res.status(404).json({ success: false, message: 'User does not exists!' });
            return;
        }
        if (existingUser.verified) {
            res.status(400).json({ success: false, message: 'You are Already Verified!' });
            return;
        }
        const codeValue = Math.floor(Math.random() * 1000000).toString();
        const info = await (0, mailer_1.sendCode)(username, codeValue, existingUser.firstName);
        if (info === true) {
            const hashedCodeValue = (0, hashing_1.hmacProcess)(codeValue, process.env.HMAC_VERIFICATION_CODE_SECRET);
            existingUser.verificationCode = hashedCodeValue;
            existingUser.verificationCodeValidation = Date.now();
            await existingUser.save();
            res.status(201).send({ success: true, message: 'Code Sent!' });
            return;
        }
        res.status(400).send({ success: false, message: 'Code Sent Failed!' });
    }
    catch (e) {
        console.log(e);
        res.status(500).send({ success: false, message: e.message });
        return;
    }
};
exports.sendVerificationCode = sendVerificationCode;
const verifyCode = async (req, res) => {
    const { providedCode } = req.body;
    const { username } = req.user;
    try {
        const { error, value } = validator_1.acceptCodeSchema.validate({ providedCode });
        if (error) {
            res.status(406).json({ success: false, message: error.details[0].message });
            return;
        }
        const codeValue = providedCode.toString();
        const existingUser = await (0, usersModel_1.getUserByUsername)(username).select('+verificationCode +verificationCodeValidation');
        if (!existingUser) {
            res.status(404).json({ success: false, message: 'User does not exists!' });
            return;
        }
        if (existingUser.verified) {
            res.status(400).json({ success: false, message: 'User already verified!' });
            return;
        }
        if (!existingUser.verificationCode || !existingUser.verificationCodeValidation) {
            res.status(500).json({ success: false, message: 'Something Went Wrong!' });
            return;
        }
        if (Date.now() - new Date(existingUser.verificationCodeValidation).getTime() > 10 * 60 * 1000) {
            res.status(408).json({ success: false, message: 'Code Has Been Expired!' });
            return;
        }
        const hashedCodeValue = (0, hashing_1.hmacProcess)(codeValue, process.env.HMAC_VERIFICATION_CODE_SECRET);
        if (hashedCodeValue === existingUser.verificationCode) {
            existingUser.verified = true;
            existingUser.verificationCode = undefined;
            existingUser.verificationCodeValidation = undefined;
            await existingUser.save();
            res.status(202).send({ success: true, message: 'Your account has been verified!' });
            return;
        }
        else if (hashedCodeValue !== existingUser.verificationCode) {
            res.status(406).json({ success: false, message: 'Code is Invalid!' });
            return;
        }
        res.status(500).json({ success: false, message: 'Unexpected occurred!' });
        return;
    }
    catch (e) {
        console.log(e);
        res.status(500).send({ success: false, message: e.message });
        return;
    }
};
exports.verifyCode = verifyCode;
const changePassword = async (req, res) => {
};
exports.changePassword = changePassword;
