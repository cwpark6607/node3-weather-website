// app.com
// app.com/help
// app.com/about

const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const port = process.env.PORT || 3000

const app = express()

// Define path for Express config
const pubDirPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(pubDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'CW'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'CW'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text',
        title: 'Help',
        name: 'CW'
    })
})

app.get('/weather', (req, res) => {
    const address = req.query.address

    if (!address) {
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(address, (err, {longitude, latitude} = {}) => {
        if (err) {
            return res.send({
                error: err
            })
        }

        forecast(longitude, latitude, (error, data) => {
            if (err) {
                return res.send({
                    //error: err
                    error
                })
            }

            res.send({
                forecast: data,
                address: address
            })
        })
    })

    // res.send([{
    //     forecast: "-2 degree celsius",
    //     location: "Seoul",
    //     address: req.query.address
    // }])
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'CW',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'CW',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is running on port', port)
})