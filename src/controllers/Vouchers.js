import { Logger } from "~/utils/log"
import { prisma } from "../data/index"

export const _getAllVouchers = async (req, res) => {

  const vouchers = await prisma.vouchers.findMany({
    where: {
      userId: req.logged.user
    },
    select: {
      id: true,
      createdAt: true,
      code: true,
      value: true,
      duration: true,
      rules: true,
      active: true
    }
  })

  return res.status(200).json({
    error: 0,
    vouchers: vouchers
  })

}

export const _getCodeVoucher = async (req, res) => {

  let code = req.params.code

  if (!code) return res.status(400).json({
    error: 1,
    message: "Voucher code is missing."
  })

  let voucher = await prisma.vouchers.findMany({
    where: {
      userId: req.logged.user,
      code: code
    },
    select: {
      id: true,
      createdAt: true,
      code: true,
      value: true,
      duration: true,
      rules: true,
      active: true
    }
  })

  if (!voucher) return res.status(400).json({
    error: 1,
    message: "Not exists vouchers with this code."
  })

  return res.status(200).json({
    error: 0,
    voucher: voucher
  })

}

export const _getIdVoucher = async (req, res) => {

  let voucherId = req.params.voucherId

  if (!voucherId) return res.status(400).json({
    error: 1,
    message: "Voucher ID is missing."
  })

  let voucher = await prisma.vouchers.findMany({
    where: {
      userId: req.logged.user,
      id: voucherId
    },
    select: {
      id: true,
      createdAt: true,
      code: true,
      value: true,
      duration: true,
      rules: true,
      active: true
    }
  })

  if (!voucher) return res.status(400).json({
    error: 1,
    message: "Not exists vouchers with this ID."
  })

  return res.status(200).json({
    error: 0,
    voucher: voucher
  })

}

export const _postCreateVoucher = async (req, res) => {

  let {
    code,
    duration,
    value,
    rules,
    active
  } = req.body

  if (!code || !duration || !rules) return res.status(400).json({
    error: 1,
    message: "Please, verify the sended fields."
  })

  try {

    // Tranform active to INT to Prisma use in where clause
    active = parseInt(active)

    const verifyVoucher = await prisma.vouchers.findMany({
      where: {
        userId: req.logged.user,
        code: code,
        active: active
      }
    })

    if (verifyVoucher.length) return res.status(400).json({
      error: 0,
      message: "This voucher already exists!"
    })

    await prisma.vouchers.create({
      data: {
        userId: req.logged.user,
        code: code,
        duration: duration,
        value: value,
        rules: rules,
        active: active
      }
    })

    return res.status(200).json({
      error: 0,
      message: "Voucher created successfully!"
    })

  } catch(err) {
    Logger.error(err)

    return res.status(500).json({
      error: 1,
      message: "Something is wrong. Please, contact us!"
    })
  }

}

export const _putUpdateVoucher = async (req, res) => {

  let {
    voucherId,
    code,
    duration,
    value,
    rules,
    active
  } = req.body

  if (!voucherId || !code || !duration || !rules || !value) return res.status(400).json({
    error: 1,
    message: "Please, verify the sended fields."
  })

  const verifyVoucher = await prisma.vouchers.findMany({
    where: {
      userId: req.logged.user,
      id: voucherId
    }
  })

  if (!verifyVoucher) return res.status(400).json({
    error: 0,
    message: "This voucher not exists!"
  })

  await prisma.vouchers.update({
    data: {
      code: code,
      duration: duration,
      value: value,
      rules: rules,
      active: active
    },
    where: {
      id: voucherId
    }
  })

  return res.status(200).json({
    error: 0,
    message: "Voucher updated successfully!"
  })

}
