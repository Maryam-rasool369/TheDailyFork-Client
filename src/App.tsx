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
import TermsConditions from './pages/TermsConditions'
import PrivacyPolicy from './pages/PrivacyPolicy'
import CreateBlogs from './pages/CreateBlog'
import MyBlogs from './pages/MyBlogs'
import EditBlog from './pages/EditBlog'
import EditPofile from './pages/EditPofile'
import BlogDetail from './pages/BlogDetail'
import ForgetPassword from './pages/auth/ForgetPassword'
import ResetPassword from './pages/auth/ResetPassword'

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
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path="/create-blog" element={<CreateBlogs />} />
            <Route path="/my-blogs" element={<MyBlogs />} />
            <Route path="/blog/:id/edit" element={<EditBlog />} />
            <Route path="/edit-profile" element={<EditPofile />} />

            <Route path='/terms-conditions' element={<TermsConditions />} />
            <Route path='/privacy-policy' element={<PrivacyPolicy />} />

          </Route>

          <Route element={<AuthLayout />}>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/forget-password' element={<ForgetPassword />} />
            <Route path='/reset-password' element={<ResetPassword />} />

          </Route>

        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
