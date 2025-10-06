interface weatherDataInterface {
    title: string,
    value : number,
    suffix : string
}

const WeatherCard = ({title, value, suffix}:weatherDataInterface) => {
    return(
        <div className= {`bg-(--brand-neutral) font-(family-name:--dm-sans) px-5 text-left py-5
        gap-6 flex flex-col text-(--brand-text) border-1 border-(--brand-outline) w-[40vw] rounded-[12px] grow
        md:w-[23%]`}>
            <p className = "text-[18px] font-light">
                {title}
            </p>
            <p className="text-[32px] font-light">
                {value}{suffix}
            </p>
        </div>
    );
}

export default WeatherCard