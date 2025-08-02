import { Document, Types } from "mongoose"

export interface IUser extends Document {
  firstName: string
  lastName: string
  username: string
  password: string
  verified: boolean
  verificationCode?: string
  verificationCodeValidation?: string | number | Date
  forgotPasswordCode?: string
  forgotPasswordCodeValidation?: string
  wallet: {
    balance: number
    assetValue: number
    watchList: string[]
  }
  createdAt: Date
  updatedAt: Date
}

// Define the transaction interface for TypeScript
export interface ITransaction extends Document {
    userId: Types.ObjectId;
    username: string,
    amount: number;
    blockchain: string;                 // Currency (e.g., USD, ETH)
    image?: string;
    walletAddress?: string;
    type: 'deposit' | 'withdrawal';
    status: 'pending' | 'completed' | 'failed';
    description?: string;
    metadata?: object;                // Optional additional data
    createdAt: Date;                  // Transaction date
    updatedAt: Date;                  // Timestamp for last update
}

export interface IAdmin extends Document {
  username: string
  password: string
  walletAddress: {
    BTC: string
    ETH: string
    USDT: string
  }
}