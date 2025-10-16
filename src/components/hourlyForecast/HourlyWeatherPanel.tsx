import HourlyWeatherCard from "./HourlyWeatherCard";
// import hourlyWeatherData from "../../tempData/hourlyWeatherData";
import { useState, useEffect} from "react";
import icon_dropdown from "../../assets/icon-dropdown.svg";
import HourlyForecastDropdown from "../dropdowns/HourlyForecastDropdown";
import { type HourlyForecast } from "../../services/weatherApi";
import { getDayOptions, getWeatherForDay, formatDateForDisplay } from "../../utils/weatherUtils";
import { type DayOption, type WeatherItem } from "../../utils/types";




const HourlyWeatherPanel = ({weatherData}: {weatherData:HourlyForecast}) => {
    // console.log("hourly data: ", weatherData);
    
   const [selectedDate, setSelectedDate]  = useState<string>('');
   const [dayOptions, setDayOptions] = useState<DayOption[]>([]);
   const [weatherItems, setWeatherItems] = useState<WeatherItem[]>([]);
   const [isExpanded, setIsExpanded] = useState(false);

   useEffect (()=> {
    if (weatherData.time.length > 0){
        const currentDate = weatherData.time[0].split("T")[0];
        setSelectedDate(currentDate);

        const options = getDayOptions(currentDate);
        setDayOptions(options);

        const items = getWeatherForDay(weatherData, currentDate);
        setWeatherItems(items);
    }
   },  [weatherData])
    const handleDateChange = (event: React.MouseEvent<HTMLButtonElement>) => {
        const newDate = event.currentTarget.value;
        setSelectedDate(newDate);
        setIsExpanded(false)

        const items = getWeatherForDay(weatherData, newDate);
        setWeatherItems(items);
   };

   if (weatherItems.length === 0){
    return <div>
        Loading weather data...
    </div>
   }

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    
    return(
        <div className="px-4 pt-3 pb-8 lg:pb-0  lg:w-1/3 lg:pt-8 lg:flex lg:grow lg:h-full">
            <div className={` bg-(--brand-neutral) font-(family-name:--dm-sans) text-(--brand-text) px-4 rounded-[20px] 
                py-7 lg:w-full lg:py-[31.6px]`}>
            <div className="flex items-center justify-between pb-[22.5px] ">
                <h3 className="font-semibold text-[20px] text-left "
                    >Hourly forecast</h3>
                <div  className="relative">
                    <button
                    onClick = {toggleExpand}
                    className={`text-[16px] rounded-[8px] cursor-pointer py-2 pl-4 pr-10 bg-(--brand-mid)
                        capitalize`}
                    >
                       {formatDateForDisplay(selectedDate)}

                    </button>
                    <img
                    onClick={toggleExpand}
                    src = {icon_dropdown}
                    alt = "dropdown icon"
                    className="w-3 absolute top-4 right-4 cursor-pointer"
                    />
                    {
                        isExpanded && (
                            <HourlyForecastDropdown days = {dayOptions} onSelectDay={handleDateChange} />
                        )
                    }
                </div>
            </div>
            <div className="gap-4 flex flex-col">
                {weatherItems.map((data, index) =>(
                    <HourlyWeatherCard key = {index} {...data} />
                ))}
            </div>
        </div>
        </div>
    );
}

export default HourlyWeatherPanel;