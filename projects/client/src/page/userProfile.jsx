import NavbarDashboard from "../component/user/navbarDashboard"
import Footer from "../component/footer"

export default function UserProfile() {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="sticky top-0 z-50">
                <NavbarDashboard />
            </div>
            <div>

            </div>
            <div className="mt-auto">
                <Footer />
            </div>
        </div>
    )
}