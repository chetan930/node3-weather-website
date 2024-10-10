

const currentDate = new Date().toJSON().slice(0, 10);
const strDate=currentDate.toString()


const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const loc = document.querySelector('#location')
const date = document.querySelector('#date')
const time = document.querySelector('#time')
const uv_index = document.querySelector('#uv_index')
const temp = document.querySelector('#temp')
const wind = document.querySelector('#wind')
const feels = document.querySelector('#feels')
const precipitation = document.querySelector('#precipitation')
const errorMsg = document.querySelector('#error')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const inputLocation = search.value;
    errorMsg.textContent = 'Loading..'
    loc.textContent = ''
    date.textContent = ''
    time.textContent = ''
    uv_index.textContent = ''
    temp.textContent = ''
    wind.textContent = ''
    feels.textContent = ''
    precipitation.textContent = ''
    weather_descriptions.textContent=''

    if (!inputLocation) {
        // console.log("Please provide location")
        errorMsg.textContent = "Please provide location"
    } else {
        // const url = 'http://localhost:3000/weather?address=' + inputLocation
        const url = '/weather?address=' + inputLocation
        fetch(url).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    // console.log(data.error)
                    errorMsg.textContent = data.error
                } else {
                    // console.log(data.location)
                    errorMsg.textContent='';
                    loc.textContent = data.location
                    date.textContent = currentDate
                    time.textContent = data.time.slice(11)
                    // uv_index.textContent = data.forecast.this.strDate.uv_index
                    uv_index.textContent ='UV Index: '+ data.current.uv_index
                    temp.textContent = data.current.temperature
                    wind.textContent = data.current.wind_speed +' kmph'
                    feels.textContent = 'Feels like '+data.current.feelslike
                    precipitation.textContent =data.current. precip+'%'
                    weather_descriptions.textContent=data.current.weather_descriptions[0]
                }
            })
        })
    }
})