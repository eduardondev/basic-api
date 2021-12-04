import { Logger } from "~/utils/log"
import { prisma } from "../data/index"
import { encrypt, verify } from "../utils/bcrypt"

export const _getUserLogin = async (req, res, next) => {

  const {
    email,
    password
  } = req.body

  const verifyLogin = await prisma.users.findUnique({
    where: {
      email: email
    }
  })

  if (!verifyLogin) return res.status(404).json({
    error: 1,
    message: "User not found."
  })

  const verifyPass = verify(password, verifyLogin.password)

  if (!verifyPass) return res.status(401).json({
    error: 1,
    message: "Incorrect password."
  })

  console.log(verifyLogin.id)

  return res.redirect(`/auth/${verifyLogin.id}`)

}

export const _postCreateLogin = async (req, res) => {

  try {

    let {
      email,
      username,
      city,
      password,
      district,
      state,
      zip,
      number,
      address
    } = req.body

    if (!email || !username || !city || !password || !district || !state || !zip || !number || !address) return res.status(400).json({
      error: 1,
      message: "Please, verify the sended fields."
    })

    const verifyExists = await prisma.users.findUnique({
      where: {
        email: email
      }
    })

    if (verifyExists) return res.status(400).json({
        error: 1,
        message: "User with this e-mail already exists."
    })

    const encryptedPass = encrypt(password)

    await prisma.users.create({
      data: {
        email: email,
        name: username,
        password: encryptedPass,
        address: address,
        city: city,
        zip: zip,
        number: number,
        district: district,
        state: state
      }
    })

    return res.status(200).json({
      error: 0,
      message: "User created successfully!"
    })

  } catch (err) {

    Logger.error(err)

    return res.status(500).json({
      error: 1,
      message: "Something is wrong. Please, contact us!"
    })

  }
}
