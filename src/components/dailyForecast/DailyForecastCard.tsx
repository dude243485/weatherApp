interface forecastDataInterface {
    day : string;
    icon : string;
    lowTemp : number | string;
    highTemp : number | string;
}


const DailyForecastCard = ({day, icon, lowTemp, highTemp} : forecastDataInterface) => {
    return(
        <div className = {`w-[30%] max-w-[30%] bg-(--brand-neutral) font-(family-name:--dm-sans) flex flex-col text-(--brand-text) border-1 border-(--brand-outline)
        rounded-[12px] grow gap-4 px-[10px] py-4 items-center justify-center md:w-[12%] lg:gap-2 lg:py-3`}>
            <p className="text-[18px]">{day}</p>
            <img 
            src = {icon}
            alt = "forecast icon"
            className="w-15"
            />
            <div className="flex justify-between items-center text-[16px] w-full">
                <p>{lowTemp }</p>
                <p>{highTemp}</p>
            </div>

        </div>
    );
}

export default DailyForecastCard