import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
    return (
        <>
            <div
                className="bg-cover bg-center w-full h-60 grid content-center pl-6"
                style={{
                    backgroundImage:
                        'url("https://images.unsplash.com/photo-1591085686350-798c0f9faa7f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2hvcHBpbmd8ZW58MHx8MHx8fDA%3D&w=1000&q=80")',
                }}
            >
                <div className="w-9/12 h-40 grid grid-flow-row justify-start content-end">
                    <Link to='/login' className="bg-babypowder font-lora rounded drop-shadow-5xl text-center text-xs p-1">Shop Now</Link>
                </div>
            </div>
        </>
    )
}