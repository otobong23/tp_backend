import mongoose from "mongoose";
import { Model } from "mongoose";
import { IUser } from "types/models.types";


const UserSchema = new mongoose.Schema<IUser>({
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
    balance: {type: Number, required: true, default: 0},
    assetValue: {type: Number, required: true, default: 0},
    assetLoss: {type: Number, required: true, default: 0},
    watchList: {type: [String], required: true, default: []}
  },
},{
  timestamps: true,
})

// ✅ Add static search method
UserSchema.statics.search = function (keyword: string) {
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
const UserModel = mongoose.model<IUser, Model<IUser> & { search: (keyword: string) => Promise<IUser[]> }>('user', UserSchema);
export default UserModel

export const getUsers = () => UserModel.find()
export const getUserByUsername = (username: string) => UserModel.findOne({ username })
export const getUserById = ( id: string ) => UserModel.findById(id)