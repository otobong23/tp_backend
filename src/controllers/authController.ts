import { Request, Response } from "express"
import { acceptCodeSchema, signinSchema, signupSchema } from "../middlewares/validator"
import UserModel, { getUserByUsername } from "../models/usersModel"
import doHash, { hmacProcess, validateHash } from "../helpers/hashing"
import jwt from 'jsonwebtoken';
import { sendCode, welcomeMessage } from "../middlewares/mailer"


export const signup = async (req: Request, res: Response) => {
  const { username, password, firstName, lastName } = req.body
  try {
    const { error, value } = signupSchema.validate(req.body);
    if (error) {
      res.status(406).json({ success: false, message: error.details[0].message })
      return
    }

    const existingUser = await getUserByUsername(username)
    if (existingUser) {
      res.status(404).json({ success: false, message: 'User already exists!' })
      return
    }

    // const hashedPassword = doHash(password, 12)

    const newUser = new UserModel({
      ...value,
      // password: (await hashedPassword).toString()
    })
    // const info = await welcomeMessage(username, firstName);
    // if (info === true) console.log('username sent');
    newUser.save().then(() => {
      const token = jwt.sign({
        userId: newUser.id,
        username: newUser.username,
        verified: newUser.verified
      },
        process.env.TOKEN_SECRET || '',
        {
          expiresIn: '3d'
        }
      );
      const Days = (3 * (24 * 3600000));     // 3 Days
      res.status(201).cookie('Authorization', 'Bearer ' + token, { expires: new Date(Date.now() + Days), httpOnly: process.env.NODE_ENV === 'production', secure: process.env.NODE_ENV === 'production' }).send({
        success: true,
        token,
        message: 'Account Created successfully',
        user: { firstName, lastName, username, createdAt: newUser.createdAt }
      })
      return
    }).catch((e: Error) => {
      console.log(e)
      res.status(500).send({ success: false, message: e.message })
      return
    })
  } catch (e: any) {
    console.log(e)
    res.status(500).send({ success: false, message: e.message })
    return
  }
}

export const signin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body
    const { error, value } = signinSchema.validate(req.body)
    if (error) {
      res.status(406).json({ success: false, message: error.details[0].message })
      return
    }
    const existingUser = await getUserByUsername(username).select('+password')
    if (!existingUser) {
      res.status(404).json({ success: false, message: 'User does not exists!' })
      return
    }
    // const result = validateHash(password, existingUser.password)
    const result = password === existingUser.password
    if (!result) {
      res.status(406).json({ success: false, message: 'Invalid Credentials!' })
      return
    }
    const token = jwt.sign({
      userId: existingUser.id,
      username: existingUser.username,
      verified: existingUser.verified
    },
      process.env.TOKEN_SECRET || '',
      {
        expiresIn: '3d'
      }
    );
    const Days = (3 * (24 * 3600000));     // 3 Days
    res.status(202).cookie('Authorization', 'Bearer ' + token, { expires: new Date(Date.now() + Days), httpOnly: process.env.NODE_ENV === 'production', secure: process.env.NODE_ENV === 'production' }).send({
      success: true,
      token,
      message: 'Logged In successfully'
    })
    return
  } catch (e: any) {
    console.log(e)
    res.status(500).send({ success: false, message: e.message })
    return
  }
}

export const signout = async (req: Request, res: Response) => {
  res.clearCookie('Authorization').status(200).send({ success: true, message: 'Logged Out Successfully' })
}

export const isVerified = async (req: Request, res: Response) => {
  const { username } = req.user
  try {
    const existingUser = await getUserByUsername(username);
    if (!existingUser) {
      res.status(404).json({ success: false, message: 'User does not exists!' })
      return
    }
    res.status(200).send({ success: true, verified: existingUser.verified })
  } catch (e: any) {
    res.status(500).send({ success: false, message: e.message })
    return
  }
}


export const sendVerificationCode = async (req: Request, res: Response) => {
  const { username } = req.user
  try {
    const existingUser = await getUserByUsername(username);
    if (!existingUser) {
      res.status(404).json({ success: false, message: 'User does not exists!' })
      return
    }
    if (existingUser.verified) {
      res.status(400).json({ success: false, message: 'You are Already Verified!' })
      return
    }
    const codeValue = Math.floor(Math.random() * 1000000).toString();
    const info = await sendCode(username, codeValue, existingUser.firstName)
    if (info === true) {
      const hashedCodeValue = hmacProcess(codeValue, process.env.HMAC_VERIFICATION_CODE_SECRET);
      existingUser.verificationCode = hashedCodeValue
      existingUser.verificationCodeValidation = Date.now()
      await existingUser.save()
      res.status(201).send({ success: true, message: 'Code Sent!' })
      return
    }
    res.status(400).send({ success: false, message: 'Code Sent Failed!' })
  } catch (e: any) {
    console.log(e)
    res.status(500).send({ success: false, message: e.message })
    return
  }
}

export const verifyCode = async (req: Request, res: Response) => {
  const { providedCode } = req.body
  const { username } = req.user
  try {
    const { error, value } = acceptCodeSchema.validate({ providedCode })
    if (error) {
      res.status(406).json({ success: false, message: error.details[0].message })
      return
    }
    const codeValue = providedCode.toString()
    const existingUser = await getUserByUsername(username).select('+verificationCode +verificationCodeValidation');
    if (!existingUser) {
      res.status(404).json({ success: false, message: 'User does not exists!' })
      return
    }
    if (existingUser.verified) {
      res.status(400).json({ success: false, message: 'User already verified!' })
      return
    }
    if (!existingUser.verificationCode || !existingUser.verificationCodeValidation) {
      res.status(500).json({ success: false, message: 'Something Went Wrong!' })
      return
    }
    if (Date.now() - new Date(existingUser.verificationCodeValidation).getTime() > 10 * 60 * 1000) {
      res.status(408).json({ success: false, message: 'Code Has Been Expired!' })
      return
    }
    const hashedCodeValue = hmacProcess(codeValue, process.env.HMAC_VERIFICATION_CODE_SECRET)

    if (hashedCodeValue === existingUser.verificationCode) {
      existingUser.verified = true
      existingUser.verificationCode = undefined
      existingUser.verificationCodeValidation = undefined
      await existingUser.save()
      res.status(202).send({ success: true, message: 'Your account has been verified!' })
      return
    } else if (hashedCodeValue !== existingUser.verificationCode) {
      res.status(406).json({ success: false, message: 'Code is Invalid!' })
      return
    }
    res.status(500).json({ success: false, message: 'Unexpected occurred!' })
    return
  } catch (e: any) {
    console.log(e)
    res.status(500).send({ success: false, message: e.message })
    return
  }
}

export const changePassword = async (req: Request, res: Response) => {
}