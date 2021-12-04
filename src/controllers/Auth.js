import { prisma } from '../data/index'
import { genToken } from '~/middlewares/Auth'

export const _getAuth = async (req, res) => {
  const id = req.params.id

  if (!id)
    return res.status(400).json({
      error: 1,
      message: 'ID is required!',
    })

  const verifyId = await prisma.users.findUnique({
    where: {
      id: id,
    },
  })

  if (!verifyId)
    return res.status(404).json({
      error: 1,
      message: 'User with this ID not found.',
    })

  genToken(req, res, id)
}
