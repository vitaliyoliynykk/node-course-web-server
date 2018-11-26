const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
	let now = new Date().toString();
	let log = `${now}: ${req.method} ${req.url}`
	fs.appendFile('server.log',`${log} \n`,(err) =>{
		if(err){
			console.log('Unable to append file');
		}
	});
	console.log(log);
	next();
});
app.use((req, res, next) => {
	res.render('maintance.hbs');
});
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear());
hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.get('/', (req,res) => {
		res.render('main.hbs',{
			pageTitle: 'Main Page',
		});
});

app.get('/about', (req,res) => {
		res.render('about.hbs',{
			pageTitle: 'About Page',
		});
});

app.get('/bad', (req,res) => {
	res.send({errorMessage:'Bad Request'});
});
app.listen(port, () => {
	console.log(`Server is up on port ${port}`);
});