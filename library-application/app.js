const express = require('express')
const Controller = require('./controllers/controller')
const app = express()
const port = 3000
const router = require('./routes/home')

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:true}))

app.get('/', Controller.loginPage)
app.get('/login', Controller.loginPage)
app.post('/login', Controller.loginCheck)
app.get('/create', Controller.createAccountPage)
app.post('/create', Controller.createAccount)
app.use('/home', router)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})