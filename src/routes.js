const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const routes = express.Router()
const UserControler = require('./app/controllers/UserController')

routes.get('/signup', UserControler.create)
routes.post('/signup', upload.single('avatar'), UserControler.store)

module.exports = routes