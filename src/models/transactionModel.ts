import mongoose, { Schema } from 'mongoose'
import { ITransaction } from 'types/models.types';

// Define the transaction schema
const TransactionSchema: Schema<ITransaction> = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    amount: { type: Number, required: true },
    blockchain: { type: String, required: true, default: 'USD' },
    type: { type: String, enum: ['credit', 'debit'], required: true },
    status: { type: String, enum: ['pending', 'completed', 'failed'], required: true, default: 'pending' },
    description: { type: String, trim: true },
    metadata: { type: Object },
}, {
    timestamps: true,
});


// Create and export the model
const TransactionModel = mongoose.model<ITransaction>('Transaction', TransactionSchema);
export default TransactionModel

export const getTransactionById = (id: string) => TransactionModel.findById(id)