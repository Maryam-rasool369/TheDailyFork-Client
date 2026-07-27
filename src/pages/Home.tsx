import React from 'react'
import HeroSection from '../components/home/HeroSection'
import PopularSection from '../components/home/PopularSection'
import UsefulTips from '../components/home/UseFulTips'
import SubscribeSection from '../components/home/SubscribeSection'

const Home: React.FC = () => {
  return (
    <>
        <HeroSection />
        <PopularSection/>
        <UsefulTips/>
        <SubscribeSection/>

    </>

  )
}

export default Home