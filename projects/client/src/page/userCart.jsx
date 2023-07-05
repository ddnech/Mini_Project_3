import NavbarDashboard from "../component/user/navbarDashboard"
import Footer from "../component/footer"
import MyCart from "../component/user/contentCart"

export default function UserCart() {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="sticky top-0 z-50">
                <NavbarDashboard />
            </div>
            <div>
                <MyCart />
            </div>
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    )
}