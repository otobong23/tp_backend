import { config } from "dotenv";
import { AdminLoginDto, AdminUpdateData, getTransactionDTO, getUserDTO, pageLimitDTO, TransactionDTO, updateUserDTO } from "../middlewares/validator";
import AdminModel from "../models/adminModel"
import TransactionModel from "../models/transactionModel";
import UserModel, { getUserByUsername } from "../models/usersModel";
import { Request, Response } from "express"
import jwt from 'jsonwebtoken';
config()

export class AdminFunctions {
   private adminModel: typeof AdminModel;
   private transactionModel: typeof TransactionModel;
   private userModel: typeof UserModel;
   private jwtService: typeof jwt;

   constructor() {
      this.adminModel = AdminModel
      this.transactionModel = TransactionModel
      this.userModel = UserModel
      this.jwtService = jwt
   }

   async login(req: Request, res: Response) {
      const USERNAME = process.env.NODE_MAIL_ADDRESS
      try {
         const { error, value } = AdminLoginDto.validate(req.body);
         if (error) {
            res.status(406).json({ success: false, message: error.details[0].message });
            return;
         }
         const { username, password } = value;
         let existingAdmin = await this.adminModel.findOne();
         if (!existingAdmin) {
            if (USERNAME === username) {
               existingAdmin = new this.adminModel({ username })
               await existingAdmin.save()
            } else {
               res.status(401).json({ success: false, message: 'Invalid credentials' });
               return
            }
         }
         if (existingAdmin?.password !== password.trim() && existingAdmin.username !== username.trim()) {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
            return;
         }
         const token = this.jwtService.sign({
            adminId: existingAdmin?._id,
            username: existingAdmin?.username
         },
            process.env.TOKEN_SECRET || '',
            {
               expiresIn: '30d'
            }
         );
         res.json({
            success: true,
            access_token: token,
            message: 'login successful'
         });
      } catch (e) {
         console.error('[AdminService Error]', e);
         const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred';
         res.status(500).json({ success: false, message: errorMessage })
         return
      }
   }

   async updateAdmin(req: Request, res: Response) {
      const { username } = req.user
      try {
         const { error, value } = AdminUpdateData.validate(req.body);
         if (error) {
            res.status(406).json({ success: false, message: error.details[0].message });
            return;
         }
         const existingAdmin = await this.adminModel.findOneAndUpdate({ username }, value, { new: true })
         if (!existingAdmin) {
            res.status(404).json({ success: false, message: 'Admin does not exists!' })
            return
         }
         res.json({ success: true, message: 'Admin updated successfully', data: { ...existingAdmin.toObject(), ...value, __v: undefined, _id: undefined } })
      } catch (e) {
         console.error('[AdminService Error]', e);
         const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred';
         res.status(500).json({ success: false, message: errorMessage })
         return
      }
   }

   async getAdmin(req: Request, res: Response) {
      const { username } = req.user
      try {
         const existingAdmin = await this.adminModel.findOne({ username })
         if (!existingAdmin) {
            res.status(404).json({ success: false, message: 'Admin does not exists!' })
            return
         }
         res.json({ success: true, message: "Admin gotten successfully", data: { ...existingAdmin.toObject(), __v: undefined, _id: undefined } })
      } catch (e) {
         console.error('[AdminService Error]', e);
         const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred';
         res.status(500).json({ success: false, message: errorMessage })
         return
      }
   }

   async getTotalUsers(req: Request, res: Response) {
      try {
         res.json(await this.userModel.countDocuments())
      } catch (e) {
         console.error('[AdminService Error]', e);
         const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred';
         res.status(500).json({ success: false, message: errorMessage })
         return
      }
   }

   async getAllUsers(req: Request, res: Response) {
      try {
         const { error, value } = pageLimitDTO.validate(req.query);
         if (error) {
            res.status(406).json({ success: false, message: error.details[0].message });
            return;
         }
         let { limit = 50, page = 1 } = value
         limit = Math.max(1, Math.min(limit, 100))
         page = Math.max(1, page)
         const offset = (page - 1) * limit;
         const [users, total] = await Promise.all([
            this.userModel.find().sort({ date: -1 }).skip(offset).limit(limit).exec(),
            this.userModel.countDocuments()
         ]);
         if (!total) {
            res.status(404).json({ success: false, message: 'No User Found!' })
            return
         }
         const totalPages = total === 0 ? 1 : Math.ceil(total / limit);
         res.json({
            success: true, message: 'All Users gotten successfully', data: {
               users,
               page,
               limit,
               total,
               totalPages,
            }
         });
      } catch (e) {
         console.error('[AdminService Error]', e);
         const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred';
         res.status(500).json({ success: false, message: errorMessage })
         return
      }
   }

