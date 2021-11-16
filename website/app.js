/* Global Variables */

const Url = 'http://api.openweathermap.org/data/2.5/weather?&zip='
const my_Api = '348cb35cd8c24c01c387dd1745aadc07'


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const button = document.getElementById('generate') //getting the botton 

button.addEventListener('click', clicking)

function clicking(){ //clicking function to build the browser as asked and show the data
    const zipcode = document.getElementById('zip').value
    const my_userFeelings= document.getElementById('feelings').value
    if (!zipcode){   //checking if the user entered a zip code or not ... if not , alert him
        alert('enter a zip code');
    } else {
        get_data(Url,zipcode,my_Api)
        .then(function(DA){
            console.log(DA)    //checking what data stored in there
            post_Data('http://localhost:4800/postMyData' , {date:newDate , temp: DA.main.temp, content: my_userFeelings}); //posting the data to the server with 'fetch'
            Update_Ui(DA);     //showing the info in the page
        }
        )}
}

//making ana asynchronous function to make a request get the data from server
let get_data = async function (Url,zipcode,my_Api){
    
    const myRequest = await fetch(Url+zipcode+"&appid="+my_Api)
    try{
        let My_response = await myRequest.json()
        return My_response
    }
    catch (err){
        console.log(err) //to print the error if exist 
    }
}

//a posting function to POST data
let post_Data= async function(url = '', data = {} ) {
    console.log(data) //checking the data
    const send = await fetch(url, {
        method : 'POST',
        credentials : 'same-origin',
        headers: {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data) //turnnig the data to JSON to be read
    })
    try {  
        const weath_data = await send.json();
        console.log(weath_data);
        return weath_data;
    } catch(err){
        console.log('error',err); 
    }
};

//UPDATING the UI variables
const temp = document.getElementById('temp')
const content = document.getElementById('content')
const N_dat=  document.getElementById('date')

//UPDATING the UI function
const Update_Ui = async function (){
    const req = await fetch ('http://localhost:4800/getMyData') //Getting data from the server
    try {
        f_data = await req.json() //turnning ALL the coming data to JSON to be read and shown in the UI 
        temp.innerText = `tempreture : ${f_data.temp}`;
        N_dat.innerText = `date : ${f_data.date}`;
        content.innerText = `I feel : ${f_data.content}`
    } 
    catch (err){
        console.log(err)
    }
}