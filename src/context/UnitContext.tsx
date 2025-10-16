import  { createContext, useState, useContext } from "react";
// import { ReactNode } from "react";


type Unit = "metric" | "imperial";

interface UnitContextType {
    unit : Unit;
    setUnit : (unit : Unit) => void; //manually set unit
    toggleUnit : () => void; //flip between units
}


const UnitContext = createContext<UnitContextType | undefined>(undefined);


export const UnitProvider = ({ children }: { children: any }) => {
    const [unit, setUnit] = useState<Unit>("metric");

    const toggleUnit = () => {
        setUnit((prev) => (prev === "metric" ? "imperial" : "metric"));
    };

    return (
        <UnitContext.Provider value={{ unit, setUnit, toggleUnit }}>
            {children}
        </UnitContext.Provider>
    );
};

export const useUnit = () :UnitContextType => {
    const context = useContext(UnitContext);
    if (!context) {
        throw new Error("useUnit must be used within a UnitProvider");
    }
    return context
};

