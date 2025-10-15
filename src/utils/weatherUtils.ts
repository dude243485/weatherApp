import { format } from "date-fns";
import icon_drizzle from "../assets/icon-drizzle.webp";
import icon_rain from "../assets/icon-rain.webp";
import icon_sun from "../assets/icon-sunny.webp";
import icon_partly_cloudy from "../assets/icon-partly-cloudy.webp";
import icon_stormy from "../assets/icon-storm.webp";
import icon_snow from "../assets/icon-snow.webp";
import icon_overcast from "../assets/icon-overcast.webp";

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
