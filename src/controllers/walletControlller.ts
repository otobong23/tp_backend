import { Request, Response } from "express";
import { getUserByUsername } from "../models/usersModel";
import { cryptoLabelSchema, watchlistSchema } from "../middlewares/validator";
import getCryptoToUsdtRate from "../helpers/getCryptoToUsdtRate";


export const getWallet = async (req: Request, res: Response) => {
  const { username } = req.user
  try {
    const existingUser: any = await getUserByUsername(username);
    if (!existingUser) {
      res.status(404).json({ success: false, message: 'User does not exists!' })
      return
    }
    res.status(200).send({ success: true, wallet: existingUser.wallet })
  } catch (e: any) {
    console.log(e)
    res.status(500).send(e.message)
  }
}

export const addToWatchlist = async (req: Request, res: Response) => {
  const { watchlist } = req.body
  const { username } = req.user
  try {
    const { error, value } = watchlistSchema.validate({ watchlist })
    if (error) {
      res.status(406).json({ success: false, message: "From Validator: "+error.details[0].message })
      return
    }
    const existingUser = await getUserByUsername(username);
    if (!existingUser) {
      res.status(404).json({ success: false, message: 'User does not exists!' })
      return
    }
    const itemsToAdd = Array.isArray(watchlist) ? watchlist : [watchlist];
    existingUser.wallet?.watchList.push(...itemsToAdd);

    await existingUser.save().then(() => {
      res.status(200).send({ success: true, watchlist: existingUser.wallet?.watchList})
      return
    }).catch((e:any) => {
      res.status(500).send({ success: false, message: `failed to save user's watchlist data, Error: ${e.message}` })
      return
    })
  } catch (e:any) {
    console.log(e)
    res.status(500).send(e.message)
    return
  }
}

export const getUser = async (req:Request, res:Response) => {
  const { username } = req.user
  try {
    const existingUser = await getUserByUsername(username);
    if (!existingUser) {
      res.status(404).json({ success: false, message: 'User does not exists!' })
      return
    }
    res.status(200).send({ success: true, user: existingUser })
    return
  } catch (e:any) {
    console.log(e)
    res.status(500).send(e.message)
    return
  }
}

export const getUsdtRate = async (req:Request, res:Response) => {
  const { cryptoLabel } = req.body
  try {
    const { error, value } = cryptoLabelSchema.validate({ cryptoLabel })
    if (error) {
      res.status(406).json({ success: false, message: "From Validator: "+error.details[0].message })
      return
    }
    const cryptoToUsdtRate = await getCryptoToUsdtRate(cryptoLabel);
    res.status(200).send({success: true, value: cryptoToUsdtRate})
  } catch (e:any) {
    console.log(e)
    res.status(500).send(e.message)
    return
  }
}