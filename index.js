const expreess = require('express')
const app = expreess()
const port = 8080

const apiVersion = 'v1'

const authRoutes = require('./routes/auth');
const testimoniRoutes = require('./routes/testimonials');
const usersRouters = require('./routes/users');

const parser =  require('body-parser')
const cors = require('cors');


app.use(cors())
app.use(parser.urlencoded({extended: false}))
app.use(parser.json())

app.use(`/api/${apiVersion}`, authRoutes)
app.use(`/api/${apiVersion}`, testimoniRoutes)
app.use(`/api/${apiVersion}`, usersRouters)


app.get('/',(req,res) =>{
    res.json({
        status : true,
        message : "Success connect"
    })
})

app.listen(port, () => {
    console.log(`Server started  on ${port}`);
})


