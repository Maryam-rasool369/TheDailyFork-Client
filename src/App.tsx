import './App.css'
import Home from './pages/Home'
import Blogs from './pages/blog/Blogs'
import AboutUs from './pages/AboutUs'
import ContactUs from './pages/ContactUs'
import PageNotFound from './pages/PageNotFound'

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
import VerifyEmail from './pages/auth/VerifyEmail'
import PrivateRoute from './components/routes/PrivateRoute'
import GuestRoute from './components/routes/GuestRoute'
import AdminRoute from './components/routes/AdminRoute'
import AdminGuestRoute from './components/routes/AdminGuestRoute'
import Pricing from './pages/subscription/Pricing'
import SubscriptionSuccess from './pages/subscription/SubscriptionSuccess'
import SubscriptionCancelled from './pages/subscription/SubscriptionCancelled'
import Billing from './pages/subscription/Billing'
import AdminLayout from './layouts/AdminLayout'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers from './pages/admin/AdminUsers'
import AdminBlogs from './pages/admin/AdminBlogs'
import AdminFeatured from './pages/admin/AdminFeatured'
import { useTokenExpiry } from './hooks/useTokenExpiry'
import AdminSubscriptions from './pages/admin/AdminSubscriptions'

function App() {
  useTokenExpiry()

  return (
    <>
      <Toaster position="top-right" />
      <BrowserRouter>
        <Routes>

          <Route element={<MainLayout />}>
            {/* Public */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            {/* <Route path="/contact" element={<ContactUs />} /> */}
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blog/:id" element={<BlogDetail />} />
            <Route path='/terms-conditions' element={<TermsConditions />} />
            <Route path='/privacy-policy' element={<PrivacyPolicy />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/subscription/success" element={<SubscriptionSuccess />} />
            <Route path="/subscription/cancelled" element={<SubscriptionCancelled />} />
            <Route path="*" element={<PageNotFound />} />

            {/* Private — must be logged in */}
            <Route element={<PrivateRoute />}>
              <Route path="/create-blog" element={<CreateBlogs />} />
              <Route path="/my-blogs" element={<MyBlogs />} />
              <Route path="/blog/:id/edit" element={<EditBlog />} />
              <Route path="/edit-profile" element={<EditPofile />} />
              <Route path="/pricing" element={<Pricing />} />
              {/* <Route path="/account/billing" element={<Billing />} /> */}
              <Route path="/account" element={<Billing />} />
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

          {/* Admin — separate login, no navbar/footer */}
          <Route element={<AdminGuestRoute />}>
            <Route path="/admin/login" element={<AdminLogin />} />
          </Route>

          <Route element={<AdminLayout />}>
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/blogs" element={<AdminBlogs />} />
              <Route path="/admin/featured" element={<AdminFeatured />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/subscriptions" element={<AdminSubscriptions />} />

            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App