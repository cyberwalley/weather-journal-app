

/* Dependencies */
// Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
// Cors for cross origin allowance
const cors = require('cors');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));
const port = 5000;

// Spin up the server
const server = app.listen(port, function listening(){
    // console.log(server);
    console.log(`running on localhost: ${port}`);
});

const projectData = [];

// GET route

app.get('/all', function sendData (req, res) {
 
  res.send(projectData);
});


app.post('/add', function getData(req, res){
  newEntry ={
      date: req.body.date,
      name: req.body.name,
      temp: req.body.temp,
      feelings : req.body.feelings,

  };

  //add most recent entry
  projectData.unshift(newEntry);
  console.log( projectData );
  
});

