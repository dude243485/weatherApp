import icon_check from "../../assets/icon-checkmark.svg";
import { useUnit } from "../../context/UnitContext";

interface DropdownProps {
    isOpen: boolean;
    setIsOpen: () => void;
}



const UnitsDropdown = ({isOpen, setIsOpen}: DropdownProps) => {
    // const [unitValue, setUnitValue] = useState<"metric" | "imperial">("metric")
    // const toggleUnit = () => {
    //     if (unitValue === "metric"){
    //         setUnitValue("imperial");
    //     }
    //     else {setUnitValue("metric")}
    //     setIsOpen();
        
    // }

    const { unit, toggleUnit } = useUnit();

    //to change the state then close dropdown
    const toggleOnClick = () =>{
        toggleUnit();
        setIsOpen();
    }

    if (!isOpen) return null; //when dropDown is closed
    return(
        <div className=" absolute z-30  w-full  right-0 md:w-[300px]  md:absolute lg:right-30 md:right-4 md:px-0">
            <div className=" w-full mt-2 p-4 text-left rounded shadow-lg h-screen md:h-auto flex flex-col  bg-(--brand-neutral) ">
            <button 
            onClick = {toggleOnClick}
            className= {`font-bold text-left w-full py-3 px-3 rounded-[6px] cursor-pointer transition-all duration-400 
            delay-100 hover:bg-(--brand-mid) capitalize`}>
                Switch to {unit === "metric" ? "imperial" : "metric"}
            </button>
            <div className="w-full py-1 border-b border-(--brand-outline)">
                <h5 className="px-3 py-1.5 w-full text-bold text-[90%]">Temperature</h5>
                <ul>
                    <li
                    className= {`px-3 py-1.5 rounded-[6px] w-full flex items-center justify-between
                        ${unit === "metric" ? "bg-(--brand-mid)" :"bg-(--brand-neutral)"}`}
                    >
                        <p>{`Celsius (\u00B0C)`}</p>
                        <img 
                        src = {icon_check}
                        alt = "checked"
                        className={`w-3 ${unit === "metric" ? "block": "hidden"}`}
                        />
                    </li>
                    <li
                    className= {`px-3 py-1.5 rounded-[6px] w-full flex items-center justify-between
                        ${unit !== "metric" ? "bg-(--brand-mid)" :"bg-(--brand-neutral)"}`}
                    >
                        <p>{`Fahrenheit (\u00B0F)`}</p>
                        <img 
                        src = {icon_check}
                        alt = "checked"
                        className={`w-3 ${unit !== "metric" ? "block": "hidden"}`}
                        />
                    </li>
                    
                </ul>
            </div>
            <div className="w-full py-1 border-b border-(--brand-outline)">
                <h5 className="px-3 py-1.5 w-full text-bold text-[90%]">Wind Speed</h5>
                <ul>
                    <li
                    className= {`px-3 py-1.5 rounded-[6px] w-full flex items-center justify-between
                        ${unit === "metric" ? "bg-(--brand-mid)" :"bg-(--brand-neutral)"}`}
                    >
                        <p>Km/h</p>
                        <img 
                        src = {icon_check}
                        alt = "checked"
                        className={`w-3 ${unit === "metric" ? "block": "hidden"}`}
                        />
                    </li>
                    <li
                    className= {`px-3 py-1.5 rounded-[6px] w-full flex items-center justify-between
                        ${unit !== "metric" ? "bg-(--brand-mid)" :"bg-(--brand-neutral)"}`}
                    >
                        <p>mph</p>
                        <img 
                        src = {icon_check}
                        alt = "checked"
                        className={`w-3 ${unit !== "metric" ? "block": "hidden"}`}
                        />
                    </li>
                    
                </ul>
            </div>
            <div className="w-full py-1 border-b border-(--brand-outline)">
                <h5 className="px-3 py-1.5 w-full text-bold text-[90%]">Precipitation</h5>
                <ul>
                    <li
                    className= {`px-3 py-1.5 rounded-[6px] w-full flex items-center justify-between
                        ${unit === "metric" ? "bg-(--brand-mid)" :"bg-(--brand-neutral)"}`}
                    >
                        <p>{`Millimeters (mm)`}</p>
                        <img 
                        src = {icon_check}
                        alt = "checked"
                        className={`w-3 ${unit === "metric" ? "block": "hidden"}`}
                        />
                    </li>
                    <li
                    className= {`px-3 py-1.5 rounded-[6px] w-full flex items-center justify-between
                        ${unit !== "metric" ? "bg-(--brand-mid)" :"bg-(--brand-neutral)"}`}
                    >
                        <p>{`Inches (in)`}</p>
                        <img 
                        src = {icon_check}
                        alt = "checked"
                        className={`w-3 ${unit !== "metric" ? "block": "hidden"}`}
                        />
                    </li>
                    
                </ul>
            </div>
            
        </div>
        </div>
    );
}

export default UnitsDropdown;