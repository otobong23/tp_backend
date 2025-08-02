import Joi from 'joi'

// email: Joi.string().min(6).max(60).required().email({
//   tlds: { allow:[ 'com', 'net' ] }
// }),
//password: Joi.string().required().pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$'))

export const signupSchema = Joi.object({
  firstName: Joi.string().min(2).max(20).required(),
  lastName: Joi.string().min(2).max(20).required(),
  username: Joi.string().min(6).max(60).required(),
  password: Joi.string().required().min(6)
})

export const signinSchema = Joi.object({
  username: Joi.string().min(6).max(60).required(),
  password: Joi.string().required().min(6)
})

export const acceptCodeSchema = Joi.object({
  providedCode: Joi.number().required()
})

export const changePasswordSchema = Joi.object({
  newPassword: Joi.string().required().min(6),
  oldPassword: Joi.string().required().min(6)
})

export const watchlistSchema = Joi.object({
  watchlist: Joi.alternatives().try(
    Joi.array().items(Joi.string()).required(),
    Joi.string().required()
  )
})

export const cryptoLabelSchema = Joi.object({
  cryptoLabel: Joi.alternatives().try(
    Joi.string().valid('ethereum'),
    Joi.string().valid('bitcoin'),
    Joi.string().valid('usd')
  )
});


export const depositDTO = Joi.object({
  amount: Joi.number().required(),
  blockchain: Joi.alternatives().try(
    Joi.string().valid('USDT'),
    Joi.string().valid('BTC'),
    Joi.string().valid('ETH')
  ).required(),
  image: Joi.string().optional()
})

export const withdrawalDTO = Joi.object({
  walletAddress: Joi.string().required(),
  amount: Joi.number().positive().required(),
  blockchain: Joi.alternatives().try(
    Joi.string().valid('USDT'),
    Joi.string().valid('BTC'),
    Joi.string().valid('ETH')
  ).required(),
})

export const pageLimitDTO = Joi.object({
  limit: Joi.number().positive().optional().default(50),
  page: Joi.number().positive().optional().default(1)
})

export const AdminLoginDto = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
})

export const AdminUpdateData = Joi.object({
  username: Joi.string().optional(),
  password: Joi.string().optional(),
  walletAddress: Joi.object({
    BTC: Joi.string().optional(),
    ETH: Joi.string().optional(),
    USDT: Joi.string().optional()
  }).optional(),
});

export const getUserDTO = Joi.object({
  username: Joi.string().required()
})

export const updateUserDTO = Joi.object({
  firstName: Joi.string().optional(),
  lastName: Joi.string().optional(),
  username: Joi.string().optional(),
  verified: Joi.boolean().optional(),
  wallet: Joi.object({
    balance: Joi.number().optional(),
    assetValue: Joi.number().optional(),
    assetLoss: Joi.number().optional(),
    watchList: Joi.array().items(Joi.string()).optional(),
  })
})

export const TransactionDTO = Joi.object({
  status: Joi.string().valid('pending', 'completed', 'failed').required(),
});

export const getTransactionDTO = Joi.object({
  transactionID: Joi.string().required()
})