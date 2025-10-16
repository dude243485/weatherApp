import appLogo from "../../assets/logo.svg";
import icon_unit from "../../assets/icon-units.svg";
import icon_dropdowm from "../../assets/icon-dropdown.svg";
import { useState } from "react";
import UnitsDropdown from "../dropdowns/UnitsDropdown";

// import React from "react";



const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleDropdown = () => {
        //this is receiving a function that receives the previous state 
        //as an argument and returns the opposite.
        setIsOpen((prev) => !prev);
    }
    // const [isClicked, setClicked] = useState(false)
    
    return(
        <div className="relative">
        <div className="flex flex-row items-center justify-between w-full md:px-4 lg:px-30">
            <div className = "flex items-center justify-center">
                <img 
                src = { appLogo}
                alt = "app logo"
                className= "h-7"
                />
            </div>
            <button 
            onClick = {() => {
                toggleDropdown()                
            } }
            // onMouseEnter={() => setIsOpen(true)}
            // onMouseLeave={() => {
            //     if (!isClicked) setIsOpen(false)
            // }}
            className= {`flex flex-row justify-between py-1.5 px-2  rounded-[6px] gap-1 bg-(--brand-neutral)
                 hover:bg-(--brand-mid) transition-all duration-400 delay-100 cursor-pointer`}
            >
                <img 
                src = {icon_unit}
                alt = "units"
                className="w-4"
                />
                <p className="text-[14px] ">units</p>
                <img
                src = {icon_dropdowm}
                alt = "dropdown icon"
                className="w-3"
                />
                
            </button>
            

        </div>
        {/*dropdown menu*/}
            {   
                isOpen && (
                    <UnitsDropdown isOpen = {isOpen} setIsOpen={ toggleDropdown } />
                )
            }
        </div>
    );
}

export default Header