import React from 'react';
import CardTopSelling from './cardTopSelling';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

export default function TopSelling() {


    const scrollLeft = () => {
        document.getElementById("content").scrollLeft -= 400;
    }

    const scrollRight = () => {
        document.getElementById("content").scrollLeft += 400;
    }

    return (
        <>
            <div>
                <div className="font-josefin text-center py-4 text-xl font-medium">Top Selling!</div>
                <div className='flex'>
                    <div className="text-left left-0 top-5 mx-4 grid">
                        <button onClick={scrollLeft} className="text-xl text-jetblack"><IoIosArrowBack size={15} /></button>
                    </div>
                    <div id="content" className="carousel p-4 flex items-center justify-start overflow-x-auto scroll-smooth scrollbar-hide">
                        {/* content */}
                    </div>
                    <div className="text-right right-0 top-5 mx-4 grid">
                        <button onClick={scrollRight} className="text-xl text-jetblack"><IoIosArrowForward size={15} /></button>
                    </div>
                </div>
            </div>
        </>
    )
}