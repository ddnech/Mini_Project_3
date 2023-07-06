import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function AllProduct() {
    // handle product by getting props from home

    return (
        <>
            {/* <div className="flex flex-wrap gap-2 mt-2 mx-2">
                <div className={`${allproduct.isActive ? "bg-white w-full h-full flex flex-col text-jetblack p-2 sm:w-80 flex-1" : " bg-gray-400 w-full h-full flex flex-col text-jetblack p-2 sm:w-80 flex-1 opacity-20"
                    }`}>
                    <div className="w-full">
                        <img
                            className="w-20 h-20 justify-center mx-auto m-2 object-cover"
                            src={`http://localhost:8000${allproduct.imgProduct}`}
                            onError={handleImageError}
                            alt="/"
                        />
                    </div>
                    <div className="flex flex-col text-center gap-2 mt-2">
                        <div className="flex-1 font-lora text-base overflow-auto">
                            {allproduct.name}
                        </div>
                        <div className="font-josefin overflow-auto">
                            {allproduct.isActive ? "active" : "inactive"}
                        </div>
                        <div className="font-josefin overflow-auto">
                            {allproduct.category.name}
                        </div>
                        <div className="font-lora mx-auto mt-3 h-full grow-0 w-44">
                            <table className="mx-auto">
                                <tbody>
                                    <tr>
                                        <td className="border-r-2 border-gray-200 px-4 overflow-auto">{allproduct.price}</td>
                                        <td className="px-4 overflow-auto">{allproduct.stock}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <Link to="/">
                            <button
                                className='w-full py-2 mt-4 text-xs font-josefin tracking-wide border bg-darkgreen text-flashwhite hover:bg-white hover:text-darkgreen hover:border-darkgreen'
                            >
                                Edit Product
                            </button>
                        </Link>
                    </div>
                </div>

            </div> */}
        </>
    )
}