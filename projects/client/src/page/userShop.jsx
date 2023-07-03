import NavbarDashboard from "../component/user/navbarDashboard"
import Footer from "../component/footer"
import MyShop from "../component/user/myShop"

export default function UserShop() {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="sticky top-0 z-50">
                <NavbarDashboard />
            </div>
            <div>
                <MyShop />
            </div>
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    )
}