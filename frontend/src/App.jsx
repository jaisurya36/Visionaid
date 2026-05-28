import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import Home from "./pages/Home"

import UploadPage from "./pages/UploadPage"

import CameraPage from "./pages/CameraPage"

function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/upload"
          element={<UploadPage />}
        />

        <Route
          path="/camera"
          element={<CameraPage />}
        />

      </Routes>

    </BrowserRouter>
  )
}

export default App