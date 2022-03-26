const express = require('express')
const axios = require('axios')
const cors = require('cors')
require('dotenv').config()
var path = require('path');

const app = express()
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())




app.get('/', async (req, res) =>{
	var menu = await axios(process.env.API+'menu')
	res.render('home', { title: 'Livemedic Edgley', menu: menu.data})
})

app.get('/login', async (req, res) =>{
	var menu = await axios(process.env.API+'menu')
	res.render('login', { title: 'Livemedic Edgley', menu: menu.data})
})

app.listen(process.env.PORT, () => {
	console.log('Server is Listening on: '+process.env.PORT)
})