const mongoose = require('mongoose')

const connectDatabase = () => {
    mongoose.connect(process.env.DB_LOCAL_URI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, err => {
            if (err) throw err;
            console.log('Connected to MongoDB!!!')
        })
}
module.exports = connectDatabase;
