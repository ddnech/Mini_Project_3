import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { keep } from './store/reducer/authSlice'
import Home from './page/home'
import SignUp from './page/signup'
import LogIn from './page/login'
import UserProfile from './page/userProfile'


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(keep(localStorage.getItem("token")));
    }
  }, [])

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/myprofile" element={<UserProfile />} />

          {/* <Route path="/verification/:token" element={<EmailVerification />} />
          <Route path="/homeuser" element={<HomeUser />} />
          <Route path='/settinguser' element={<SettingUser />} />
          <Route path='/writeuser' element={<WriteUser />} />
          <Route path='/mybloguser' element={<MyBlogUser />} />
          <Route path='/editpic' element={<EditPic />} />
          <Route path='/post'>
            <Route path=':postId' element={<SinglePost />} />
          </Route>
          <Route path='/postIdUser'>
            <Route path=':postIdUser' element={<SinglePostUser />} />
          </Route> */}

        </Routes>
      </Router>
    </>
  )

}

export default App;
