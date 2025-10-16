import { useState, useEffect } from "react";
import {weatherApi, type WeatherResponse, type WeatherRequestParams } from "../services/weatherApi"

interface UseWeatherProps {
    latitude: number;
    longitude: number;
    params?: Partial<WeatherRequestParams>;
}

export const useWeather = ({latitude, longitude, params}: UseWeatherProps) => {
    const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchWeather = async () => {
            if (!latitude || !longitude) return ;
            setLoading(true);
            setError(null);

            try{
                const requestParams = params || weatherApi.getDefaultParams(latitude, longitude);
                const data = await weatherApi.getWeather({
                    latitude,
                    longitude,
                    ...requestParams,
                });
                setWeatherData(data);
            } catch (err){
                setError(err instanceof Error ? err.message : "Failed to fetch weather data")
            } finally{
                setLoading(false);
            }
        };

        fetchWeather();
    }, [latitude, longitude, params]);

    const refetch = async() => {
        if (!latitude || !longitude) return;

        setLoading(true);
        setError(null);

        try{
            const requestParams = params || weatherApi.getDefaultParams(latitude, longitude);
            const data = await weatherApi.getWeather({
                latitude,
                longitude,
                ...requestParams,
            });
            setWeatherData(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to fetch weather data");

        } finally{
            setLoading(false);
        }
    };

    return{
        weatherData,
        loading,
        error,
        refetch,
    }
}