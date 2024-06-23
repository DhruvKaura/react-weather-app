import TopButtons from "./components/TopButtons"
import Inputs from "./components/Inputs"
import TimeAndLocation from "./components/TimeAndLocation"
import TempAndDetails from "./components/TempAndDetails"
import Forcast from "./components/Forcast"
import getFormattedWeatherData from "./services/weatherService"
import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function capitalizeFirstLetter(string){
  return string.charAt(0).toUpperCase()+string.slice(1);
}

const App = () => {

  const [query, setQuery] = useState({q:'jalandhar'})
  const [units, setUnits] = useState('metric')
  const [weather, setWeather] = useState(null)

  const getWeather = async() => {
    const cityName = query.q ? query.q : 'current location';
    toast.info( `Fetching weather data for ${capitalizeFirstLetter(cityName)}`)
    const data = await getFormattedWeatherData( {...query, units}).then(data =>{
      toast.success(`Fetched weather data for ${data.name}, ${data.country}`)
      setWeather(data);
    })
    console.log(data);
  }

  useEffect(()=> {
    getWeather();
  }, [query, units]);

  const formatBackgorund = () => {
    if(!weather) return ' from-cyan-600 to-blue-800';
    const threshold = units === 'metric' ? 20: 60
    if (weather.temp <= threshold) return 'from-cyan-600 to-blue-800'
    return "from-yellow-600 to-orange-800"
  }


  return (
   <div 
   className= {`mx-auto max-w-screen-lg my-5 py-5 px-32 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackgorund()}`}
   
   >
    <TopButtons setQuery ={setQuery}/>
    <Inputs setQuery={setQuery} setUnits={setUnits}/>
    {
      weather && (
        <>
          <TimeAndLocation weather={weather}/>
          <TempAndDetails weather={weather} units={units}/>
          <Forcast title='3 hour step forecast' data= {weather.hourly}/>
          <Forcast title='3 hour step forecast' data= {weather.daily}/>
        </>
      )
    }
    <ToastContainer autoClose={2500} hideProgressBar={true} theme="colored"/>
   </div>
  )
}

export default App
