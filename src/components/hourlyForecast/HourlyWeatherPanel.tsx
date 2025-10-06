import HourlyWeatherCard from "./HourlyWeatherCard";
// import hourlyWeatherData from "../../tempData/hourlyWeatherData";
import { useState } from "react";
import icon_dropdown from "../../assets/icon-dropdown.svg";
import HourlyForecastDropdown from "../dropdowns/HourlyForecastDropdown";
import { type HourlyForecast } from "../../services/weatherApi";
import { getWeatherIcon } from "../../utils/weatherUtils";


interface hourlyForecastInterface {
    time: number;
    icon :string;
    temp : number;
}




const HourlyWeatherPanel = ({data}: {data: HourlyForecast}) => {

    const hourlyWeatherData: { [key: string]: hourlyForecastInterface[] } = {};
    for (let i = 0; i < data.time.length; i++)
    {
        const hour = new Date(data.time[i]).getHours();
        const day = new Date(data.time[i]).toLocaleDateString("en-US", { weekday: "long" });
        if (!hourlyWeatherData[day]) {
            hourlyWeatherData[day] = [];
        }
        hourlyWeatherData[day].push({
            time: hour,
            icon: getWeatherIcon(data.weather_code[i]),
            temp: data.temperature_2m[i],
        });
    }


    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    const dayKeys = Object.keys(hourlyWeatherData);

    const [currentDay, setCurrentDay] = useState("tuesday");

    const onSelectDay = (day: string) => {
        setCurrentDay(day);
        setIsExpanded(false);
    }


    return(
        <div className="px-4 pt-3 pb-8 lg:pb-0  lg:w-1/3 lg:pt-8 lg:flex lg:grow lg:h-full">
            <div className={` bg-(--brand-neutral) font-(family-name:--dm-sans) text-(--brand-text) px-4 rounded-[20px] 
                py-7 lg:w-full lg:py-[31.6px]`}>
            <div className="flex items-center justify-between pb-[22.5px] ">
                <h3 className="font-semibold text-[20px] text-left "
                    >Hourly forecast</h3>
                <div className="relative">
                    <button
                    onClick = {toggleExpand}
                    className={`text-[16px] rounded-[8px] cursor-pointer py-2 pl-4 pr-10 bg-(--brand-mid)
                        capitalize`}
                    >
                        {currentDay}

                    </button>
                    <img
                    onClick={toggleExpand}
                    src = {icon_dropdown}
                    alt = "dropdown icon"
                    className="w-3 absolute top-4 right-4 cursor-pointer"
                    />
                    {
                        isExpanded && (
                            <HourlyForecastDropdown days = {dayKeys} onSelectDay={onSelectDay} />
                        )
                    }
                </div>
            </div>
            <div className="gap-4 flex flex-col">
                {hourlyWeatherData[currentDay as keyof typeof hourlyWeatherData].map((data, index) =>(
                    <HourlyWeatherCard key = {index} {...data} />
                ))}
            </div>
        </div>
        </div>
    );
}

export default HourlyWeatherPanel;