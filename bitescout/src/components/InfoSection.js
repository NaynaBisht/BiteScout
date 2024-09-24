import React from "react";

const InfoSection = () => {
    return (
        <div className="flex flex-col md:flex-row gap-4 h-auto mb-2">
            <div className="text-center mb-4 bg-cyan-200 mt-2 w-full md:w-1/3 p-4 shadow-xl rounded-lg ">
                <h1 className="font-bold text-2xl mt-3 mb-2">Discover</h1>
                <p>
                    Explore a variety of food products from different categories, uncovering new favorites and healthy options. Join us on this journey to make informed choices about what you eat!
                </p>
            </div>
            <div className="text-center mb-4 bg-orange-200 mt-2 w-full md:w-1/3 p-4 shadow-xl rounded-lg">
                <h1 className="font-bold text-2xl mt-3 mb-2">Help us make food transparency the norm!</h1>
                <p>
                    Discover a wide variety of food products available for you. Find your favorites and explore new options!
                </p>
            </div>
            <div className="text-center mb-4 bg-cyan-200 mt-2 w-full md:w-1/3 p-4 shadow-xl rounded-lg">
                <h1 className="font-bold text-2xl mt-3 mb-2">Contribute</h1>
                <p>
                    Share your insights and experiences with food products. Your contributions help us build a community of informed consumers and support healthier choices for everyone.
                </p>
            </div>
        </div>
    );
};

export default InfoSection;
