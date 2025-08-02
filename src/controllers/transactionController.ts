import axios from "axios";
import Web3 from "web3";
// import { TronWeb } from "tronweb";
import { Request, Response } from "express"
import TransactionModel from "../models/transactionModel"
import getCryptoToUsdtRate from "../helpers/getCryptoToUsdtRate";
import { getUserByUsername } from "../models/usersModel";
import { depositDTO, pageLimitDTO, withdrawalDTO } from "../middlewares/validator";

const INFURA_PROJECT_URL = `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`!
const BITCOIN_API_URL = "https://blockstream.info/api"!
const TRON_NODE_URL = "https://api.trongrid.io"

const RECIEVER_BTC_ADDRESS = '1NDHZtXsy1QPRt4sro23agUcFX1vqaWSGG'!
const RECIEVER_ETH_ADDRESS = '0xc92adc6fa9dc7d1aa8cbb10e2250f29f84669139'!.toString()
const RECIEVER_USDT_ADDRESS = 'TEZdBcxRZpMw4yJtA9RVTX8WyiCtXCzLzd'!


// Initialize blockchain libraries
const web3 = new Web3(new Web3.providers.HttpProvider(INFURA_PROJECT_URL));
// const tronWeb = new TronWeb({
//     fullHost: TRON_NODE_URL,
//     headers: { 'TRON-PRO-API-KEY': process.env.TRON_GRID },
// });

// Endpoint for listening to Ethereum transactions
// export const ethListen = async (req: Request, res: Response) => {
//     const { username } = req.user;

//     try {
//         const existingUser: any = await getUserByUsername(username);
//         if (!existingUser) {
//             res.status(404).json({ success: false, message: 'User does not exist!' });
//             return
//         }

//         const latestBlock = await web3.eth.getBlock("latest", true);
//         const ethToUsdtRate = await getCryptoToUsdtRate("ethereum");

//         const transactions = latestBlock.transactions
//             .filter((tx: any) => (tx.to?.toLowerCase() === RECIEVER_ETH_ADDRESS.toLowerCase() || tx.to === undefined))
//             .map((tx: any) => {
//                 const ethValue = web3.utils.fromWei(tx.value, "ether");
//                 return {
//                     hash: tx.hash,
//                     to: tx.to,
//                     ethValue,
//                     usdtValue: (parseFloat(ethValue) * ethToUsdtRate).toFixed(2),
//                 };
//             });

//         if (transactions.length === 0) {
//             res.status(404).json({ success: false, message: "No transactions found for the Ethereum wallet." });
//             return
//         }

//         existingUser.wallet.balance += transactions[0].usdtValue
//         const newTransaction = new TransactionModel({
//             userId: existingUser._id,
//             amount: transactions[0].usdtValue,
//             blockchain: 'USDT',
//             type: 'credit',
//             status: 'completed',
//             description: 'Account Deposit',
//         });

//         // Save both user and transaction data
//         await Promise.all([existingUser.save(), newTransaction.save()]);

//         res.status(201).json({
//             success: true,
//             message: 'Deposit has been made successfully',
//             newTransaction,
//         });
//         return
//     } catch (error) {
//         console.error("Error fetching Ethereum transactions:", error);
//         res.status(500).json({
//             success: false,
//             message: "Failed to fetch Ethereum transactions.",
//         });
//         return
//     }
// };



// // Endpoint for listening to Bitcoin transactions
// export const btcListen = async (req: Request, res: Response) => {
//     const { username } = req.user;

//     try {
//         const existingUser: any = await getUserByUsername(username);
//         if (!existingUser) {
//             res.status(404).json({ success: false, message: 'User does not exist!' });
//             return
//         }

//         const btcToUsdtRate = await getCryptoToUsdtRate("bitcoin");
//         const response = await axios.get(`${BITCOIN_API_URL}/address/${RECIEVER_BTC_ADDRESS}/txs`);

//         const transactions = response.data
//             .map((tx: any) => {
//                 const btcValue = tx.vout
//                     .filter((out: any) => out.addr === RECIEVER_BTC_ADDRESS)
//                     .reduce((sum: number, out: any) => sum + out.value, 0);

//                 return {
//                     txid: tx.txid,
//                     btcValue: btcValue.toFixed(8),
//                     usdtValue: (btcValue * btcToUsdtRate).toFixed(2),
//                 };
//             })
//             .filter((tx: any) => parseFloat(tx.btcValue) > 0); // Exclude transactions with zero BTC value

//         if (transactions.length === 0) {
//             res.status(404).json({ success: false, message: "No transactions found for the Bitcoin wallet." });
//             return
//         }

//         existingUser.wallet.balance += transactions[0].usdtValue
// const newTransaction = new TransactionModel({
//     userId: existingUser._id,
//     amount: transactions[0].usdtValue,
//     blockchain: 'USDT',
//     type: 'credit',
//     status: 'completed',
//     description: 'Account Deposit',
// });

//         // Save both user and transaction data
//         await Promise.all([existingUser.save(), newTransaction.save()]);

//         res.status(201).json({
//             success: true,
//             message: 'Deposit has been made successfully',
//             newTransaction,
//         });
//         return
//     } catch (error) {
//         console.error("Error fetching Bitcoin transactions:", error);
//         res.status(500).json({
//             success: false,
//             message: "Failed to fetch Bitcoin transactions.",
//         });
//         return
//     }
// };



