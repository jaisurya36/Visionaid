import { useState } from "react"

import API from "../services/api"

import { useLanguage } from "../context/LanguageContext"

import translations from "../translations/translations"

function UploadBox() {

  const { language } = useLanguage()

  const t = translations[language]

  const [image, setImage] = useState(null)

  const [preview, setPreview] = useState(null)

  const [message, setMessage] = useState("")

  const [ocrText, setOcrText] = useState("")

  const [caption, setCaption] = useState("")

  const [objects, setObjects] = useState([])

  const [processing, setProcessing] = useState(false)

  const [detectedImage, setDetectedImage] = useState("")

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

  const resizeImage = (file) => {

    return new Promise((resolve) => {

      const img = new Image()

      const reader = new FileReader()

      reader.onload = (e) => {

        img.src = e.target.result
      }

      img.onload = () => {

        const canvas =
          document.createElement("canvas")

        const MAX_WIDTH = 800

        const scaleSize =
          MAX_WIDTH / img.width

        canvas.width = MAX_WIDTH

        canvas.height =
          img.height * scaleSize

        const ctx =
          canvas.getContext("2d")

        ctx.drawImage(
          img,
          0,
          0,
          canvas.width,
          canvas.height
        )

        canvas.toBlob(
          (blob) => {

            resolve(blob)

          },
          "image/jpeg",
          0.8
        )
      }

      reader.readAsDataURL(file)
    })
  }

  const handleImageChange = (e) => {

    const file = e.target.files[0]

    setImage(file)

    setPreview(
      URL.createObjectURL(file)
    )
  }

  const handleUpload = async () => {

    setProcessing(true)

    if (!image) {

      alert(t.selectImage)

      setProcessing(false)

      return
    }

    try {

      const resizedImage =
        await resizeImage(image)

      const formData =
        new FormData()

      formData.append(
        "file",
        resizedImage,
        image.name
      )

      const response =
        await API.post(
          "/upload",
          formData
        )

      setMessage(
        response.data.message
      )

      setOcrText(
        response.data.ocr_text
      )

      setCaption(
        response.data.caption
      )

      setObjects(
        response.data.objects
      )

      setDetectedImage(
        response.data.detected_image
      )

      if (response.data.ocr_text) {

  speakText(
    `Extracted text is ${response.data.ocr_text}`
  )

} else if (
  response.data.objects.length > 0
) {

  speakText(
    `Detected objects are ${response.data.objects.join(", ")}`
  )
}

      setProcessing(false)

    } catch (error) {

      console.log(error)

      setMessage(
        t.uploadFail
      )

      setProcessing(false)
    }
  }
  const resetUpload = () => {

  window.speechSynthesis.cancel()

  setImage(null)

  setPreview(null)

  setMessage("")

  setOcrText("")

  setCaption("")

  setObjects([])

  setDetectedImage("")
}

  return (

    <section
      id="upload"
      className="py-20 px-6 text-center"
    >

      <h2 className="text-4xl font-bold mb-8">

        {t.upload}

      </h2>

      <div className="bg-slate-900 border border-cyan-500/30 p-12 rounded-3xl max-w-2xl mx-auto shadow-2xl">

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />

        {preview && (

          <img
            src={preview}
            alt="Preview"
            className="mt-6 w-64 mx-auto rounded-xl"
          />

        )}

        {processing && (

  <div className="flex flex-col items-center mt-4">

    <div className="w-10 h-10 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>

    <p className="text-cyan-400 mt-3">

      {t.processing}

    </p>

  </div>

)}

        <button
          onClick={handleUpload}
          className="mt-6 bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-3 rounded-2xl transition"
        >

          {t.uploadButton}

        </button>

        {message && (

          <p className="mt-6 text-green-400">

            {message}

          </p>

        )}

        {caption && (

          <div className="mt-8 bg-gradient-to-br from-cyan-100 to-blue-100 text-black p-6 rounded-3xl shadow-2xl border border-cyan-300">

            <h3 className="font-bold mb-2">

              {t.aiDescription}

            </h3>

            <p>

              {caption}

            </p>

          </div>

        )}

        {objects.length > 0 && !ocrText && (
          <div className="mt-8 bg-gradient-to-br from-yellow-100 to-orange-100 text-black p-6 rounded-3xl shadow-2xl border border-yellow-300">

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

        {detectedImage && (

          <div className="mt-8">

            <h3 className="font-bold mb-4 text-cyan-400">

              {t.detectionResult}

            </h3>

            <img
              src={detectedImage}
              alt="Detected"
              className="rounded-2xl border border-cyan-500"
            />

          </div>

        )}
        {(preview || objects.length > 0 || ocrText) && (

  <button
    onClick={resetUpload}
    className="mt-6 bg-red-500 hover:bg-red-400 text-white font-bold px-8 py-3 rounded-2xl transition"
  >

    New Scan

  </button>

)}

        {ocrText && (

          <div className="mt-8 bg-gradient-to-br from-gray-100 to-slate-200 text-black p-6 rounded-3xl shadow-2xl border border-gray-300">

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

export default UploadBox