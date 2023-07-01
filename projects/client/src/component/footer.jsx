import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterest, FaCopyright } from "react-icons/fa";
import { MdEmail } from "react-icons/md"

export default function Footer() {
    return (
        <div className="bg-darkgreen w-screen h-32 grid content-center font-chivo">
            <div className="m-4 flex flex-col gap-5">
                <div className="basis-3/4 flex text-center justify-between">
                    <div className="p-2 basis-1/2">
                        <p className="text-babypowder font-bold mb-2 text-sm text-left">FIND US ON</p>
                        <p className="flex gap-2 text-flashwhite">
                            <a href="#" className="text-xl"><FaFacebookF className="text-sm" /></a>
                            <a href="#" className="text-xl"><FaTwitter className="text-sm" /></a>
                            <a href="#" className="text-xl"><FaInstagram className="text-sm" /></a>
                            <a href="#" className="text-xl"><FaPinterest className="text-sm" /></a>
                        </p>
                    </div>
                    <div className="p-2 basis-1/2">
                        <div>
                            <p className="text-babypowder font-bold mb-2 text-sm">Stay updated on our latest products!</p>
                        </div>
                        <div className="flex content-center justify-center">
                            <input type="text" placeholder="john.doe@gmail.com" className="text-xs w-40 h-5 outline-none focus:ring-2 focus:ring-lightgreen focus:ring-opacity-50"></input>
                            <button className=" bg-flashwhite w-5 h-5 text-base flex items-center justify-center outline-none"><MdEmail className="" /></button>
                        </div>
                    </div>
                </div>
                <div className="basis-1/4">
                    <p className="font-chivo text-babypowder text-xs text-center">Copyright <FaCopyright className="text-xxs inline-block" /> 2023. All rights reserved</p>
                </div>
            </div>
        </div>
    )
}