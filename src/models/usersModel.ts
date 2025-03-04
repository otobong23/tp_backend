import mongoose from "mongoose";
import { IUser } from "types/models.types";


const UserSchema = new mongoose.Schema<IUser>({
  firstName: { type: String, require: [true, 'first name is required!'] },
  lastName: { type: String, require: [true, 'last name is required!'] },
  username: { type: String, require: [true, 'username field is required!'], lowercase: true, unique: true },
  password: { type: String, require: [true, 'password is required!'], select: false, trim: true },
  verified: { type: Boolean, default: false },
  verificationCode: { type: String, select: false },
  verificationCodeValidation: { type: String || Number || Date, select: false },
  forgotPasswordCode: { type: String, select: false },
  forgotPasswordCodeValidation: { type: String, select: false },
  wallet: {
    balance: {type: Number, required: true, default: 0},
    assetValue: {type: Number, required: true, default: 0},
    watchList: {type: [String], required: true, default: []}
  },
},{
  timestamps: true,
})

const UserModel = mongoose.model('user', UserSchema)
export default UserModel

export const getUsers = () => UserModel.find()
export const getUserByUsername = (username: string) => UserModel.findOne({ username })
export const getUserById = ( id: string ) => UserModel.findById(id)