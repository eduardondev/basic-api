import { Router, json } from 'express'
import { Logger } from '~/utils/log'
import { _getUserLogin, _postCreateLogin } from '../controllers/Login'
import { _getAllUsers, _getUniqueUser } from '~/controllers/Users'
import { _getAuth } from '~/controllers/Auth'
import { isAuth } from '~/middlewares/Auth'
import {
  _getAllVouchers,
  _getCodeVoucher,
  _getIdVoucher,
  _putUpdateVoucher,
  _postCreateVoucher,
} from '~/controllers/Vouchers'
import {
  _getShopifyCheck,
  _getShopifyCheckout,
  _putShopifyUpdateCheckout,
} from '../controllers/Shopify'

export const router = Router()

router.use(json())

router.use((req, res, next) => {
  Logger.info(`${req.method} ${req.url} - Host ${req.hostname}`)
  next()
})

router.get('/', (req, res) => {
  res.status(200).json({
    error: 0,
    message: 'API is running correctly.',
  })
})

/* ----- LOGIN ----- */

router.post('/login/create', _postCreateLogin)
router.get('/login', _getUserLogin)

/* ----- END LOGIN ----- */

/* ----- USERS ----- */

router.get('/users', isAuth, _getAllUsers)
router.get('/user/:id', isAuth, _getUniqueUser)

/* ----- END USERS ----- */

/* ----- AUTH ----- */

router.get('/auth/:id', _getAuth)

/* ----- END AUTH ----- */

/* ----- VOUCHERS ----- */

router.get('/vouchers', isAuth, _getAllVouchers)
router.get('/voucher/:code', isAuth, _getCodeVoucher)
router.get('/voucher/id/:voucherId', isAuth, _getIdVoucher)
router.put('/voucher/edit', isAuth, _putUpdateVoucher)
router.post('/vouchers/create', isAuth, _postCreateVoucher)

/* ----- END VOUCHERS ----- */

/* ----- SHOPIFY ----- */

router.get('/shopify/check', _getShopifyCheck)
router.get('/shopify/checkout/:id', _getShopifyCheckout)
router.put('/shopify/checkout/edit/:id', _putShopifyUpdateCheckout)

/* ----- END SHOPIFY */
