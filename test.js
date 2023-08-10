// const mongoose = require('mongoose')
// const Schema = mongoose.Schema

// //connect DB
// mongoose.connect('mongodb://127.0.0.1:27017/pcat-test-db')

// //create schema
// const PhotoSchema = new Schema({
//   title: String,
//   description: String,
// })

// const Photo = mongoose.model('Photo', PhotoSchema)

//create a photo
// const createdPhoto = async () => {
//   const data = await Photo.create({
//     title: 'Photo Title 3',
//     description: 'Photo description 3 lorem ipsum',
//   })
// }
// createdPhoto()

//read a photo
// const readData = async () => {
//   try {
//     const data = await Photo.find({})
//     console.log(data)
//   } catch (error) {
//     console.log(error)
//   }
// }
// readData()

//update photo
// const id = '64caaf036fe35ac509d0f8c0'

// const updateData = async () => {
//   try {
//     const data = await Photo.findByIdAndUpdate(
//       id,
//       {
//         title: 'Photo 111 Title Updated',
//         description: 'Photo 111 desc updated',
//       },
//       { new: true }
//     )
//     console.log(data)
//   } catch (error) {
//     console.log(error)
//   }
// }
// updateData()

//delete a photo
// const id = '64cab04bb5fc36761be066b1'
// const deletePhoto = async () => {
//   try {
//     const data = await Photo.findByIdAndDelete(id, {})
//     console.log('Photo is removed.')
//   } catch (error) {
//     console.log(error)
//   }
// }
// deletePhoto()
