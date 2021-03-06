const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

let app = express()

hbs.registerPartials(__dirname + '/views/partials')

hbs.registerHelper("getCurrentYear", () => {
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})

app.set('view engine', 'hbs')

app.use((req, res, next) => {
    let now = new Date().toString()
    let log = `${now}: ${req.method} ${req.url}`
    console.log(log)
    fs.appendFile('server.log', log + '\n', (err) => {
        console.log(err)
    })
    next()
})
// app.use((req, res, next) => {
//     res.render('maintenance.hbs')
// })

app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    // res.send("<h1>Hello Guest!</h1>")
    res.render("home.hbs", {
        pageTitle: "Home Page",
        welcomeMessage: "Welcome to my site."
    })
})

app.get("/about", (req,res) => {
    res.render("about.hbs", {
        pageTitle: "About Page",
        currentYear: new Date().getFullYear()
    })
})

app.get("/bad", (req,res) => {
    res.send("<h2>Bad Network</h2>")
})

app.listen(3000, () => {
    console.log("Server is running...")
})
