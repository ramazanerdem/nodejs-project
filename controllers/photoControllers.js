const Photo = require('../models/Photo')
const fs = require('fs')
const path = require('path')

exports.getAllPhotos = async (req, res) => {
  const page = req.query.page || 1
  const photosPerPage = 1

  const totalPhotos = await Photo.find().countDocuments()
  const photos = await Photo.find({})
    .sort('-dateCreated')
    .skip((page - 1) * photosPerPage)
    .limit(photosPerPage)

  res.render('index', {
    photos,
    current: page,
    pages: Math.ceil(totalPhotos / photosPerPage),
  })

  // const photos = await Photo.find({}).sort('-dateCreated')
}

exports.getPhoto = async (req, res) => {
  const photo = await Photo.findById(req.params.id)
  res.render('photo', {
    photo,
  })
}

exports.createPhoto = async (req, res) => {
  const uploadDir = 'public/uploads'

  !fs.existsSync(uploadDir) && fs.mkdirSync(uploadDir)

  let uploadedImage = req.files.image
  let uploadPath = __dirname + '/../public/uploads/' + uploadedImage.name

  uploadedImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadedImage.name,
    })
    res.redirect('/')
  })
}

exports.updatePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id })
  const { title, description } = req.body
  photo.title = title
  photo.description = description
  await photo.save()

  res.redirect(`/photos/${req.params.id}`)
}

exports.deletePhoto = async (req, res) => {
  const photo = await Photo.findOne({ _id: req.params.id })
  let deletedImage = __dirname + '/../public' + photo.image
  photo.image && fs.unlinkSync(deletedImage)
  await Photo.findByIdAndRemove(req.params.id)

  // if (photo) {
  //   if (photo.image) {
  //     const deletedImage = __dirname + '/../public' + photo.image
  //     fs.unlinkSync(deletedImage)
  //   }

  //   await Photo.findByIdAndRemove(req.params.id)
  // }

  res.redirect('/')
}
