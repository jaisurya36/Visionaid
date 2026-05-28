import Webcam from "react-webcam"

import {
  useRef,
  useState,
  useEffect,
} from "react"

import API from "../services/api"

import { useLanguage } from "../context/LanguageContext"

import translations from "../translations/translations"

function CameraCapture() {

  const {
    language
  } = useLanguage()

  const t =
    translations[language]

  const webcamRef =
    useRef(null)

  const [objects, setObjects] =
    useState([])

  const [ocrText, setOcrText] =
    useState("")

  const [processing, setProcessing] =
    useState(false)

  const [liveMode, setLiveMode] =
    useState(false)
  const [cameraMode,setCameraMode] =useState("normal")

  const speakText = (text) => {

    window.speechSynthesis.cancel()

    const speech =
      new SpeechSynthesisUtterance(text)

    if (language === "ta") {

      speech.lang = "ta-IN"

    } else if (language === "hi") {

      speech.lang = "hi-IN"

    } else {

      speech.lang = "en-US"
    }

    speech.rate = 1

    speech.pitch = 1

    window.speechSynthesis.speak(speech)
  }

  const captureImage = async () => {

    setProcessing(true)

    const imageSrc =
      webcamRef.current.getScreenshot()

    const blob =
      await fetch(imageSrc)
      .then(res => res.blob())

    const formData =
      new FormData()

    formData.append(
      "file",
      blob,
      "capture.jpg"
    )

    try {

      const response =
        await API.post(
          "/upload",
          formData
        )

      setObjects(
        response.data.objects
      )

      setOcrText(
        response.data.ocr_text
      )

      if (response.data.ocr_text) {

  speakText(
    `Extracted text is ${response.data.ocr_text}`
  )

} else if (
  response.data.objects.length > 0
) {

  const detectedObjects =
    response.data.objects

  if (
    cameraMode === "normal"
  ) {

    speakText(
      `Detected objects are ${detectedObjects.join(", ")}`
    )

  } else {

    const importantObjects = [

      "person",
      "car",
      "truck",
      "bus",
      "motorcycle",
      "bicycle",
      "chair",
      "dog"
    ]

    const foundImportant =
      detectedObjects.find(item =>
        importantObjects.includes(
          item.toLowerCase()
        )
      )

    if (foundImportant) {

      speakText(
        `Warning! ${foundImportant} ahead`
      )
    }
  }
}
      setProcessing(false)

    } catch (error) {

      console.log(error)

      setProcessing(false)
    }
  }

  useEffect(() => {

    let interval

    if (liveMode) {

      interval = setInterval(() => {

        captureImage()

      }, 5000)
    }

    return () =>
      clearInterval(interval)

  }, [liveMode])
  const resetCamera = () => {

  window.speechSynthesis.cancel()

  setObjects([])

  setOcrText("")
}
  return (

    <section
      id="camera"
      className="py-24 px-6 text-center bg-slate-950"
    >

      <h2 className="text-4xl font-bold mb-8">

        {t.live}

      </h2>

      <div className="flex flex-col items-center">
      <div className="flex gap-4 mb-6">

  <button

    onClick={() =>
      setCameraMode("normal")
    }

    className={`px-6 py-3 rounded-2xl font-bold transition ${
      cameraMode === "normal"
        ? "bg-cyan-500 text-black"
        : "bg-gray-700 text-white"
    }`}
  >

    Normal Mode

  </button>

  <button

    onClick={() =>
      setCameraMode("outdoor")
    }

    className={`px-6 py-3 rounded-2xl font-bold transition ${
      cameraMode === "outdoor"
        ? "bg-green-500 text-black"
        : "bg-gray-700 text-white"
    }`}
  >

    Outdoor Mode

  </button>

</div>

        <Webcam
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          className="rounded-3xl w-full max-w-[450px] border border-cyan-500 shadow-2xl animate-pulse"
        />

       {processing && (

  <div className="flex flex-col items-center mt-4">

    <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>

    <p className="text-cyan-400 mt-3">

      {t.processing}

    </p>

  </div>

)}

        <button

          onClick={() =>
            setLiveMode(!liveMode)
          }

          className={`mt-6 px-8 py-4 rounded-2xl font-bold transition ${
            liveMode
              ? "bg-red-500 text-white"
              : "bg-green-500 text-black"
          }`}
        >

          {liveMode
            ? t.stopLive
            : t.startLive}

        </button>

        <button
          onClick={captureImage}
          className="mt-8 bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-4 rounded-2xl transition"
        >

          {t.capture}

        </button>

        {objects.length > 0 && !ocrText && (

          <div className="mt-8 bg-gradient-to-br from-yellow-100 to-orange-100 text-black p-6 rounded-3xl shadow-2xl border border-yellow-300 w-full max-w-[400px]">

            <h3 className="font-bold mb-2">

              {t.detected}

            </h3>

            <div className="flex flex-wrap gap-2 justify-center">

              {objects.map((item, index) => (

                <span
                  key={index}
                  className="bg-black text-white px-3 py-1 rounded-full"
                >

                  {item}

                </span>

              ))}

            </div>

          </div>

        )}
        {(objects.length > 0 || ocrText) && (

  <button
    onClick={resetCamera}
    className="mt-6 bg-red-500 hover:bg-red-400 text-white font-bold px-8 py-3 rounded-2xl transition"
  >

    New Detection

  </button>

)}

        {ocrText && (

          <div className="mt-8 bg-gradient-to-br from-gray-100 to-slate-200 text-black p-6 rounded-3xl shadow-2xl border border-gray-300 w-[400px]">

            <h3 className="font-bold mb-2">

              {t.extracted}

            </h3>

            <p>

              {ocrText}

            </p>

          </div>

        )}

      </div>

    </section>
  )
}

export default CameraCapture