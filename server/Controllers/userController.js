const ApiError = require("../error/ApiError");
const {User, Basket, Product} = require("../models/models");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const generateJwt = (id, email, role) => {
  return jwt.sign(
    {id, email, role},
    process.env.SECRET_KEY,
    {expiresIn: '24h'}
  )
}

class userController {
  async registration(req, res, next) {
    try {
      const {name, surname, email, phone, address, password, role} = req.body
    if (!name || !surname || !email || !phone || !address || !password || !role) {
        return next(ApiError.badRequest('Не полные данные'))
      }
      const candidateEmail = await User.findOne({where: {email}})
      if (candidateEmail) {
        return next(ApiError.badRequest('Пользователь с таким email уже существует'))
      }
      const candidatePhone = await User.findOne({where: {phone}})
      if (candidatePhone) {
        return next(ApiError.badRequest('Пользователь с таким phone уже существует'))
      }
      const hashPassword = await bcrypt.hash(password, 5)
      const user = await User.create({name, surname, email, phone, password: hashPassword, address, role})
      const basketRes = await Basket.create({userId: user.id})
      let basketId = basketRes.dataValues.id
      const token = generateJwt(user.id, user.email, user.role)
      return res.json({token, basketId})
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async login(req, res, next) {
    try {
      const {email, password} = req.body
      const user = await User.findOne({where: {email}})
      if (!user) {
        return next(ApiError.internal('Пользователь не найден'))
      }
      let comparePassword = bcrypt.compareSync(password, user.password)
      if (!comparePassword) {
        return next(ApiError.internal('Указан неверный пароль'))
      }
      const token = generateJwt(user.id, user.email, user.role)
      let basket = await Basket.findOne({where: {userId: user.id}});
      return res.json({token, basket})
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }

  async check(req, res, next) {
    const token = generateJwt(req.user.id, req.user.email, req.user.role)
    return res.json({token})
  }
}

module.exports = new userController()