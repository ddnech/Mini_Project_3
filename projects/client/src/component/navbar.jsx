import React from "react";
import { Link } from "react-router-dom";
import { ImSearch } from 'react-icons/im';
import { GrClose } from 'react-icons/gr'
import { useState } from "react";

export default function NavBar() {
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const toggleSearch = () => {
        setIsSearchOpen(!isSearchOpen);
    };

    // // search filter dropdown
    // const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    // const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);
    // const [allCategory, setAllCategory] = useState([])

    // const toggleDropdown = () => {
    //     setIsDropdownOpen(!isDropdownOpen);
    // };

    // const toggleDropdown2 = () => {
    //     setIsDropdownOpen2(!isDropdownOpen2);
    // };

    // const closeDropdowns = () => {
    //     setIsDropdownOpen(false);
    //     setIsDropdownOpen2(false);
    // };
    return (
        <div>
            <div className="bg-babypowder w-screen h-8 flex content-center">
                <div className="basis-1/2">
                    <Link to="/" className="basis-1/2 px-5 font-chivo">
                        <span className="font-lora font-semibold text-lg text-darkgreen">
                            verdant market
                        </span>
                    </Link>
                </div>
                <div className="basis-1/2 text-right flex justify-end px-5">
                    <span className="hover:font-semibold px-4 pt-">
                        <Link to="/login" className="basis-1/2 text-xs font-josefin">
                            Log In
                        </Link>
                    </span>
                    <span className="p-2">
                        {isSearchOpen ? (
                            <GrClose className="text-xs cursor-pointer" onClick={toggleSearch} />
                        ) : (
                            <ImSearch className="text-xs cursor-pointer" onClick={toggleSearch} />
                        )}
                    </span>
                </div>
            </div>
            <div>
                {isSearchOpen && (
                    <div className="bg-babypowder font-lora text-xs px-4 py-1">
                        <p>search by product's name</p>
                        <p>sort by category</p>
                        <p>sort by alphabets</p>
                        <p>sort by date</p>
                        <p>sort by price</p>
                    </div>
                )}
            </div>
        </div>
    )
}