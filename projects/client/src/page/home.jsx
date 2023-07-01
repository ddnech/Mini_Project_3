import NavBar from "../component/navbar"
import Header from "../component/header"
import Footer from "../component/footer"

export default function Home() {
    return (
        <>
            <div className="sticky top-0 z-50">
                <NavBar />
            </div>
            <div>
                <Header />
            </div>
            <div>
                <Footer />
            </div>
        </>
    )
}