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