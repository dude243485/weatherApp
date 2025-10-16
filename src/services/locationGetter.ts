interface LocationData {
    city : string;
    country : string;
    latitude: number;
    longitude: number;
}

async function getCityFromCoords(lat: number, lon: number): Promise<LocationData | null > {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&addressdetails=1`
        );

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();

        //Extract city name from address components
        const address = data.address;
        const city = address.city || address.town || address.village || address.municipality || address.county;

        if (!city) {
            throw new Error('City name not found in response');
        }
        return {
            city : city,
            country : address.country,
            latitude: lat,
            longitude: lon,
        };
    } catch (error) {
        console.error('Error reverse geocoding:', error);
        return null
    }
}

export default getCityFromCoords;