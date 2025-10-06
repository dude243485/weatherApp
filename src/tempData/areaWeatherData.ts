interface dataInterface {
    title: string,
    value : number,
    suffix : string
}

const weatherData : dataInterface[] = [
    {
        title : "Feels Like",
        value: 18,
        suffix : "\u00B0"
    }, 
    {
        title : "Humidity",
        value : 46,
        suffix :"%"
    },
    {
        title : "Wind",
        value : 14,
        suffix : " km/h"
    },
    {
        title : "Precipitation",
        value : 0,
        suffix : " mm"
    },
]

export default weatherData;