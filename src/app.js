const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const foreCast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const partialDirectoryPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)
hbs.registerPartials(partialDirectoryPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Jonathan Alano'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Jonathan Alano'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This are some very helpfull text',
        name: 'Jonathan Alano'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address){
        return res.send({
            error : 'You must provide an address'
        })
    }
    geoCode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error){
            return res.send({ error })
        }

        foreCast(latitude, longitude, (error, forecast) =>{
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecast,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req,res) => {
    if (!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query)

    res.send({
        products :[]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jonathan Alano',
        errorMessage: 'Help article not found.'
    })
})

app.get('*',(req, res) => {
    res.render('404', {
        title: '404',
        name: 'Jonathan Alano',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log(`Server is up on port ${port}`)
})
