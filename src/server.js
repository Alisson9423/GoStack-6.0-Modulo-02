const express = require('express')
const nunjucks = require('nunjucks')
const path = require('path')

class App {
  constructor () {
    this.express = express()
    this.isDev = process.env.NODE_ENV !== 'prodocution'
    this.middleware()
    this.views()
    this.routes()
  }

  middleware () {
    this.express.use(express.urlencoded({ extended: false }))
  }

  views () {
    nunjucks.configure(path.resolve(__dirname, 'app', 'views'), {
      watch: this.isDev,
      express: this.express,
      autoescape: true
    })

    this.express.set('view engine', 'njk')
  }

  routes () {

  }
}

module.exports = new App().express