import axios from "axios"



const getWeather= async (lat, lon) => {
    const APIKey ="d3cc557a12777e28995cbb6d01ecad61"
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`
    const req = await axios.get(URL)
    return req
}
export default getWeather