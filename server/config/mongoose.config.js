const mongoose = require('mongoose')
const port = '27017'
const db = 'GamerRants'

mongoose.set('strictQuery', false)
mongoose.connect(`mongodb://127.0.0.1:${port}/${db}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log(`Successfully connected to database ${db}\nRunning on port ${port}`)
})
.catch((err) => console.error(err))