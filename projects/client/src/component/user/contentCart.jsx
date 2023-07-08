import React from "react";

export default function MyCart() {
    return (
        <>
            <div className="mx-auto text-center font-josefin mt-5 text-xl">
                MY CART
            </div>
            <div className="flex-col gap-1">
                <div className="title grid grid-flow-col m-5 grid-cols-3 font-ysa text-xl">
                    <div className="col-start-1 col-end-3">
                        Product
                    </div>
                    <div className="col-start-3 col-end-4 px-2">
                        Total
                    </div>
                </div>
                <div className="product grid grid-flow-col m-5 grid-cols-3 py-2 border-b-2">
                    <div className="col-start-1 col-end-3 flex gap-3 flex-wrap md:flex-nowrap font-josefin">
                        <div className="img flex">
                            <div className="w-24 h-24 bg-lightgreen sm:w-40 sm:h-40">

                            </div>
                        </div>
                        <div className="grid w-full items-end">
                            <div className="flex-col items-end h-fit">
                                <div className="text-base sm:text-xl">
                                    store name
                                </div>
                                <div className="text-base sm:text-xl">
                                    name
                                </div>
                                <div className="text-base sm:text-xl">
                                    price
                                </div>
                                <div className="sm:flex font-ysa">
                                    <div className="w-fit flex items-center border border-gray-300 px-1 py-1 mt-2">
                                        <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                            </svg>
                                        </button>
                                        <div className="flex items-center mx-2">
                                            <div className="h-4 w-[0.05rem] bg-gray-300 mr-1"></div>
                                            <div className="text-gray-700 font-medium px-2">
                                                0
                                            </div>
                                            <div className="h-4 w-[0.05rem] bg-gray-300 ml-1"></div>
                                        </div>
                                        <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className="w-fit font-josefin text-xs grid items-end px-1 hover:underline">
                                        remove from cart
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-start-3 col-end-4 px-2 font-josefin text-xs flex items-end sm:text-base">
                        Rp 3.000.000
                    </div>
                </div>
                <div className="font-maitree">
                    <div className="grid grid-flow-col m-5 grid-cols-3 text-sm sm:text-base">
                        <div className="col-start-1 col-end-3 text-right px-2">
                            Total Price:
                        </div>
                        <div className="col-start-3 col-end-4 px-2">
                            Rp 3.000.000
                        </div>
                    </div>
                </div>
                <div className="px-5">
                    <button
                        className='w-full py-2 my-4 text-xs font-josefin tracking-wide border bg-darkgreen text-flashwhite hover:bg-white hover:text-darkgreen hover:border-darkgreen'
                        type='submit'
                    >
                        Proceed to Payment
                    </button>
                </div>
            </div>
        </>
    )
}