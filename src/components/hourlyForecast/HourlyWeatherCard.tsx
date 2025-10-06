interface hourlyForecastInterface {
    time: number;
    icon :string;
    temp : number;
}

const HourlyWeatherCard = ({time, icon, temp} : hourlyForecastInterface) => {
    return (
        <div className= {`bg-(--brand-mid) font-(family-name:--dm-sans) flex text-(--brand-text) border-1 
        border-(--brand-outline) rounded-[8px] px-3 py-[10px] justify-center items-center gap-2 md:w-full  lg:py-[10px]`}>
            <img 
            src = {icon}
            className="w-10"
            alt = "weather icon"
            />
            <p className="text-[20px] w-full text-left">
                {`${time} PM`}
            </p>
            <p className="text-[16px]">
                {temp + "\u00B0"}
            </p>
            
        </div>
    );
}

export default HourlyWeatherCard