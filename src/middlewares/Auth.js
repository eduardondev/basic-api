import jwt from 'jsonwebtoken'
import { Logger } from "~/utils/log"

export const genToken = (req, res, data) => {

  let token = jwt.sign({ user: data }, process.env.TOKEN_SECRET, {
    expiresIn: 21600 // expires in 6 hours
  });
  res.status(200).json({
    auth: true,
    token: token
  });

}

export const isAuth = (req, res, next) => {

  const token = req.header('x-access-token')

  if (!token) {

    Logger.warn(`Trying access secure route without token ${req.url}`)

    return res.status(401).json({
      "error": 1,
      "message": "Access denied! Not have access token."
    })

  }

  try {

    const verified = jwt.verify(token, process.env.TOKEN_SECRET)

    // Use req.logged in others routes to verify if is logged
    req.logged = verified

    next()

  } catch(err) {

      Logger.error(`Invalid token on ${req.url}`)

      return res.status(400).json({
        "error": 1,
        "message": "Invalid or expired token"
    })
  }
}
