const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")

// Setup handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        author: "Raga"
    })
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About Me",
        author: "Raga"
    })
})

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        author: "Raga"
    })
})

app.get("/weather", (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "Please provide an address"
        })
    }
    
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
        
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    
})

// app.get("/products", (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: "Forbidden Search :P"
//         })
//     }
//     console.log(req.query)
//     res.send({
//         products: []
//     })
// })

app.get("/help/*", (req, res) => {
    res.render("404", {
        title: "404",
        text: "Help article not found",
        author: 'Raga'
    })
})

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        text: "404 not found",
        author: 'Raga'
    })
})

app.listen("3000", () => {
    console.log("Server is up on 3000")
})