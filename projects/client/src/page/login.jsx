import LoginUser from "../component/user/loginUser"
import NavBar from "../component/navbar"

export default function LogIn() {
  return (
    <>
      <div className="sticky top-0 z-50">
        <NavBar />
      </div>
      <div>
        <LoginUser />
      </div>
    </>
  )
}