"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.getUserByUsername = exports.getUsers = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    firstName: { type: String, required: [true, 'first name is required!'] },
    lastName: { type: String, required: [true, 'last name is required!'] },
    username: { type: String, required: [true, 'username field is required!'], lowercase: true, unique: true },
    password: { type: String, required: [true, 'password is required!'], select: false, trim: true },
    verified: { type: Boolean, default: false },
    verificationCode: { type: String, select: false },
    verificationCodeValidation: { type: String || Number || Date, select: false },
    forgotPasswordCode: { type: String, select: false },
    forgotPasswordCodeValidation: { type: String, select: false },
    wallet: {
        balance: { type: Number, required: true, default: 0 },
        assetValue: { type: Number, required: true, default: 0 },
        assetLoss: { type: Number, required: true, default: 0 },
        watchList: { type: [String], required: true, default: [] }
    },
}, {
    timestamps: true,
});
// ✅ Add static search method
UserSchema.statics.search = function (keyword) {
    const regex = new RegExp(keyword, 'i'); // case-insensitive
    return this.find({
        $or: [
            { username: regex },
            { firstName: regex },
            { lastName: regex },
        ]
    });
};
// Define the model
const UserModel = mongoose_1.default.model('user', UserSchema);
exports.default = UserModel;
const getUsers = () => UserModel.find();
exports.getUsers = getUsers;
const getUserByUsername = (username) => UserModel.findOne({ username });
exports.getUserByUsername = getUserByUsername;
const getUserById = (id) => UserModel.findById(id);
exports.getUserById = getUserById;
