import icon_drizzle from "../assets/icon-drizzle.webp";
import icon_rain from "../assets/icon-rain.webp";
import icon_sun from "../assets/icon-sunny.webp";
import icon_partly_cloudy from "../assets/icon-partly-cloudy.webp";
import icon_stormy from "../assets/icon-storm.webp";
import icon_snow from "../assets/icon-snow.webp";
import icon_overcast from "../assets/icon-overcast.webp";

interface forecastDataInterface {
    day : string;
    icon : string;
    lowTemp : number;
    highTemp : number;
}

const dailyForecastData : forecastDataInterface[]  = [
    {
        day : "Tue",
        icon : icon_drizzle,
        lowTemp : 20,
        highTemp : 14
    },
    {
        day : "Wed",
        icon : icon_rain,
        lowTemp: 21,
        highTemp : 15
    },
    {
        day : "Thu",
        icon : icon_sun,
        lowTemp : 24,
        highTemp : 14,
    },
    {
        day : "Fri",
        icon : icon_partly_cloudy,
        lowTemp : 25,
        highTemp : 13,
    },
    {
        day : "Sat",
        icon : icon_stormy,
        lowTemp : 21,
        highTemp : 16,
    },
    {
        day : "Sun",
        icon : icon_snow,
        lowTemp : 25,
        highTemp : 16,
    },
    {
        day: "Mon",
        icon : icon_overcast,
        lowTemp : 24,
        highTemp : 15,
    }

]

export default dailyForecastData;