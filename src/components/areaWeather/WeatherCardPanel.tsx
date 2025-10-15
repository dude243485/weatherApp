import WeatherCard from "./WeatherCard";
import { type CurrentWeather } from "../../services/weatherApi";
import { useUnit } from "../../context/UnitContext";
import { formatSpeed, formatLength} from "../../utils/weatherUtils";


interface WeatherCardPanelProps {
    data :CurrentWeather;
    precipitation?: number;
    humidity?: number | string;
}   

const WeatherCardPanel = ({data, precipitation, humidity}: WeatherCardPanelProps) => {
    const {unit} = useUnit();
    console.log(humidity);
    const weatherData = [
        { title : "wind direction", value :data.winddirection, suffix : "\u00B0 N" },
        { title : "humidity", value :humidity, suffix :"%" },
        { title : "wind speed", value :formatSpeed(data.windspeed, unit), suffix : unit === "metric" ? " km/h" : " mph" },
        { title : "precipitation", value :formatLength(precipitation??0, unit), suffix : unit === "metric" ? " mm" : " in" },
    ]
    console.log("weather data for cards: ", weatherData);
    return (
        <div className="flex gap-4 flex-wrap w-full max-w-screen mt-5 md:gap-5 md:flex-nowrap ">
            {weatherData.map((newData, index) => (
                <WeatherCard key={index} {...newData} />
            ))}
        </div>
    );
}

export default WeatherCardPanel