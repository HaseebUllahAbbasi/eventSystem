const app = require('./app')
const dotEnv = require('dotenv')
dotEnv.config({
    path:"./config/config.env"
})
const server  = app.listen(process.env.PORT|| 3000, ()=>
{
    console.log(`Server is port ${process.env.PORT}`);
})