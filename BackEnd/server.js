const app = require('./app')
const dotEnv = require('dotenv')

const connectDatabase = require('./config/database')

dotEnv.config({
    path:"./config/config.env"
})

connectDatabase();
const server  = app.listen(process.env.PORT|| 3000, ()=>
{
    console.log(`Server is port ${process.env.PORT}`);
})