import './App.css';
import { useState, useEffect } from 'react';
import getWeather from './components/getWeather';


function App() {
  const[cityIn,setCityIn] = useState('')
  const[countryIn,setCountryIn] = useState('')
  const[weatherIn,setWeatherIn] = useState('')
  const[descriptionIn,setDescriptionIn] = useState('')
  const[iconIn,setIconIn] = useState('')
  const[tempIn,setTempIn] = useState('')
  const[defaultParameter, setDefaultParameter] = useState(false)



  useEffect(() =>{

    // Acá está lo importante
    navigator.geolocation.getCurrentPosition((pos)=>{
      getWeather(pos.coords.latitude, pos.coords.longitude)
        .then((res)=>{
          setCityIn(res.data.name)
          setCountryIn(res.data.sys.country)
          setWeatherIn(res.data.weather[0].main)
          setDescriptionIn(res.data.weather[0].description)
          setIconIn(res.data.weather[0].icon)
          setTempIn(res.data.main.temp)

      })
    })
  }, [])
  // A ver que onda


  let tempCelsius = (tempIn - 273.15).toFixed(2)
  const imageSource = `http://openweathermap.org/img/wn/${iconIn}@2x.png`
  const principalDivClasses= 'flx-clmn algn-cntr max-wdth'
  const celsiusValue = <h2>{tempCelsius} &deg;C</h2>
  const farenheitValue = <h2>{+tempCelsius + 32} &deg;F</h2>

  return (
    <div className= {principalDivClasses}>
    <h1>SearchWeather</h1>
    <section className='algn-cntr mrgn-tp-3em flx-clmn wdth-40 mrgn-0 wthr-cntnr'>
        
        <h3 className='mrgn-2em'>{cityIn}</h3>
        <h5 className='mrgn-2em'>{countryIn}</h5>
        <img className='wdth-20' src={imageSource} alt='weather'></img>
        {defaultParameter ? farenheitValue : celsiusValue }

        {/* Switch Weather Info Button */}
        <button className='btn-clr' 
        onClick={()=> setDefaultParameter(!defaultParameter)}>
          Change to {defaultParameter ?'Celsius':'Farenheit' }
          </button>

        {/* Weather Info Description */}
        <p className='wdth-100 mrgn-2em mrgn-0 algn-cntr txt-algn-cntr '>
        {weatherIn}
        <br>
        </br>
        {descriptionIn}
        </p>
    </section>
    </div>
  );
}

export default App;
