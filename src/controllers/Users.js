import { Logger } from "~/utils/log"
import { prisma } from "../data/index"

export const _getAllUsers = async (req, res) => {

  try {

    const data = await prisma.users.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        address: true,
        number: true,
        city: true,
        state: true,
        district: true,
        zip: true,
        active: true
      }
    })

    return res.status(200).json(data)

  } catch (err) {

    Logger.error(err)

    return res.status(500).json({
      error: 1,
      message: "Something is wrong. Please, contact us!"
    })

  }
}

export const _getUniqueUser = async (req, res) => {

  try {

    let id = req.params.id

    const verifyUser = await prisma.users.findUnique({
      where: {
        id: id
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
        address: true,
        number: true,
        city: true,
        state: true,
        district: true,
        zip: true,
        active: true
      }
    })

    if (!verifyUser) return res.status(404).json({
        error: 1,
        message: "User not found."
    })

    return res.status(200).json(verifyUser)

  } catch (err) {
    Logger.error(err)

    return res.status(500).json({
      error: 1,
      message: "Something is wrong. Please, contact us!"
    })

  }
}

export const _updateUniqueUser = async (req, res) => {

  let {
    name,
    createdAt,
    address,
    number,
    city,
    state,
    district,
    zip,
    active,
  } = req.body

  const verifyUser = await prisma.users.findUnique({
    where: {
      id: req.logged.user
    }
  })

  if (!verifyUser) return res.status(404).json({
    error: 1,
    message: "User not found."
  })

  // ,
  //   select: {
  //     id: true,
  //     name: true,
  //     createdAt: true,
  //     address: true,
  //     number: true,
  //     city: true,
  //     state: true,
  //     district: true,
  //     zip: true,
  //     active: true
  //   }

  if (!verifyUser) return res.status(404).json({
      error: 1,
      message: "User not found."
  })

  return res.status(200).json(verifyUser)

}