// // Endpoint for listening to TRC20 transactions
// export const usdtListen = async (req: Request, res: Response) => {
//     const { username } = req.user;
//     try {
//         const existingUser: any = await getUserByUsername(username);
//         if (!existingUser) {
//             res.status(404).json({ success: false, message: 'User does not exist!' });
//             return
//         }

//         const options = { method: 'GET', headers: { accept: 'application/json' } };
//         const response = await axios.get(
//             `https://api.shasta.trongrid.io/v1/accounts/${RECIEVER_USDT_ADDRESS}`,
//             options
//         );

//         const transactions = response.data.data;
//         if (!transactions || transactions.length === 0) {
//             res.status(404).json({ success: false, message: "No transactions found for the TRC20 wallet." });
//             return
//         }

//         // Assuming the first transaction is the most relevant
//         const latestTransaction = transactions[0];
//         existingUser.wallet.balance += latestTransaction.amount;

//         const newTransaction = new TransactionModel({
//             userId: existingUser._id,
//             amount: latestTransaction.amount,
//             blockchain: 'USDT',
//             type: 'credit',
//             status: 'completed',
//             description: 'Account Deposit',
//         });

//         // Save both user and transaction data
//         await Promise.all([existingUser.save(), newTransaction.save()]);

//         res.status(200).json({
//             success: true,
//             message: 'Deposit has been made successfully',
//             newTransaction,
//         });
//         return 
//     } catch (error: any) {
//         console.error("Error fetching TRC20 transactions:", error.message);
//         res.status(500).json({
//             success: false,
//             message: "Failed to fetch TRC20 transactions.",
//         });
//         return
//     }
// };

export async function deposit(req: Request, res: Response) {
    const { username } = req.user
    try {
        const {error, value} = depositDTO.validate(req.body)
        if (error) {
            res.status(406).json({ success: false, message: error.details[0].message })
            return
        }
        const { amount, blockchain, image } = value
        const existingUser: any = await getUserByUsername(username)
        if (!existingUser) {
            res.status(404).json({ success: false, message: 'User does not exists!' })
            return
        }
        const newTransaction = new TransactionModel({
            userId: existingUser._id,
            username,
            amount,
            blockchain,
            image,
            type: 'deposit',
            status: 'pending',
            description: 'Account Deposit',
        });

        await newTransaction.save();
        //   const mailSent = await sendMail(to, existingUser.email, Number(amount), newTransaction._id.toString(), 'deposit')
        //   if (!mailSent) {
        //     res.status(500).send({ success: false, message: 'Failed to send Review email' })
        //     return
        //   }
        res.status(200).json({ message: 'Deposit request submitted successfully', success: true, data: newTransaction })
        return
    } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred';
        res.status(500).send({ success: false, message: errorMessage })
        return
    }
}

export default async function withdraw(req: Request, res: Response) {
    const { username } = req.user
    try {
        const { error, value } = withdrawalDTO.validate(req.body)
        if (error) {
            res.status(406).json({ success: false, message: error.details[0].message })
            return
        }
        const { amount, blockchain } = value
        const existingUser = await getUserByUsername(username)
        if (!existingUser) {
            res.status(404).json({ success: false, message: 'User does not exists!' })
            return
        }
        if (existingUser.wallet.balance < amount) {
            res.status(406).json({ success: false, message: 'Insufficient balance for withdrawal' })
            return
        }
        existingUser.wallet.balance -= amount;
        const newTransaction = new TransactionModel({
            userId: existingUser._id,
            username,
            amount,
            blockchain,
            image: '',
            walletAddress: value.walletAddress ? value.walletAddress : '',
            type: 'withdrawal',
            status: 'pending',
            description: 'Account withdrawal',
        });
        await newTransaction.save();
        //   const mailSent = await sendMail(to, existingUser.email, Number(amount), newTransaction._id.toString(), 'deposit')
        //   if (!mailSent) {
        //     res.status(500).send({ success: false, message: 'Failed to send Review email' })
        //     return
        //   }

        await existingUser.save();
        res.status(200).json({ message: 'Withdrawal request submitted successfully', success: true, data:newTransaction })
        return
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred';
        res.status(500).send({ success: false, message: errorMessage })
        return
    }
}

export async function getTransactionHistory(req: Request, res: Response) {
    const { username } = req.user
    try {
        const { error, value } = pageLimitDTO.validate(req.body)
        if (error) {
            res.status(406).json({ success: false, message: error.details[0].message })
            return
        }
        let { limit = 50, page = 1 } = value
        limit = Math.max(1, Math.min(limit, 100))
        page = Math.max(1, page)
        const offset = (page - 1) * limit;

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

        res.status(200).json({ message: "Transaction History Gotten successfully", success: true, data: {
            transactions,
            page,
            total,
            limit,
            totalPages,
            user: {
                username: existingUser.username,
                balance: existingUser.wallet.balance,
            },
        }})
        return
    } catch (e) {
        const errorMessage = e instanceof Error ? e.message : 'An unexpected error occurred';
        res.status(500).send({ success: false, message: errorMessage })
        return
    }
}