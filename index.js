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



	if (req.query.user) {
		var specialities = await axios(process.env.API+'specialities')
		var user = await axios(process.env.API+'cliente/'+req.query.user)
		var menu = await axios(process.env.API+'menu/login')
		res.render('home', { title: process.env.TITLE, menu: menu.data, specialities: specialities.data})
	} else {
		var menu = await axios(process.env.API+'menu')
		var specialities = await axios(process.env.API+'specialities')
		res.render('home', { title: process.env.TITLE, menu: menu.data, specialities: specialities.data})
	}
})

app.get('/login', async (req, res) =>{
	var menu = await axios(process.env.API+'menu')
	res.render('login', { title: 'Ingreso', menu: menu.data})
})

app.get('/products', async (req, res) =>{
	var menu = await axios(process.env.API+'menu')
	var especialistas = await axios(process.env.API+'specialists')
	res.render('products', { title: process.env.TITLE, menu: menu.data, especialistas: especialistas.data})
})

app.get('/product', async (req, res) =>{
	var menu = await axios(process.env.API+'menu')
	var medico = await axios(process.env.API+'medico'+'/'+req.query.id)
	res.render('product', { title: 'Medico', menu: menu.data, medico: medico.data})
})

app.listen(process.env.PORT, () => {
	console.log('Server is Listening on: '+process.env.PORT)
})