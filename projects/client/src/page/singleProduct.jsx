import NavBar from "../component/navbar"
import Footer from "../component/footer"
import OneProduct from "../component/oneProduct"

export default function SingleProduct() {
  return (
  <div className="flex flex-col min-h-screen">
    <div className="sticky top-0 z-50">
      <NavBar/>
    </div>
    <div>
      <OneProduct/>
    </div>
    <div className="mt-auto">
      <Footer/>
    </div>
  </div>
  )
}