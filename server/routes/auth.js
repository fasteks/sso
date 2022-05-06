import express from 'express'
import jwt from 'jsonwebtoken'

import config from '../config'
import User from '../model/User.model'

const router = express.Router()

// router.get('/', auth([]), async (req, res) => {
router.get('/', async (req, res) => {
  try {
    //  jwt занимается конкретно проверкой токена "на подлинность" получается
    const jwtUser = jwt.verify(req.cookies.token, config.secret)
    const user = await User.findById(jwtUser.uid)
    const payload = { uid: user.id }
    user.password = undefined
    const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
    res.json({ status: 'ok', token, user })
    // то же самое, что вышЕ только через auth - парсинг токена и поиск юзера по полученому айди
    // произойдет с помощью passport-jwt, а не jwt.
    //   const payload = { uid: req.user.id }
    //   req.user.password = undefined
    //   const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
    //   res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
    //   res.json({ status: 'ok', token, user: req.user })
  } catch (err) {
    res.status(400).json({ error: err, message: 'Wrong confidentials' })
  }
})

router.post('/', async (req, res) => {
  try {
    const user = await User.findAndValidateUser(req.body)
    const payload = { uid: user.id }
    user.password = undefined
    const token = jwt.sign(payload, config.secret, { expiresIn: '48h' })
    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 48 })
    res.json({ status: 'ok', token, user })
  } catch (err) {
    res.status(400).json({ error: err, message: 'Wrong confidentials' })
  }
})

export default router
