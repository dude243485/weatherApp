import { format } from "date-fns";
import icon_drizzle from "../assets/icon-drizzle.webp";
import icon_rain from "../assets/icon-rain.webp";
import icon_sun from "../assets/icon-sunny.webp";
import icon_partly_cloudy from "../assets/icon-partly-cloudy.webp";
import icon_stormy from "../assets/icon-storm.webp";
import icon_snow from "../assets/icon-snow.webp";
import icon_overcast from "../assets/icon-overcast.webp";
import { type DayOption, type WeatherItem } from "./types";
import type { HourlyForecast } from "../services/weatherApi";

export const weatherCodeMap: Record<number, {description: string, icon:string}> = {
    0: {description: "Clear sky", icon: icon_sun },
    1: {description : "Mainly clear", icon: icon_sun},
    2: {description: "Partly cloudy", icon: icon_partly_cloudy},
    3: {description: "Overcast", icon : icon_overcast},
    45: {description: "Fog", icon: icon_overcast},
    48: { description: 'Depositing rime fog', icon: '🌫️' },
  51: { description: 'Light drizzle', icon: icon_drizzle },
  53: { description: 'Moderate drizzle', icon: icon_drizzle },
  55: { description: 'Dense drizzle', icon: icon_drizzle },
  56: { description: 'Light freezing drizzle', icon: icon_drizzle },
  57: { description: 'Dense freezing drizzle', icon: icon_drizzle },
  61: { description: 'Slight rain', icon: icon_rain },
  63: { description: 'Moderate rain', icon: icon_rain },
  65: { description: 'Heavy rain', icon: icon_rain},
  66: { description: 'Light freezing rain', icon: icon_rain},
  67: { description: 'Heavy freezing rain', icon: icon_rain },
  71: { description: 'Slight snow fall', icon: icon_snow },
  73: { description: 'Moderate snow fall', icon: icon_snow },
  75: { description: 'Heavy snow fall', icon: icon_snow },
  77: { description: 'Snow grains', icon: icon_snow },
  80: { description: 'Slight rain showers', icon: icon_rain },
  81: { description: 'Moderate rain showers', icon: icon_rain },
  82: { description: 'Violent rain showers', icon: icon_rain },
  85: { description: 'Slight snow showers', icon: icon_snow },
  86: { description: 'Heavy snow showers', icon: icon_snow},
  95: { description: 'Thunderstorm', icon: icon_stormy },
  96: { description: 'Thunderstorm with slight hail', icon: icon_stormy },
  99: { description: 'Thunderstorm with heavy hail', icon: icon_stormy },
};

export const getWeatherdescription = (code: number): string => {
    return weatherCodeMap[code]?.description || "Unknown";
}
export const getWeatherIcon = (code: number): string => {
    return weatherCodeMap[code]?.icon || icon_sun;
}

export const formatTemperature = (temp: number, unit: "metric" | "imperial"): string => {
    if (unit === "imperial"){
        return `${Math.round((temp * 9/5) + 32)}\u00B0F`
    }
    return `${Math.round(temp)}\u00B0C`;
};

export const formatTime = (timeString: string, formatStr: string = "HH:mm"): string => {
    return format(new Date(timeString), formatStr);
}

export const formatDate = (dateString: string, formatStr: string = "EEE,MMM d"): string =>{
    return format(new Date(dateString), formatStr);
}

export const formatSpeed = (speed: number, unit: "metric" | "imperial"): string => {
    if (unit === "imperial"){
        return `${(speed / 1.609).toFixed(1)}`;
    }
    return `${speed.toFixed(1)}`; 
}

export const formatLength = (length: number, unit: "metric" | "imperial"): string => {
    if (unit === "imperial"){
        return `${(length / 25.4).toFixed(1)}`;
    }
    return `${length.toFixed(1)}`;
}

export const formatTime2 = (isoString : string): string => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        hour12: true
    }).toLowerCase();
}

export const formatDateForDisplay = (isoString: string): string => {
    const date =  new Date(isoString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (date.toDateString() === today.toDateString()){
        return 'Today';
    }else if (date.toDateString() === tomorrow.toDateString()){
        return 'Tomorrow';
    }else{
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        })
    }
}

export const getDayOptions = (startDate: string): DayOption[] => {
    const options: DayOption[] = [];
    const start = new Date(startDate);

    for (let i = 0; i < 7; i++){
        const currentDate = new Date(start);
        currentDate.setDate(start.getDate() + i);

        const dateString = currentDate.toISOString().split('T')[0];

        options.push({
            date : dateString,
            display: formatDateForDisplay(dateString + 'T00:00'),
            isToday: i ===0
        });
 
    }
    return options;
}

function to12Hour(time24: string): string {
    const [hours, minutes] = time24.split(":");
    const hour = parseInt(hours);
    const period = hour >= 12? 'PM' : 'AM';
    const hour12 = hour % 12 || 12;

    return `${hour12}:${minutes} ${period}`;
}
export const getWeatherForDay = (
    weatherData : HourlyForecast,
    selectedDate: string
): WeatherItem[] => {
    const items : WeatherItem[] = [];
    const targetDate = selectedDate.split('T')[0];
    const now = new Date();

    for (let i = 0; i < weatherData.time.length; i++){
        const time = weatherData.time[i];
        
        if ((time.startsWith(targetDate))&& (new Date(time) >= now)){
            items.push({
                time: time,
                temperature: weatherData.temperature_2m[i],
                weatherCode : weatherData.weather_code[i],
                displayTime: to12Hour(formatTime(time))
            })
        }
        if (items.length >= 8) break;
    }
    return items;
}