   async getUser(req: Request, res: Response) {
      try {
         const { error, value } = getUserDTO.validate(req.query);
         if (error) {
            res.status(406).json({ success: false, message: error.details[0].message });
            return;
         }
         const existingUser = await getUserByUsername(value.username);
         if (!existingUser) {
            res.status(404).json({ success: false, message: 'User does not exists!' })
            return
         }
         res.status(200).send({ success: true, message: 'User gotten successfully', data: existingUser })
         return
      } catch (e: any) {
         console.error('[AdminService Error]', e);
         const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred';
         res.status(500).json({ success: false, message: errorMessage })
         return
      }
   }

   async getTransactions(req: Request, res: Response) {
      try {
         const { error, value } = pageLimitDTO.validate(req.body);
         if (error) {
            res.status(406).json({ success: false, message: error.details[0].message });
            return;
         }
         let { limit = 50, page = 1 } = value
         limit = Math.max(1, Math.min(limit, 100))
         page = Math.max(1, page)
         const offset = (page - 1) * limit;
         const [transactions, total] = await Promise.all([
            this.transactionModel.find({ type: { $in: ['withdrawal', 'deposit'] } })
               .sort({ date: -1 })
               .limit(limit)
               .skip(offset)
               .exec(),
            this.transactionModel.countDocuments({ type: { $in: ['withdrawal', 'deposit'] } })
         ]);
         const totalPages = total === 0 ? 1 : Math.ceil(total / limit);
         res.json({
            success: true, message: 'Transactions gotten successfully', data: {
               transactions,
               page,
               limit,
               totalPages,
               total
            }
         });
      } catch (e) {
         console.error('[AdminService Error]', e);
         const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred';
         res.status(500).json({ success: false, message: errorMessage })
         return
      }
   }

   async getUserTransactions(req: Request, res: Response) {
      try {
         const { error: pageError, value: pageValue } = pageLimitDTO.validate(req.body)
         const { error: userError, value: userValue } = getUserDTO.validate(req.query)
         if (pageError || userError) {
            const err = pageError || userError;
            const message = err && err.details && err.details[0] && err.details[0].message ? err.details[0].message : 'Invalid request';
            res.status(406).json({ success: false, message })
            return
         }
         let { limit = 50, page = 1 } = pageValue
         limit = Math.max(1, Math.min(limit, 100))
         page = Math.max(1, page)
         const offset = (page - 1) * limit;

         const username = userValue.username;
         const existingUser = await getUserByUsername(username)
         if (!existingUser) {
            res.status(404).json({ success: false, message: 'User does not exists!' })
            return
         }

         const transactions = await TransactionModel
            .find({ username })
            .sort({ date: -1 })
            .limit(limit)
            .skip(offset)
            .exec();

         const total = await TransactionModel.countDocuments({ username })
         const totalPages = total === 0 ? 1 : Math.ceil(total / limit);

         res.status(200).json({
            message: 'Transactions Gotten Successfully', success: true, data: {
               transactions,
               page,
               total,
               totalPages,
               user: {
                  username: existingUser.username,
                  balance: existingUser.wallet.balance,
               },
            }
         })
         return
      } catch (e) {
         console.error('[AdminService Error]', e);
         const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred';
         res.status(500).json({ success: false, message: errorMessage })
         return
      }
   }

   async updateUser(req: Request, res: Response) {
      try {
         const { error: bodyError, value: bodyValue } = updateUserDTO.validate(req.body)
         const { error, value } = getUserDTO.validate(req.query)
         if (bodyError || error) {
            const err = bodyError || error;
            const message = err && err.details && err.details[0] && err.details[0].message ? err.details[0].message : 'Invalid request';
            res.status(406).json({ success: false, message })
            return
         }
         const { username } = value
         const existingUser = await this.userModel.findOneAndUpdate({ username }, bodyValue, { new: true })
         if (!existingUser) {
            res.status(404).json({ success: false, message: 'User does not exists!' })
            return
         }
         res.json({ message: "user's information updated successfully", success: true, data: { ...existingUser.toObject(), ...bodyValue, password: undefined, __v: undefined, _id: undefined } })
      } catch (e) {
         console.error('[AdminService Error]', e);
         const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred';
         res.status(500).json({ success: false, message: errorMessage })
         return
      }
   }

