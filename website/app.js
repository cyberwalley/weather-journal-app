/* Global Variables */
let baseURL = 'http://api.openweathermap.org/data/2.5/weather';
let apiKey = '403f8ac45eb8d106429a3b2714e36bec';
let country = 'us';

 // Create a new date instance dynamically with JS
 let d = new Date();
 let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const button = document.querySelector('#generate');

button.addEventListener('click', performAction);

function performAction(e){
  const zipCode = document.querySelector('#zip').value; // user input
  const feelings = document.querySelector('#feelings').value; // user input
  const weatherURL =`${baseURL}?zip=${zipCode},${country}&appid=${apiKey}`;
  

 // Get weather data from open weather Map
  getWeatherData(weatherURL)

  .then(function(data){
      // post data to server
    postData('/add', {
      date: newDate,
      name: data.name,
      temp: data.main.temp,
      feelings: feelings
    })
    updateUI('/all');
  })
  // reset input field
  document.querySelector('#zip').value =""; 
  document.querySelector('#feelings').value =""; 
};



// function to get weather data from open weather Map
const getWeatherData = async(weatherURL)=> {

  const res = await fetch(weatherURL)
      try {
        const data = await res.json()
        console.log(data)
        return data

      }catch(error){
     console.log("error", error)
    } 

};

// function to post data to server
const postData = async(url ='', data ={}) => {
        const response = await fetch(url, {
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        // Body data type must match "Content-Type" header        
        body: JSON.stringify(data), 
        });
  
        try {
          const newData = await response.json();
          return newData;
        }catch(error) {
        console.log("error", error);
        }
  
  };

// function to update UI
const updateUI = async (url='') => {
    const request = await fetch(url);
    try{

      const allData = await request.json();

          document.getElementById('date').innerHTML = allData[0].date;
          document.getElementById('name').innerHTML = allData[0].name;
          document.getElementById('temp').innerHTML = allData[0].temp;
          document.getElementById('content').innerHTML = allData[0].feelings;
        
     
    }catch(error){
      console.log("error", error);
    }
  }



