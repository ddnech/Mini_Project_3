import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider, useDispatch } from 'react-redux'
import { keep } from './store/reducer/authSlice'
import Home from './page/home'
import SignUp from './page/signup'
import LogIn from './page/login'
import UserProfile from './page/userProfile'
import UserPurchase from './page/userPurchase'
import store from './store/index'
import UserStore from './page/userStore'


function App() {

  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  )
}

function AppContent() {
  const dispatch = useDispatch()

  useEffect(() => {
    if (localStorage.getItem("token")) {
      dispatch(keep(localStorage.getItem("token")));
    }
  }, [dispatch])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/myprofile" element={<UserProfile />} />
        <Route path="/mystore" element={<UserStore />} />
        <Route path="/mypurchase" element={<UserPurchase />} />
      </Routes>
    </Router>
  )
}

export default App;