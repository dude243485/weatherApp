
import BlueAreaBox from "../areaWeather/BlueAreaBox"
import WeatherCardPanel from "../areaWeather/WeatherCardPanel"
import DailyForecastPanel from "../dailyForecast/DailyForecastPanel"
import HourlyWeatherPanel from "../hourlyForecast/HourlyWeatherPanel"
import { useWeather } from "../../context/WeatherContext"
import { useState, useEffect } from "react"
import SearchBar from "../search/SearchBar"
import { type City} from "../../utils/types";


const BodyContainer = () => {

    const [coordinates, setCoordinates] = useState<{
    latitude: number;
    longitude: number} | null>(null);

    const {weatherData, loading, error, refetch } = useWeather(
      coordinates ? { latitude: coordinates.latitude,
         longitude:coordinates.longitude} : {latitude: 0, longitude: 0}
    );

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          console.log(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          console.error("Error getting location:", error);
          setCoordinates({latitude: 40.7128, longitude:-74.0060})
        }
      );
     
    }
     else{
        //fallback if geolocation is not supported
        setCoordinates({latitude: 40.7128, longitude:-74.0060})
      }
  }, []);
  const [city, setCity] = useState<City | null>(null);
  const handleCitySelect = (city: City) => {
    console.log("selected city:", city)
    setCity(city);
    setCoordinates({
          latitude: city.latitude,
          longitude: city.longitude,
    });
  }

  if (loading) {
    return (
        <>
            <SearchBar
            placeholder="Enter city name..."
            onClick = {refetch}
            onCitySelect={handleCitySelect} />
            <div className='flex justify-center items-center text-3xl text-(--brand-text)'>
                Loading weather data...
            </div>
        </>
        );
  }

  if (error) {
    return (
        <>
            <SearchBar 
            placeholder="Enter city name..."
            onClick = {refetch}
            onCitySelect={handleCitySelect} />
            <div>
            <p>Error: {error}</p>
            </div>
        </>
    );
  }

  if (!weatherData) {
    return (
        <>
            <SearchBar 
            placeholder="Enter city name..."
            onClick = {refetch}
            onCitySelect={handleCitySelect} />
            <div>No weather data available</div>
        </>
        
    );
  }
  
  return(
    <>
    <SearchBar 
    placeholder="Enter city name..."
    onClick = {refetch}
    onCitySelect={handleCitySelect}
     />
    <div className="lg:flex lg:items-start lg:justify-center lg:py-8 lg:px-20">
          <div className= "lg:flex lg:w-2/3 lg:flex-col">
            <div className="px-4 py-8">
            <BlueAreaBox data = {weatherData.current_weather} city = {city} />
            {weatherData.current_weather && (
              <WeatherCardPanel 
              data={weatherData.current_weather} 
              precipitation ={weatherData.daily?.precipitation_sum[0]}
              humidity = { weatherData.hourly?.relativehumidity_2m[0]} />
            )}
            </div>
            {weatherData.daily && (
                <DailyForecastPanel data={weatherData.daily} />
            )}
        </div>
        {weatherData.hourly && (
            <HourlyWeatherPanel weatherData={weatherData.hourly} />
        )}
       </div>
      </> 
  )   
}

export default BodyContainer;