const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const routes = express.Router()
const authMilldeware = require('./app/middleware/auth')
const guestMilldeware = require('./app/middleware/guest')

const UserControler = require('./app/controllers/UserController')
const SessionController = require('./app/controllers/SessionController')

routes.get('/', guestMilldeware, SessionController.create)
routes.post('/signin', SessionController.store)

routes.get('/signup', guestMilldeware, UserControler.create)
routes.post('/signup', upload.single('avatar'), UserControler.store)

routes.use('/app', authMilldeware)

routes.get('/app/dashboard', (req, res) => {
    console.log(req.session.user)
    res.render('dashboard')
})

module.exports = routes