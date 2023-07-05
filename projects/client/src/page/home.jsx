import NavBar from "../component/navbar"
import Header from "../component/header"
import Footer from "../component/footer"
import TopSelling from "../component/topselling"
import AllProduct from "../component/cardProduct"

export default function Home() {
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
                <AllProduct/>
            </div>
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    )
}