const mongoose = require('mongoose')

const URI = ''

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}

async function mongoConnect() {
    try {
        await mongoose.connect(URI, options)
        console.log('db connected!')
    } catch (err) {
        console.log('DB error', err)
    }
}

module.exports = mongoConnect