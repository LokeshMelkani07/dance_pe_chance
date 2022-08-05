const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 8000;
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
main().catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://localhost:27017/contactDance');
}

// Define Mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    age: String,
    phone: String,
    email: String,
    address: String,
    query: String
});

// Compiling Schema into model
const Contact = mongoose.model('Dancer', contactSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
})

app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
})

app.get('/about', (req, res) => {
    const params = {}
    res.status(200).render('about.pug', params);
})

app.get('/services', (req, res) => {
    const params = {}
    res.status(200).render('services.pug', params);
})

// To make post request using express we need to install body-parser
// so write , npm install body-parser in terminal
// and write const bodyparser = require(“body-parser”); in app.js beginning
app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);  // When we make a post request then make a new Contact Object will be created
    // It will return us a promise so we use then and catch
    myData.save().then(()=>{
    res.send('This item has been saved to the database')
    }).catch(()=>{
    res.status(404).render('item was not saved to the databse')})
});


// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
})