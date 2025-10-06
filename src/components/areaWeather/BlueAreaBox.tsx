import { useUnit } from "../../context/UnitContext";
import type { CurrentWeather } from "../../services/weatherApi";
import { formatTemperature, getWeatherIcon } from "../../utils/weatherUtils";

interface BlueAreaBoxProps {
    data? :CurrentWeather;
}

const BlueAreaBox = ({data}: BlueAreaBoxProps) => {
    const {unit} = useUnit()
    return (
        <div className= {` font-(family-name:--dm-sans)  lg:px-0 lg:py-0 `}>
            <div className= {`w-full bg-linear-to-r from-(--brand-blue) to-(--brand-dark-blue)
        flex flex-col justify-center items-center px-4 py-10 rounded-[12px] gap-4 md:flex-row md:py-27 md:justify-between md:pr-8`}>
            <div className="md:text-left">
                <h3 className = "text-[28px] font-bold">
                Berlin, Germany
            </h3>
            <p>
                Tuesday, Aug 5, 2025
            </p>

            </div>
            <div className = "flex items-center justify_between">
                <img
                src = {data ? getWeatherIcon(data.weather_code) : ""}
                alt = "sunny icon"
                className="w-30"
                />
                <p
                className="text-8xl font-semibold italic"
                >{`${unit == "metric" ? data?.temperature_2m ?? "--" : formatTemperature(data?.temperature_2m ?? 0, "imperial")} \u00B0`}</p>

            </div>
            </div>

        </div>
    );
}

export default BlueAreaBox;