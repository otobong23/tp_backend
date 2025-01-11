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
  username: Joi.string().min(6).max(6).required(),
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
