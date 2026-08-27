import './App.css'
import Home from './pages/Home'
import Blogs from './pages/blog/Blogs'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import MainLayout from './layouts/MainLayout'
import AuthLayout from './layouts/AuthLayout'
import Login from './pages/auth/Login'
import SignUp from './pages/auth/SignUp'
import TermsConditions from './pages/TermsConditions'
import PrivacyPolicy from './pages/PrivacyPolicy'
import CreateBlogs from './pages/blog/CreateBlog'
import MyBlogs from './pages/user/MyBlogs'
import EditBlog from './pages/blog/EditBlog'
import EditPofile from './pages/user/EditPofile'
import BlogDetail from './pages/blog/BlogDetail'
import ForgetPassword from './pages/auth/ForgetPassword'
import ResetPassword from './pages/auth/ResetPassword'
import PrivateRoute from './components/routes/PrivateRoute'
import GuestRoute from './components/routes/GuestRoute'
// import AdminRoute from './components/AdminRoute' // for later admin pages

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path='/terms-conditions' element={<TermsConditions />} />
            <Route path='/privacy-policy' element={<PrivacyPolicy />} />

            {/* Private — must be logged in */}
            <Route element={<PrivateRoute />}>
              <Route path="/create-blog" element={<CreateBlogs />} />
              <Route path="/my-blogs" element={<MyBlogs />} />
              <Route path="/blog/:id/edit" element={<EditBlog />} />
              <Route path="/edit-profile" element={<EditPofile />} />
            </Route>
          </Route>

          <Route element={<AuthLayout />}>
            {/* Guest-only — redirect away if already logged in */}
            <Route element={<GuestRoute />}>
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<SignUp />} />
              <Route path='/forget-password' element={<ForgetPassword />} />
              <Route path='/reset-password' element={<ResetPassword />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App