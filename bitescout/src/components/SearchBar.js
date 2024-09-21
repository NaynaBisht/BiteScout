import React from "react"
const SearchBar = ({searchQuery, onSearchChange, onSearch}) =>{
    return(
        <div className=" flex justify-between items-center w-full mb-4 p-2 bg-gray-100 rounded border ">
            <input
                type = "text"
                placeholder="Search for Food Products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="p-2 border rounded w-[50%] ml-2 "
            />
            <button className=" bg-blue-500 text-white px-4 py-2 rounded" onClick={onSearch} >
                Search
            </button>
            
            <div className=" p-2 flex items-center bg-white rounded" >
                <span> 3,417,754 products </span>
            </div>
                
        </div>
    )
}
export default SearchBar