import WeatherCard from "./WeatherCard";
import { type CurrentWeather } from "../../services/weatherApi";
import { useUnit } from "../../context/UnitContext";
import { formatSpeed, formatLength, formatTemperature} from "../../utils/weatherUtils";


interface WeatherCardPanelProps {
    data :CurrentWeather;
    precipitation?: number;
    humidity?: number | string;
    apparent? : number;
}   

const WeatherCardPanel = ({data, precipitation, humidity, apparent}: WeatherCardPanelProps) => {
    const {unit} = useUnit();
    const weatherData = [
        { title : "Feels like", value :formatTemperature(apparent??0, unit), suffix : "" },
        { title : "humidity", value :humidity, suffix :"%" },
        { title : "wind speed", value :formatSpeed(data.windspeed, unit), suffix : unit === "metric" ? " km/h" : " mph" },
        { title : "precipitation", value :formatLength(precipitation??0, unit), suffix : unit === "metric" ? " mm" : " in" },
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