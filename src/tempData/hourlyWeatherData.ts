import icon_drizzle from "../assets/icon-drizzle.webp";
import icon_rain from "../assets/icon-rain.webp";
import icon_sun from "../assets/icon-sunny.webp";
import icon_partly_cloudy from "../assets/icon-partly-cloudy.webp";
import icon_stormy from "../assets/icon-storm.webp";
import icon_snow from "../assets/icon-snow.webp";
import icon_overcast from "../assets/icon-overcast.webp";

// interface hourlyDataInterface {
//     time: number;
//     icon : string;
//     temp : number;
// }

const hourlyWeatherData = {
    "tuesday": [
        { time: 3, temp: 20, icon: icon_overcast },
        { time: 4, temp : 20, icon: icon_partly_cloudy },
        { time: 5, temp : 19, icon: icon_sun },
        { time: 6, temp : 19, icon: icon_overcast },
        { time: 7, temp : 18, icon: icon_snow },
        { time: 8, temp : 18, icon: icon_drizzle },
        { time: 9, temp : 17, icon: icon_rain },
        { time: 10, temp : 17, icon: icon_stormy },
    ],
    "wednesday" : [
        {time : 3, temp : 23, icon : icon_sun},
        {time : 4, temp : 21, icon : icon_partly_cloudy},
        {time : 5, temp : 20, icon : icon_sun},
        {time : 6, temp : 20, icon : icon_rain},
        {time : 7, temp : 19, icon : icon_rain},
        {time : 8, temp : 19, icon : icon_drizzle},
        {time : 9, temp : 17, icon : icon_rain},
        {time : 10, temp : 16, icon : icon_stormy},
    ],
    "thursday" : [
        {time : 3, temp : 19, icon : icon_rain},
        {time : 4, temp : 18, icon : icon_drizzle},
        {time : 5, temp : 18, icon : icon_drizzle},
        {time : 6, temp : 20, icon : icon_overcast},
        {time : 7, temp : 20, icon : icon_overcast},
        {time : 8, temp : 19, icon : icon_drizzle},
        {time : 9, temp : 19, icon : icon_rain},
        {time : 10, temp : 20, icon : icon_stormy},
    ],
    "friday" : [
        {time : 3, temp : 25, icon : icon_overcast},
        {time : 4, temp : 25, icon : icon_partly_cloudy},
        {time : 5, temp : 24, icon : icon_sun},
        {time : 6, temp : 24, icon : icon_sun},
        {time : 7, temp : 23, icon : icon_rain},
        {time : 8, temp : 23, icon : icon_drizzle},
        {time : 9, temp : 22, icon : icon_rain},
        {time : 10, temp : 22, icon : icon_stormy},
    ],
    "saturday" : [
        {time : 3, temp : 21, icon : icon_partly_cloudy},
        {time : 4, temp : 20, icon : icon_partly_cloudy},
        {time : 5, temp : 18, icon : icon_drizzle},
        {time : 6, temp : 17, icon : icon_snow},
        {time : 7, temp : 17, icon : icon_snow},
        {time : 8, temp : 16, icon : icon_snow},
        {time : 9, temp : 18, icon : icon_rain},
        {time : 10, temp : 17, icon : icon_stormy},
    ],
    "sunday" : [
        {time : 3, temp : 25, icon : icon_overcast},
        {time : 4, temp : 25, icon : icon_sun},
        {time : 5, temp : 24, icon : icon_sun},
        {time : 6, temp : 23, icon : icon_partly_cloudy},
        {time : 7, temp : 21, icon : icon_drizzle},
        {time : 8, temp : 21, icon : icon_drizzle},
        {time : 9, temp : 20, icon : icon_rain},
        {time : 10, temp : 19, icon : icon_stormy},
    ],
    "monday" : [
        {time : 3, temp : 24, icon : icon_overcast},
        {time : 4, temp : 24, icon : icon_partly_cloudy},
        {time : 5, temp : 23, icon : icon_sun},
        {time : 6, temp : 23, icon : icon_overcast},
        {time : 7, temp : 22, icon : icon_sun},
        {time : 8, temp : 22, icon : icon_drizzle},
        {time : 9, temp : 21, icon : icon_rain},
        {time : 10, temp : 21, icon : icon_partly_cloudy},
    ],
}

export default hourlyWeatherData;