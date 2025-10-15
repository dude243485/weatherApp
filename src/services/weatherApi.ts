import axios from "axios";

//API base URL
const BASE_URL = "https:api.open-meteo.com/v1";

//TypeScript interfaces for responses
export interface CurrentWeather {
    time: string;
    temperature: number;
    windspeed: number;
    winddirection: number;
    weathercode: number;
    is_day: boolean;
    
    }

export interface DailyForecast{
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    precipitation_sum: number[];
    weather_code: number[];
    wind_speed_10m_dominant: number[];
}

export interface HourlyForecast{
    time: string[];
    temperature_2m: number[];
    weather_code: number[];
    relativehumidity_2m : number[];
}

export interface WeatherResponse {
    latitude : number;
    longitude: number;
    generationtime_ms: number;
    utc_offset_seconds: number;
    timezone: string;
    timezone_abbreviation: string;
    elevation: number;
    current_weather? : CurrentWeather;
    daily? : DailyForecast;
    hourly? : HourlyForecast;
}

export interface WeatherRequestParams {
    latitude : number;
    longitude : number;
    current_weather?: boolean;
    hourly?: string[];
    daily?: string[];
    timezone?: string;
    forecast_days?: number;
}

class WeatherApiService {
    private client = axios.create({
        baseURL: BASE_URL,
        timeout: 10000,
    });

    async getWeather(params: WeatherRequestParams): Promise<WeatherResponse>{
        try{
            const response = await this.client.get<WeatherResponse>("/forecast",
                {
                    params: {
                        latitude: params.latitude,
                        longitude: params.longitude,
                        current_weather: params.current_weather ?? true,
                        hourly : params.hourly?.join(','),
                        daily: params.daily?.join(','),
                        timezone: params.timezone || 'auto',
                        forecast_days: params.forecast_days || 7,
                    },
                }
            );

            return response.data;
        }catch (error) {
            console.error("Error fetching weather data: ", error);
            throw new Error("Failed to fetch weather data");

        }
    }

    getDefaultParams(latitude: number, longitude: number): WeatherRequestParams {
        return{
            latitude,
            longitude,
            current_weather: true,
            // current_weather : []
            hourly: ['temperature_2m', 'relativehumidity_2m', 'apparent_temperature',
        'precipitation_probability', 'weather_code', 'wind_speed_10m'],
            daily : [
                'temperature_2m_max', 'temperature_2m_min', 'apparent_temperature_max',
                'apparent_temperature_min', 'precipitation_sum', 'weather_code',
                 'wind_speed_10m_max'
            ],
            forecast_days: 7,
        };
    }
}

export const weatherApi = new WeatherApiService();