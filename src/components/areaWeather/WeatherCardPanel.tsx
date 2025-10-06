import WeatherCard from "./WeatherCard";
import { type CurrentWeather } from "../../services/weatherApi";
import { useUnit } from "../../context/UnitContext";
import { formatTemperature } from "../../utils/weatherUtils";


interface WeatherCardPanelProps {
    data :CurrentWeather;
}   

const WeatherCardPanel = ({data}: WeatherCardPanelProps) => {
    const {unit} = useUnit();

    const weatherData = [
        { title : "feels like", value :(unit === "metric" ? data.apparent_temperature : Number(formatTemperature(data.apparent_temperature, "imperial"))), suffix : "\u00B0" },
        { title : "humidity", value :data.relative_humidity_2m, suffix :"%" },
        { title : "wind", value :data.wind_speed_10m, suffix : " km/h" },
        { title : "precipitation", value :data.precipitation, suffix : " mm" },
    ]
    
    return (
        <div className="flex gap-4 flex-wrap w-full max-w-screen mt-5 md:gap-5 md:flex-nowrap ">
            {weatherData.map((newData, index) => (
                <WeatherCard key={index} {...newData} />
            ))}
        </div>
    );
}

export default WeatherCardPanel