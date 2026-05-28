function FeatureCards() {

  const features = [
    "OCR Text Reading",
    "YOLO Object Detection",
    "Voice Assistance",
    "Live Camera AI",
  ]

  return (
    <section
  id="features" className="py-24 px-8 bg-slate-950">

      <h2 className="text-5xl font-bold text-center mb-16">
        AI Features
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

        {features.map((feature, index) => (

          <div
            key={index}
            className="bg-slate-900 border border-cyan-500/20 p-10 rounded-3xl hover:scale-105 transition duration-300 shadow-xl"
          >

            <h3 className="text-2xl font-bold text-cyan-400">
              {feature}
            </h3>

          </div>

        ))}

      </div>

    </section>
  )
}

export default FeatureCards