import { Logger } from '~/utils/log'
import { prisma } from '../data/index'

export const _getShopifyCheck = async (req, res) => {
  try {
    return res.status(200).json({
      error: 0,
      message: 'Ok!',
    })
  } catch (err) {
    Logger.error('Erro em getShopifyReturn')
  }
}

export const _getShopifyCheckout = async (req, res) => {
  try {
    let id = req.params.id

    return res.status(200).json({
      error: 1,
      message: 'Ok!',
      checkoutId: id,
    })
  } catch (err) {
    Logger.error('Erro em getShopifyCheckout')
  }
}

export const _putShopifyUpdateCheckout = async (req, res) => {
  try {
    let id = req.params.id

    return res.status(200).json({
      error: 1,
      message: 'Ok!',
      checkoutId: id,
    })
  } catch (err) {
    Logger.error('Erro em getShopifyCheckout')
  }
}
