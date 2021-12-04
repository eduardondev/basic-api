import NodeCache from "node-cache"
import Logger from "~/utils/log"

const cache = new NodeCache()

export const duration = (req, res, next) => {

    if (req.method !== "GET") {
        Logger.error("Only cache GET methods!")
        return next()
    }

    const key = req.originalUrl
    const cachedResponse = cache.get(key)

    if (cachedResponse) {
        Logger.info(`Retrieving cache again for ${req.originalUrl}!`)
        res.status(200).send(cachedResponse)
    }

    if (!cachedResponse) {
        Logger.info(`Caching for ${req.originalUrl}!`)
        res.originalSend = res.send
        res.send = body => {
            res.originalSend(body)
            cache.set(key, body, duration)
        }
        next()
    }

}
