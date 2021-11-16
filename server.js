MyprojectData = {};

//require express to run the server and routes.
const express = require('express'); 
const bodyParser = require('body-parser');

const app = express(); // statr an instance of an app 

//middleware 
//making express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



const cors = require('cors');//require cors for cross arigin allowance
app.use(cors())

app.use(express.static('website')); //detecting the main project fplder

// setup server
const port = 4800; //setting a port to the server
const my_server = app.listen(port, listening_2serv);//checking if the server working
function listening_2serv(){
    console.log(`the server is running on ${port}`);
}

// Initialize all route with a callback function
app.get('/getMyData',function(req,res){
    res.send(MyprojectData)
    MyprojectData = {};
})

//putting post route
app.post('/postMyData',function(req,res){
    console.log(req.body)
    new_projectData = {  //storing the data
        temp : req.body.temp,
        date : req.body.date,
        content : req.body.content
    }
    MyprojectData=new_projectData;
})