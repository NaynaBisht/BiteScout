const Header = () => {
    return (
        <nav className="bg-orange-300 p-3 flex items-center justify-between rounded flex-wrap">
            <ul className="list-none flex gap-5 order-1">
                <li>Blog</li>
                <li>Add Product</li>
            </ul>
            <h1 className="font-bold text-3xl mx-auto order-2">BiteScout</h1>
            <button className="bg-cyan-600 text-white px-4 py-2 rounded order-3">SignIn</button>
        </nav>
    );
};

export default Header;
