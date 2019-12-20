const express = require('express')
const multerConfig = require('./config/multer')
const upload = require('multer')(multerConfig)

const routes = express.Router()
const authMilldeware = require('./app/middleware/auth')
const guestMilldeware = require('./app/middleware/guest')

const UserControler = require('./app/controllers/UserController')
const DashboardControler = require('./app/controllers/DashboardController')
const SessionController = require('./app/controllers/SessionController')

routes.use((req, res, next) => {
    res.locals.flashSucces = req.flash('success')
    res.locals.flashError = req.flash('error')
        // console.log(req.flash('success'))
        // console.log(res.locals.flashSucces)
    next()
})

routes.get('/', guestMilldeware, SessionController.create)
routes.post('/signin', SessionController.store)

routes.get('/signup', guestMilldeware, UserControler.create)
routes.post('/signup', upload.single('avatar'), UserControler.store)

routes.use('/app', authMilldeware)

routes.get('/app/logout', SessionController.destroy)
routes.get('/app/dashboard', DashboardControler.index)

module.exports = routes