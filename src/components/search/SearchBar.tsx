import icon_search from "../../assets/icon-search.svg"
import { useState, useRef, useEffect} from "react";
import axios from "axios";
import { type City, type SearchBarProps } from "../../utils/types";

const SearchBar: React.FC<SearchBarProps> = ({
    onCitySelect,
    placeholder = "Search for a city",
    onClick
}) => {
    const [query, setQuery] = useState("");
    const [cities, setCities] = useState<City[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const skipSearchRef = useRef(false);
    const abortControllerRef = useRef<AbortController | null>(null);

    //Debounce search to avoid too many API calls
    useEffect(() => {
        if (skipSearchRef.current){
            skipSearchRef.current = false;
            return;
        }
        const searchCities = async () =>{
            if (query.trim().length < 2){
                setCities([]);
                setShowDropdown(false);
                return;
            }
            abortControllerRef.current?.abort(); //abort previous request if any
            const controller = new AbortController();
            abortControllerRef.current = controller;

            setIsLoading(true);
            try{
                const response = await axios.get(
                    "https://geocoding-api.open-meteo.com/v1/search",
                    {
                        params: {
                            name: query,
                            count: 10, //get 10 matching cities in response
                            language: "en",
                            format: "json"
                        },
                        signal: controller.signal
                    }
                );
                if (controller.signal.aborted) return; //if aborted, do nothing
                const cityData: City[] = (response.data.results || []).map((item:any)=>({
                    id: item.id,
                    name: item.name,
                    latitude: item.latitude,
                    longitude: item.longitude,
                    country: item.country,
                    admin1: item.admin1
                }));

                setCities(cityData);
                setShowDropdown(cityData.length> 0) //show the dropdown if the city length is not zero
                setSelectedIndex(-1);
            }catch(error){
                if (axios.isAxiosError(error) && (error.code === 'ERR_CANCELED' || error.name === 'canceledError' || error.message === 'canceled')) {
                    return;
                }
                console.error("Error fetching cities:", error);
                setCities([]);
                setShowDropdown(false);
            }finally{
                setIsLoading(false);
            }
        };

        const timeoutId = setTimeout(searchCities, 300);
        return () => clearTimeout(timeoutId)
    }, [query])

    //close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event : MouseEvent) => {
            if (
                dropdownRef.current && 
                !dropdownRef.current.contains(event.target as Node) &&
                inputRef.current !== event.target
            ){
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);

    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    }
    const handleCitySelect = (city: City) => {
        skipSearchRef.current = true;
        abortControllerRef.current?.abort(); //abort any ongoing request
        abortControllerRef.current = null;
        setQuery(city.name);
        setSelectedIndex(-1);
        setCities([]);
        setShowDropdown(false);
        inputRef.current?.blur();
        onCitySelect(city);
        
    }
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!showDropdown) return;

        switch(e.key){
            case "ArrowDown":
                e.preventDefault();
                setSelectedIndex(prev => 
                    prev < Math.min(cities.length, 4) - 1 ? prev + 1 : prev
                );
                break;

            case "ArrowUp":
                e.preventDefault();
                setSelectedIndex(prev => prev > 0? prev -1 : -1)
                break;

            case "Enter":
                e.preventDefault();
                if (selectedIndex >= 0 && selectedIndex < Math.min(cities.length, 4)) {
                    handleCitySelect(cities[selectedIndex]);
                }
                break;

            case "Escape":
                setShowDropdown(false);
                setSelectedIndex(-1);
                break;
        }
    }

    const getDisplayName = ((city: City) => {
        return city.admin1? `${city.name}, ${city.admin1}, ${city.country}`:
        `${city.name}, ${city.country}`
    })

    const displayedCities = cities.slice(0, 4); //maximum of 4 cities

    return(
        <div
        ref = {dropdownRef}
        className = {`w-full relative font-(family-name:--dm-sans) flex flex-col gap-3 px-4  md:flex-row md:px-6 lg:px-80`}
        >
            <div className= {`  w-full relative `}>
                <img
                alt = "search icon"
                src = {icon_search}
                className="w-5 absolute top-1/2 left-6 -translate-y-1/2"
                 />
                <input
                ref = {inputRef}
                value = {query}
                onChange = {handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder= {placeholder}
                onFocus = {() => query.length >= 2 && cities.length > 0 &&  setShowDropdown(true)}
                aria-autocomplete="list"
                aria-expanded = {showDropdown}
                type ="text"
                className= {`bg-(--brand-neutral)  outline-none w-full pl-15 pr-6 py-4 rounded-[12px]
                    hover:bg-(--brand-mid) focus:ring-1 focus:ring-white focus:border-(--brand-dark) focus:border-3
                    transition-all duration-400 delay-100 md:w-full
                    `}
                />
                {showDropdown && (
                <div className= {`absolute top-15 z-20  left-0 right-0 `} >
                    {isLoading && (displayedCities.length == 0) && (
                        <div className="bg-(--brand-neutral) rounded-[12px] flex flex-row gap-1 px-2 py-2">
                            <p>Search in progress</p>
                        </div>
                    )}
                    {displayedCities.length > 0 ? (
                        <ul role = "listbox" className="bg-(--brand-neutral) rounded-[12px] flex flex-col gap-1 px-2 py-2">
                            {displayedCities.map((city, index)=>(
                                <li key = {city.id}
                                
                                role = "option"
                                aria-selected = { index === selectedIndex}
                                className={`${index === selectedIndex ?"selected" : ""} cursor-pointer px-[10px] py-[10px] hover:bg-(--brand-mid)
                                hover:outline-1 hover:outline-(--brand-outline) rounded-[8px]`}
                                onClick={()=> {
                                    handleCitySelect(city)
                                    setShowDropdown(false)
                                }}
                                onMouseEnter = {()=> setSelectedIndex(index)}
                                >
                                    <div>{getDisplayName(city)}</div>
                                    {/* <div >{city.latitude.toFixed(2)}, {city.longitude.toFixed(2)}</div> */}
                                </li>
                            ))}
                        </ul>
                    ):(
                        <div>
                            No cities found
                        </div>
                    ) }

                </div>
            )}
            </div>
            
            <button
            onClick={onClick}
            className = {`bg-(--brand-blue) w-full py-4 flex justify-center items-center rounded-[12px] transition-all 
                duration-400 delay-100 hover:bg-(--brand-dark-blue) md:w-1/6`}
            >Search</button>
        </div>
    );
}

export default SearchBar;