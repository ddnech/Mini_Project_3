import NavbarDashboard from "../component/user/navbarDashboard"
import Footer from "../component/footer"
import MyPurchase from "../component/user/contentPurchase"

export default function UserPurchase() {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="sticky top-0 z-50">
                <NavbarDashboard />
            </div>
            <div>
                <MyPurchase />
            </div>
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    )
}