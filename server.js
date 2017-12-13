const express = require('express');
const hbs = require('hbs');
const fs = require('fs'); 

const port = process.env.PORT || 3000;// process.env is an object that stores all of our environment variables as key value pairs, if not exist, 3000
// making a new express app
var app = express();  // return result from calling express as a function

hbs.registerPartials(__dirname +'/views/partials'); // directory u want to use as partial

// lets us set some various express related configurations
app.set('view engine','hbs')// key value pair we want to use inside () view engine- we want to use hbs


app.use((req, res, next)=>{
	var now = new Date().toString();
	var log = `${now} : ${req.method} ${req.url}`;

//	console.log(`${now} : ${req.method} ${req.url}`); // takes req object, spits out some info
    console.log(log);
//    fs.appendFile('server.log', log + '\n'); // filename and thing u want to save into a file
// new version follows 
    fs.appendFile('server.log', log + '\n', (err)=>{
      if(err){
      	console.log('Unable to append to server.log.');
      }
    });
  next();	// and let the server move on process down below 
})

// app.use((req,res,next)=>{
//   res.render('maintenance.hbs');  
// });

// in order to add some middleware - it takes middleware function app.use
app.use(express.static(__dirname + '/public'));   //takes absolute path to the folder you want to serve up
//--dirname is the variable that gets passed into our file by that wrapper function, dirname stores the path to your projects directory
// in this case it stores the path to node web server. 

//take 2 arguments, name of argument and function to run 
hbs.registerHelper('getCurrentYear', ()=>{
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=>{
    return text.toUpperCase();
});

// registering a handler for a http get request 
app.get('/',(req, res)=>{ // req stores a ton of information about the request coming in/headers/body info/methods that made with the request the path 
                          // res has a bunch of methods available to you, so you can respond to the HTTP request
                          // you can customize what data you sent back, you could set your age to status code
                          // you can set your age to status code 
  //res.send('<h1>Hello Express!</h1>'); // let us respond to the request sending some data back here
  // res.send({
  // 	name:'Bill',
  // 	likes:['biking','city']
  // });
  res.render('home.hbs',{
     pageTitle: 'Home Page',
     welcomeMessage: 'Welcome to my website',
     
  });
});                 // resonse to http request // someone vies the web site, this is the string they see- get this back as data

// one routes set up but the app is not going to start listen without listener
//listener - it will bind the application to a port on our machine

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
  	pageTitle:'About Page',
  	
  });  // let you render any of templates you have set up with ur current view 
});


app.get('/projects',(req,res)=>{
  res.render('projects.hbs', {
    pageTitle: 'Projects'
  });
});

// /bad - send back json with errorMessage

app.get('/bad',(req,res)=>{
  res.send({
    errorMessage: 'Unable to handle request'
  });	
});

app.listen(port, ()=>{
	console.log(`Server is up on port ${port}`);
});

