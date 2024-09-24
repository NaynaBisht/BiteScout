import React from "react"
const SearchBar = ({searchQuery, onSearchChange }) =>{


    const handleSearch = (e) => {
        e.preventDefault();
        // Implement search functionality if needed
    };

    return(
        <div className=" flex justify-between items-center w-[full] mb-4 p-2 bg-gray-100 rounded border ">
            <form onSubmit={handleSearch} className="flex w-full items-center">
                <input
                type="text"
                placeholder="Search for Food Products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="p-2 border rounded w-1/2 ml-2"
                />
                <button className="bg-blue-500 ml-3 text-white px-4 py-2 rounded" type="submit">
                Search
                </button>
            </form>
            
            <div className=" p-2 flex w-48 sm:w-56 mr-3 items-center bg-white rounded" >
                <h1> 3,417,754 products </h1>
            </div>
                
        </div>
    )
}
export default SearchBar