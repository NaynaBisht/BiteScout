import logo from '../assets/images/biteScout-removebg-preview.png';

const Header = () => {
    return (
        <nav className="bg-orange-300 p-4 flex flex-col md:flex-row items-center justify-between rounded">
            <div className="flex items-center mb-4 md:mb-0">
                <img src={logo} alt="BiteScout Logo" className="w-14 h-14" />
                <h1 className="font-bold text-3xl text-center md:text-left mt-2 md:mt-0 ml-3">BiteScout</h1>
            </div>
            <h2 className="font-semibold md:text-sm lg:mr-32 text-center mb-4 md:mb-0">
                <p className="italic block mr-0 md:mr-3">"Know What You Eat, Every Bite Counts"</p>
                Food Transparency for Healthier Choices
            </h2>
            <button className="bg-cyan-600 text-white px-4 py-2 rounded mt-2 md:mt-0">SignIn</button>
        </nav>
    );
};

export default Header;
