const express = require('express')
const mongoose = require('mongoose')
const fileUpload = require('express-fileupload')
const methodOverride = require('method-override')

const ejs = require('ejs')

const photoControllers = require('./controllers/photoControllers')
const pageController = require('./controllers/pageController')

const app = express()

//connect DB
mongoose
  .connect(
    'mongodb+srv://ramazan:47BKeTc7Z8omahQj@cluster1.3yiuxok.mongodb.net/pcat-db?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('mongo connected')
  })
  .catch((err) => {
    console.log(err)
  })

//TEMPLATE ENGINE
app.set('view engine', 'ejs')

//MIDDLEWARES
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(fileUpload())
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
)

//ROUTES
app.get('/', photoControllers.getAllPhotos)
app.get('/photos/:id', photoControllers.getPhoto)
app.post('/photos', photoControllers.createPhoto)
app.put('/photos/:id', photoControllers.updatePhoto)
app.delete('/photos/:id', photoControllers.deletePhoto)

app.get('/about', pageController.getAboutPage)
app.get('/add', pageController.getAddPage)
app.get('/photos/edit/:id', pageController.getEditPage)

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı...`)
})
