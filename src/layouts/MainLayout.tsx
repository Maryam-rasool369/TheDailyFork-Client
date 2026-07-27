import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'

const MainLayout: React.FC = () => {
    return (
        <>
            <ScrollToTop />
            
            <Navbar />

            <main className="mx-auto w-full max-w-7xl px-5 py-3">
                <Outlet />
            </main>

            <Footer />
        </>
    )
}

export default MainLayout