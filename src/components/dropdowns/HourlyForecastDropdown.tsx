import type { DayOption } from "../../utils/types";

interface hourlyProps {
    days : DayOption[];
    onSelectDay : (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const HourlyForecastDropdown = ({days, onSelectDay} : hourlyProps) => {
    return (
        <div className="absolute top-12 -right-4 z-10 px-4 min-w-max w-[214px]">
                <div className= {`bg-(--brand-neutral) font-(family-name:--dm-sans) text-(--brand-text) px-4 rounded-[12px]
                    border-1 border-(--brand-outline) p-2  w-full flex justify-center items-center flex-col gap-1`}>
                        {/* {days.map((day, index) => (
                            <div key={index} className="py-2 px-4 hover:bg-(--brand-mid) cursor-pointer">
                                {day}
                            </div>
                        ))} */}
                        {
                            days.map((day, index) => (
                                <button
                                onClick = {(e) => onSelectDay(e)}
                                 key = {index}
                                 value = {day.date}
                                 className="w-full text-left py-[10px] px-2 text-16 transition-all duration-400 delay-100 hover:bg-(--brand-mid) rounded-[8px] capitalize">
                                    {day.display}
                                </button>
                            ))
                        }
                        
                </div>

        </div>
        

    );
}

export default HourlyForecastDropdown;
    