import React, { useState } from "react"
import NavBar from "../component/navbar"
import Header from "../component/header"
import Footer from "../component/footer"
import TopSelling from "../component/topselling"
import AllProduct from "../component/cardProduct"
import axios from "axios"


export default function Home() {
    const [allProduct, setAllProduct] = useState([])
    useEffect(() => {
        const product = axios.get(`http://localhost:8000/api/product?page=&search=&category=&sortAlphabet=&sortPrice`)
            .then(response => {
                if (response.data.data) {
                    setAllProduct(response.data.data)
                } else {
                    setAllProduct([])
                }
            }).catch(error => {
                console.log(error.message)
            })
    }, [])

    return (
        <div className="flex flex-col min-h-screen">
            <div className="sticky top-0 z-50">
                <NavBar />
            </div>
            <div>
                <Header />
            </div>
            <div>
                <TopSelling />
            </div>
            <div>
                <AllProduct />
            </div>
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    )
}