import Footer from "../component/footer"
import EditProduct from "../component/user/editProduct"
import NavbarDashboard from "../component/user/navbarDashboard"

export default function ModifyProduct() {
  return (
  <div className="flex flex-col min-h-screen">
    <div className="sticky top-0 z-50">
      <NavbarDashboard/>
    </div>
    <div>
        <EditProduct/>
    </div>
    <div className="mt-auto">
      <Footer/>
    </div>
  </div>
  )
}