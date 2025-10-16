import { type WeatherItem } from "../../utils/types";
import { formatTemperature, getWeatherIcon } from "../../utils/weatherUtils";
import { useUnit } from "../../context/UnitContext";



const HourlyWeatherCard = ({temperature, weatherCode, displayTime} : WeatherItem) => {
    const {unit} = useUnit()
    return (
        <div className= {`bg-(--brand-mid) font-(family-name:--dm-sans) flex text-(--brand-text) border-1 
        border-(--brand-outline) rounded-[8px] px-3 py-[10px] justify-center items-center gap-2 md:w-full  lg:py-[10px]`}>
            <img 
            src = {getWeatherIcon(weatherCode)}
            className="w-10"
            alt = "weather icon"
            />
            <p className="text-[20px] w-full text-left">
                {`${displayTime}`}
            </p>
            <p className="text-[16px]">
                {formatTemperature(temperature, unit)}
            </p>
            
        </div>
    );
}

export default HourlyWeatherCard