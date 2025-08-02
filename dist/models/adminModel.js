"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAdmin = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AdminSchema = new mongoose_1.default.Schema({
    username: { type: String, require: [true, 'username field is required!'], lowercase: true, unique: true },
    password: { type: String, require: [true, 'password is required!'], select: false, trim: true, default: 'admin123' },
    walletAddress: {
        BTC: { type: String, required: true, default: '1NDHZtXsy1QPRt4sro23agUcFX1vqaWSGG' },
        ETH: { type: String, required: true, default: '0xc92adc6fa9dc7d1aa8cbb10e2250f29f84669139' },
        USDT: { type: String, required: true, default: 'TEZdBcxRZpMw4yJtA9RVTX8WyiCtXCzLzd' }
    },
}, {
    timestamps: true,
});
const AdminModel = mongoose_1.default.model('admin', AdminSchema);
exports.default = AdminModel;
const getAdmin = () => AdminModel.findOne();
exports.getAdmin = getAdmin;
