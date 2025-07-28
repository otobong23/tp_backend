// import {hash, compare} from 'bcrypt'
// import { createHmac } from 'crypto'

// const doHash = (value:string | Buffer, saltValue: string | number) => hash(value, saltValue)
// export const validateHash = (value:string | Buffer, hash:string) => compare(value, hash)
// export const hmacProcess = (value: any, key: any) => createHmac('sha256',key).update(value).digest('hex')
// export default doHash

import bcrypt from 'bcryptjs'
import { createHmac } from 'crypto'

const doHash = (value: string | Buffer, saltRounds: string | number) => {
  // bcryptjs only works with string, not Buffer
  const valueStr = typeof value === 'string' ? value : value.toString()
  return bcrypt.hash(valueStr, Number(saltRounds))
}

export const validateHash = (value: string | Buffer, hashed: string) => {
  const valueStr = typeof value === 'string' ? value : value.toString()
  return bcrypt.compare(valueStr, hashed)
}

export const hmacProcess = (value: any, key: any) =>
  createHmac('sha256', key).update(value).digest('hex')

export default doHash
