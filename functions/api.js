const express = require('express')
const request = require('request')
const cheerio = require('cheerio')
const serverless = require('serverless-http')
const app = express()
const router = express.Router();

router.get('/', (req, res) => {
    res.send({
        "Greetings": "Welcome"
    })
})

router.get('/apmc', (req, res) => {
    request('http://www.apmcrajkot.com/daily_rates', (error, response, html) => {
        if (!error && response.statusCode === 200) {
            const $ = cheerio.load(html)
            let strongTagValues = []
            $('strong').each((i, element) => {
                strongTagValues.push($(element).text())
            })
            res.send(strongTagValues)
        }
    })
})


app.use('/', router)

module.exports.handler = serverless(app)