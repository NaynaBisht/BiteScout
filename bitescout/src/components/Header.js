const Header = () =>{
    return(
        <nav className="bg-orange-300 p-3 flex items-center justify-between rounded">
            <ul className=" list-none flex gap-5 justify-between">
                <li>Discover</li>
                <li>Contribute</li>
                <li>Add Product</li>
            </ul>
            <h1 className=" font-bold text-3xl ml-36 lg:ml-60">BiteScout</h1>
            <button className=" ml-auto  bg-rose-500  text-white px-4 py-2 rounded ">SignIn</button>
        </nav>
    )
}
export default Header