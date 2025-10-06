import icon_search from "../../assets/icon-search.svg"

const SearchBar = ({onClick}: {onClick: () => void}) => {
    return(
        <div
        className = {`w-full font-(family-name:--dm-sans) flex flex-col gap-3 px-4  md:flex-row md:px-6 lg:px-80`}
        >
            <div className= {`  w-full relative `}>
                <img
                alt = "search icon"
                src = {icon_search}
                className="w-5 absolute top-1/2 left-6 -translate-y-1/2"
                 />
                <input
                placeholder="Search for a place..."
                type ="text"
                className= {`bg-(--brand-neutral)  outline-none w-full pl-15 pr-6 py-4 rounded-[12px]
                    hover:bg-(--brand-mid) focus:ring-1 focus:ring-white focus:border-(--brand-dark) focus:border-3
                    transition-all duration-400 delay-100 md:w-full
                    `}
                />
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