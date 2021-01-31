/* Global Variables */
const conuntry = 'us'
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = 'a0889fcc64c14e106104336268cb0c66';

//Create a new date instance dynamically with JS
let d = new Date();
//Add 1 to getMonth because it Get the month as a number (0-11) which is weird to user
let newDate = (d.getMonth()+1) + '.' + d.getDate() + '.' + d.getFullYear();

//Add click event listener to the button with id=generate
document.querySelector('#generate').addEventListener('click', performAction);

//Action performed when button clicked
function performAction(e) {
    const zipCode = document.querySelector('#zip').value;
    const userResponse = document.querySelector('#feelings').value;
    getTemperature(baseURL, zipCode, apiKey)
        .then(function (data) {
            //Add data
            try{
                temp=data.main.temp;
            }
            catch(error){
                console.log(error);
                temp=data.message;
            }
            //console.log(data);
            postData('/weather', {
                date: newDate,
                temperature: temp,
                userResponse: userResponse
            })
                .then(
                    updateUI()
                )
        })
}

//Retrieve data from api
const getTemperature = async (baseURL, zipCode, apiKey) => {
    const res = await fetch(`${baseURL}${zipCode},${conuntry}&appid=${apiKey}`);
    try {
        const data = await res.json();
        return data;
    }
    catch (error) {
        console.log('error', error);
    }
}

//Async function to post data
const postData = async (url = '', data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await res.json();
        return newData;
    }
    catch (error) {
        console.log('Error', error);
    }
}

//Update UI with the retrieved data 
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        console.log(allData);
        document.querySelector('#date').innerHTML = allData.date;
        document.querySelector('#temp').innerHTML = allData.temperature;
        document.querySelector('#content').innerHTML = allData.userResponse;

    } catch (error) {
        console.log("error", error);
    }
}