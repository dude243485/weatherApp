import { useUnit } from "../../context/UnitContext";
import type { CurrentWeather } from "../../services/weatherApi";
import { formatTemperature, getWeatherIcon } from "../../utils/weatherUtils";
import { type City } from "../../utils/types";

interface BlueAreaBoxProps {
    data? :CurrentWeather;
    city?: City | null;
}

const BlueAreaBox = ({data, city}: BlueAreaBoxProps) => {
    const {unit} = useUnit()
    return (
        <div className= {` font-(family-name:--dm-sans)  lg:px-0 lg:py-0 `}>
            <div className= {`w-full bg-linear-to-r from-(--brand-blue) to-(--brand-dark-blue)
        flex flex-col justify-center items-center px-4 py-10 rounded-[12px] gap-4 md:flex-row md:py-27 md:justify-between md:pr-8`}>
            <div className="md:text-left">
                <h3 className = "text-[28px] font-bold">
                {/* {Berlin, Germany {city.name}} */}
                {city ? `${city.name}, ${city.country}` : "Your Location"}
            </h3>
            <p>
                {/* Tuesday, Aug 5, 2025 */}
                 {Date.now() ? new Date().toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    year: "numeric",}) : ""}
            </p>

            </div>
            <div className = "flex items-center justify_between">
                <img
                src = {data ? getWeatherIcon(data.weathercode) : ""}
                alt = "weather icon"
                className="w-30"
                />
                <p
                className="text-8xl font-semibold italic"
                >{`${unit == "metric" ?  formatTemperature(data?.temperature ?? 0, "metric")  : formatTemperature(data?.temperature ?? 0, "imperial")} `}</p>

            </div>
            </div>

        </div>
    );
}

export default BlueAreaBox;