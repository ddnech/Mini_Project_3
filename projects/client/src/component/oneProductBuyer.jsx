import React, { useEffect } from "react";

export default function OneProductBuyer() {
    useEffect(() => {

    })

    return (
        <>
            <div className="outerbox">
                <div className="grid gap-10 grid-cols-1 grid-rows-1 m-4">
                    <div className="font-josefin flex flex-wrap justify-center gap-2 sm:flex-row sm:flex-nowrap md:w-[49.2rem] md:mx-auto">
                        <div className="imgstorecat flex flex-col w-full m-4">
                            <div className="img h-60 bg-jetblack">
                                img here
                            </div>
                            <div className="storecat grid grid-cols-2 gap-2">
                                <div className="store text-left p-1">
                                    store name
                                </div>
                                <div className="category text-right p-1">
                                    category
                                </div>
                            </div>
                        </div>
                        <div className="namepricestockdescrip flex flex-col w-full m-4 text-left gap-2">
                            <div className="font-bold text-xl">
                                name
                            </div>
                            <div className="flex">
                                <div className="pr-3">
                                    Rp 50.000
                                </div>
                                <div className="pl-3 border-l-2">
                                    123 Qty
                                </div>
                            </div>
                            <div>
                                description
                            </div>
                        </div>
                    </div>
                    <div className="addtocart flex mx-auto gap-2">
                        <div className="flex justify-center">
                            <div className="flex items-center border border-gray-300 px-3 py-2">
                                <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                    </svg>
                                </button>
                                <div className="flex items-center mx-3">
                                    <div className="h-4 w-[0.05rem] bg-gray-300 mx-2"></div>
                                    <div className="text-gray-700 font-medium px-2">
                                        0
                                    </div>
                                    <div className="h-4 w-[0.05rem] bg-gray-300 mx-2"></div>
                                </div>
                                <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div className="flex">
                            <button className="mx-auto w-32 py-2 text-xs font-josefin tracking-wide border bg-darkgreen text-flashwhite hover:bg-white hover:text-darkgreen hover:border-darkgreen">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}