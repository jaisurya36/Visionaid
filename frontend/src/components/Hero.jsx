import { Link } from "react-router-dom"

import { useLanguage }
from "../context/LanguageContext"

import translations
from "../translations/translations"

function Hero() {

  const {
    language
  } = useLanguage()

  const t =
    translations[language]

  return (

    <section
      id="home"
      className="min-h-screen flex flex-col justify-center items-center text-center px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900"
    >

      <h1 className="text-4xl md:text-6xl font-extrabold leading-tight max-w-5xl">

        {t.heroTitle}

      </h1>

      <p className="mt-8 text-xl text-gray-300 max-w-3xl">

        {t.heroDescription}

      </p>

     <div className="flex flex-col md:flex-row gap-6 mt-10">

        <Link to="/upload">

          <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-10 py-4 rounded-2xl shadow-2xl shadow-cyan-500/30 transition duration-300 hover:scale-105">

            Upload Assistant

          </button>

        </Link>

        <Link to="/camera">

          <button className="bg-green-500 hover:bg-green-400 text-black font-bold px-10 py-4 rounded-2xl shadow-2xl shadow-green-500/30 transition duration-300">

            Camera Assistant

          </button>

        </Link>

      </div>

    </section>
  )
}

export default Hero