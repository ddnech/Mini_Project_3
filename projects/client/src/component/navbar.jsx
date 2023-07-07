import React, { useState } from "react";
import { AiOutlineUser, AiOutlineUnorderedList, AiOutlineLogout, AiOutlineShoppingCart } from 'react-icons/ai';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { remove } from "../store/reducer/authSlice";
import { ImSearch } from 'react-icons/im';
import { GrClose } from 'react-icons/gr'

export default function NavBar(props) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleProfileMenuToggle = () => {
    setProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch(remove());
    navigate("/login");
  };

  return (
    <div>
      <div className="bg-babypowder w-screen h-8 flex content-center">
        <div className="basis-1/2 px-5 font-lora">
          <Link to="/">
            <span className="font-lora font-semibold text-lg text-darkgreen">
              verdant market
            </span>
          </Link>
        </div>
        <div className="basis-1/2 text-right flex justify-end px-5">
          <Link to="/mycart" className="p-1">
            <AiOutlineShoppingCart size={20} />
          </Link>
          <span className="hover:font-semibold px-4 pt-">
            {token ? (
              <div className="relative p-1">
                <button onClick={handleProfileMenuToggle}>
                  <AiOutlineUser size={20} />
                </button>
                {isProfileMenuOpen && (
                  <ul className="absolute right-0 bg-white text-black shadow-lg">
                    <li className="flex y-0 items-center p-2 border-b border-gray-600 bg-babypowder hover:text-redd">
                      <AiOutlineUnorderedList size={20} className="mr-2" />
                      <Link to="/myprofile">Dashboard</Link>
                    </li>
                    <li className="flex items-center p-2 border-b border-gray-600 bg-babypowder hover:text-redd">
                      <AiOutlineLogout size={20} className="mr-2" />
                      <span onClick={handleLogout}>Logout</span>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <Link to="/login" className="text-xs font-josefin">Log In</Link>
            )}
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
            <div className="h-full flex flex-wrap items-center px-2 w-full gap-2 sm:flex-nowrap font-ysa text-sm">
              <input
                className=" font-sans bg-transparent p-2 w-full focus:outline-none sm:basis-3/8 md:basis-2/5"
                type="text"
                placeholder="Search"
                value={props.searchValue}
                onChange={props.onSearchChange}
              />
              <select
                className=" bg-gray-200 outline-none w-full sm:basis-2/8 md:basis-1/5"
                value={props.categoryValue}
                onChange={props.onCategoryChange}
              >
                <option value="" className="font-ysa text-sm">All Categories</option> {/* Set initial value to empty string */}
                {props.allCategory.map((category) => (
                  <option value={category.id} key={category.id} className="font-ysa text-sm">
                    {category.name}
                  </option>
                ))}
              </select>
              <select
                className=" bg-gray-200 transparent outline-none w-full sm:basis-1/8 md:basis-1/5"
                value={props.alphabetValue === 'DESC' ? 'Z-A' : 'A-Z'}
                onChange={props.onAlphabetChange}
              >
                <option value="A-Z" className="font-ysa text-sm">Sort: A - Z</option>
                <option value="Z-A" className="font-ysa text-sm">Sort: Z - A</option>
              </select>
              <select
                className=" bg-gray-200 transparent outline-none w-full sm:basis-2/8 md:basis-1/5"
                value={props.priceValue === 'DESC' ? 'Low-High' : 'High-Low'}
                onChange={props.onPriceChange}
              >
                <option value="Low-High" className="font-ysa text-sm">Price: Low - High</option>
                <option value="High-Low" className="font-ysa text-sm">Price: High - Low</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

