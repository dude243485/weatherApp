export interface City {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    country: string;
    admin1?: string;
}

export interface SearchBarProps {
    onCitySelect: (city: City) => void
    placeholder?: string;
    onClick: () => void
}
export interface DayOption {
    date: string;
    display: string;
    isToday: boolean;
}
export interface WeatherItem {
    time: string;
    temperature: number;
    weatherCode: number;
    displayTime: string;
}