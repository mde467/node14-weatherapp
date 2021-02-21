console.log("js");

// fetch("http://localhost:3000/weather?address=boston").then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(error)
//         }else{
//             console.log(data.location);
//             console.log(data.forecast);
//         }
//     })
// })
const weatherform =document.querySelector('form');
const inptText = document.querySelector('input');
const messagOne = document.querySelector('#messageOne');
const messageTwo = document.querySelector('#messageTwo');
weatherform.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log(inptText.value);
    fetch("http://localhost:3000/weather?address="+inptText.value).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            messagOne.textContent = data.error;
        }else{
            messagOne.textContent = data.location;
            messageTwo.textContent = data.forecast;
        }
    })
})
})
// const getWeatherDetails = ()=>{
//     fetch("http://localhost:3000/weather?address=boston").then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(error)
//         }else{
//             document.getElementById("dvLocation").nodeValue = data.location;
//             document.getElementById("dvweather").nodeValue = data.forecastData;
//         }
//     })
// })
// }