import { Link } from "react-router-dom"

import { useLanguage }
from "../context/LanguageContext"

import translations
from "../translations/translations"

function Navbar() {

  const {
    language,
    setLanguage
  } = useLanguage()

  const t =
    translations[language]

  return (

    <nav className="flex flex-col md:flex-row items-center justify-between px-6 md:px-10 py-5">

      <Link to="/">

        <h1 className="text-3xl font-bold text-cyan-400 cursor-pointer">

          VisionAid

        </h1>

      </Link>

      <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 mt-4 md:mt-0">

        <ul className="flex flex-wrap justify-center gap-6 text-gray-300">

          <Link to="/">

            <li className="hover:text-cyan-400 cursor-pointer transition">

              {t.home}

            </li>

          </Link>

          <Link to="/upload">

            <li className="hover:text-cyan-400 cursor-pointer transition">

              {t.upload}

            </li>

          </Link>

          <Link to="/camera">

            <li className="hover:text-cyan-400 cursor-pointer transition">

              {t.camera}

            </li>

          </Link>

        </ul>

        <select

          value={language}

          onChange={(e) =>
            setLanguage(e.target.value)
          }

          className="bg-black text-white px-4 py-2 rounded-xl border border-cyan-500 outline-none"
        >

          <option value="en">

            English

          </option>

          <option value="ta">

            தமிழ்

          </option>

          <option value="hi">

            हिन्दी

          </option>

        </select>

      </div>

    </nav>
  )
}

export default Navbar