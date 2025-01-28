import { checkApiKey } from "../services/auth.service.js"

export async function verifyApiKey(req, res, next) {
    const apiKey = req.cookies.apiKey

    const user_id = Number(req.query.id)

    if(!apiKey) return res.status(401).json({ message: "Access Denied" })
    
    const ret = await checkApiKey(user_id, apiKey)

    if(!ret) return res.status(401).json({ message: "Access Denied" })

    next()
}