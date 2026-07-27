// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
import './App.css'
import Home from './pages/Home'
import Blogs from './pages/Blogs'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/auth/Login'
import SignUp from './pages/auth/SignUp'

function App() {

  return (
    <>
      <BrowserRouter>

        <Routes>

          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/blogs" element={<Blogs />} />
          </Route>

          <Route element={<AuthLayout />}>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
          </Route>

        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
