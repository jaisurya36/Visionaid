import Navbar from "../components/Navbar"
import Hero from "../components/Hero"

import FeatureCards from "../components/FeatureCards"

import Footer from "../components/Footer"

function Home() {

  return (

    <div className="bg-[#020617] text-white">

      <Navbar />

      <Hero />

      <FeatureCards />

      <div className="py-10" />

     

      <div className="py-16" />

      

      <Footer />

    </div>
  )
}

export default Home