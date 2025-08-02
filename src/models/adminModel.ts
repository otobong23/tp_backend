import mongoose from "mongoose";
import { IAdmin } from "types/models.types";


const AdminSchema = new mongoose.Schema<IAdmin>({
   username: { type: String, require: [true, 'username field is required!'], lowercase: true, unique: true },
   password: { type: String, require: [true, 'password is required!'], select: false, trim: true, default: 'admin123' },
   walletAddress: {
      BTC: { type: String, required: true, default: '1NDHZtXsy1QPRt4sro23agUcFX1vqaWSGG' },
      ETH: { type: String, required: true, default: '0xc92adc6fa9dc7d1aa8cbb10e2250f29f84669139' },
      USDT: { type: String, required: true, default: 'TEZdBcxRZpMw4yJtA9RVTX8WyiCtXCzLzd' }
   },
}, {
   timestamps: true,
})

const AdminModel = mongoose.model('admin', AdminSchema)
export default AdminModel

export const getAdmin = () => AdminModel.findOne()