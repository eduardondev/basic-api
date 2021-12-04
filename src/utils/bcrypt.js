import bcrypt from 'bcryptjs'
import { Logger } from './log'

export const encrypt = (string) => {

  if (!string) return Logger.error('Dont receive string to hash on create')

  let salt = bcrypt.genSaltSync(10)
  let hash = bcrypt.hashSync(string, salt)

  return hash
}

export const verify = (pass, hash) => {

  if (!pass) return Logger.error('Dont receive string to verify on create')

  let verify = bcrypt.compareSync(pass, hash)

  return verify

}