   async deleteUser(req: Request, res: Response) {
      try {
         const { error, value } = getUserDTO.validate(req.query)
         if (error) {
            res.status(406).json({ success: false, message: error.details[0].message });
            return;
         }
         const existingUser = await this.userModel.findOneAndDelete({ username: value.username });
         if (!existingUser) {
            res.status(404).json({ success: false, message: 'User does not exists!' })
            return
         }
         res.json({ message: "user deleted successfully", success: true, data: { ...existingUser.toObject(), password: undefined, __v: undefined, _id: undefined } })
      } catch (e) {
         console.error('[AdminService Error]', e);
         const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred';
         res.status(500).json({ success: false, message: errorMessage })
         return
      }
   }

   async updateTransaction(req: Request, res: Response) {
      try {
         // email: string, transactionID: string, updateData: UpdateTransactionDto
         const { error: updateDataError, value: updateData } = TransactionDTO.validate(req.body)
         const { error: queryError, value: query } = getTransactionDTO.validate(req.query)
         if (updateDataError || queryError) {
            const err = updateDataError || queryError;
            const message = err && err.details && err.details[0] && err.details[0].message ? err.details[0].message : 'Invalid request';
            res.status(406).json({ success: false, message })
            return
         }
         const { transactionID } = query

         const transaction = await this.transactionModel.findOne({ _id: transactionID });

         if (!transaction) {
            res.status(404).json({ success: false, message: 'Transaction not found or not authorized' })
            return
         }

         const existingUser = await this.userModel.findOne({ username: transaction.username });
         if (!existingUser) {
            res.status(404).json({ success: false, message: 'User does not exists!' })
            return
         }
         if (transaction.status !== 'pending') {
            res.status(406).json({ success: false, message: 'Only pending transactions can be updated!' })
            return
         }

         const isNowCompleted = updateData.status === 'completed';
         transaction.status = updateData.status;
         if (transaction.image) {
            transaction.image = '';
         }
         if (updateData.status === 'failed') {
            if (transaction.type === 'withdrawal') {
               existingUser.wallet.balance += transaction.amount;
               await existingUser.save()
            }
            await transaction.save();
            res.json({ message: "Transaction updated successfully", success: true, data: transaction })
            return
         }
         if (isNowCompleted) {
            // if (typeof updateData.amount !== 'number' || !updateData.action) {
            //    res.status(406).json({ success: false, message: 'Amount and action are required when completing a transaction!' })
            //    return
            // }
            if (transaction.type === 'deposit') {
               existingUser.wallet.balance += transaction.amount;
               await existingUser.save()
            }
         }

         await transaction.save();
         res.json({ message: "Transaction updated successfully", success: true, data: transaction })
         return
      } catch (e) {
         console.error('[AdminService Error]', e);
         const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred';
         res.status(500).json({ success: false, message: errorMessage })
         return
      }
   }

   async deleteTransaction(req: Request, res: Response) {
      try {
         const { error, value } = TransactionDTO.validate(req.query)
         if (error) {
            res.status(406).json({ success: false, message: error.details[0].message });
            return;
         }
         const { transactionID } = value
         const existingTransaction = await this.transactionModel.findByIdAndDelete(transactionID)
         if (!existingTransaction) {
            res.status(404).json({ success: false, message: 'transaction does not exists!' })
            return
         }
         res.json({ message: "transaction deleted successfully", success: true, data: { ...existingTransaction.toObject(), __v: undefined, _id: undefined } })
      } catch (e) {
         console.error('[AdminService Error]', e);
         const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred';
         res.status(500).json({ success: false, message: errorMessage })
         return
      }
   }

   async searchUsers(req: Request, res: Response) {
      try {
         const keyword = req.query.keyword as string;

         if (!keyword) {
            res.status(400).json({ success: false, message: 'Search keyword is required' });
            return
         }

         const users = await UserModel.search(keyword);

         res.status(200).json({ message: "users found successfully", success: true, data: users });
         return
      } catch (e) {
         console.error('[AdminService Error]', e);
         const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred';
         res.status(500).json({ success: false, message: errorMessage })
         return
      }
   };

   async globalData(req: Request, res: Response) {
      try {
         const existingAdmin = await this.adminModel.findOne()
         if (!existingAdmin) {
            res.status(404).json({ success: false, message: 'Admin does not exists!' })
            return
         }
         const adminData = existingAdmin.toObject()
         res.json({ success: true, message: "Admin Global data gotten successfully", data: adminData.walletAddress })
         return
      } catch (e) {
         console.error('[AdminService Error]', e);
         const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred';
         res.status(500).json({ success: false, message: errorMessage })
         return
      }
   }
}

const AdminService = new AdminFunctions()

export default AdminService