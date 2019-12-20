const { User } = require('../models/')

class SessionControle {
    async create(req, res) {
        return res.render('auth/signin')
    }

    async store(req, res) {
        const { email, password } = req.body

        const user = await User.findOne({ where: { email } })

        if (!user) {
            console.log('usuario não encontrado')
            return res.redirect('/')
        }

        if (!await user.checkPassword(password)) {
            console.log('senha incorreta')
            return res.redirect('/')
        }

        req.session.user = user
        return res.redirect('app/dashboard')

    }

    destroy(req, res) {
        req.session.destroy(() => {
            res.clearCookie('root')
            return res.redirect('/')
        })
    }
}

module.exports = new SessionControle()