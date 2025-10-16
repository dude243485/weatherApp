// import dailyForecastData from "../../tempData/dailyForecastData";
import DailyForecastCard from "./DailyForecastCard";
import { type DailyForecast } from "../../services/weatherApi";
import { formatTemperature, getWeatherIcon } from "../../utils/weatherUtils";
import { useUnit } from "../../context/UnitContext";

interface DailyForecastPanelProps {
    data: DailyForecast;
}
interface forecastDataInterface {
    day : string;
    icon : string;
    lowTemp : number | string;
    highTemp : number | string;
}
const DailyForecastPanel = ({data}:DailyForecastPanelProps) => {
    const dailyForecastData: forecastDataInterface[] =  []
    const { unit } = useUnit()
    for (let i = 0 ; i < data.weather_code.length; i++)
    {
        dailyForecastData.push({
            day : new Date(Date.now() + i * 86400000).toLocaleDateString("en-US", { weekday: "short" }),
            icon : getWeatherIcon(data.weather_code[i]),
            lowTemp : formatTemperature(data.temperature_2m_min[i], unit),
            highTemp : formatTemperature(data.temperature_2m_max[i], unit)
        })
    }

    return (
        <div className= {`font-(family-name:--dm-sans) px-4`}>
            <h3 className="font-semibold text-[20px] text-left ">Daily Forecast</h3>
            <div className= {`flex gap-4 flex-wrap w-full max-w-screen pt-5 `}>
                {dailyForecastData.map((data, index) => (
                    <DailyForecastCard key = {index} {...data} />
                ))}
            </div>
        </div>
    );
}

export default DailyForecastPanel;