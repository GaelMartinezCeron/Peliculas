"use client"
  import { useState } from "react"
function sage() {


  const generosDisponibles = [
    "Acción",
    "Aventura",
    "Animación",
    "Comedia",
    "Drama",
    "Terror",
    "Ciencia Ficción",
    "Romance",
    "Fantasia",
    "Suspenso",
    "Documental",
    "Crimen",
    "Misterio",
    "Musical",
    "Histórica",
    "Bélica",
    "Deporte",
    "Familiar",
    "Western"
  ]

  const [form, setForm] = useState({
    nombre: "",
    genero: "",
    descripcion: "",
    imagen: "",
    videoUrl: ""
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const isValidUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!form.nombre || !form.genero || !form.descripcion || !form.videoUrl) {
      setError("Completa todos los campos")
      return
    }

    if (!isValidUrl(form.videoUrl)) {
      setError("El link del video no es válido")
      return
    }

    setLoading(true)

    await fetch("/api/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })

    setLoading(false)

    setForm({
      nombre: "",
      genero: "",
      descripcion: "",
      imagen: "",
      videoUrl: ""
    })

    alert("Película registrada correctamente")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-lg">

        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Registrar Película
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {error && (
            <div className="bg-red-100 text-red-600 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <input
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nombre"
            value={form.nombre}
            onChange={e => setForm({ ...form, nombre: e.target.value })}
          />

          <select
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            value={form.genero}
            onChange={e => setForm({ ...form, genero: e.target.value })}
          >
            <option value="">Selecciona un género</option>
            {generosDisponibles.map((genero, index) => (
              <option key={index} value={genero}>
                {genero}
              </option>
            ))}
          </select>

          <textarea
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Descripción"
            rows={4}
            value={form.descripcion}
            onChange={e => setForm({ ...form, descripcion: e.target.value })}
          />

          <input
            type="url"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Link del video"
            value={form.videoUrl}
            onChange={e => setForm({ ...form, videoUrl: e.target.value })}
          />

          <input
            type="file"
            accept="image/*"
            className="w-full p-2 border rounded-lg cursor-pointer file:bg-blue-600 file:text-white file:border-0 file:px-4 file:py-2 file:rounded-lg file:cursor-pointer"
            onChange={e => {
              const file = e.target.files?.[0]
              if (!file) return

              if (!file.type.startsWith("image/")) {
                setError("Solo se permiten archivos de imagen")
                return
              }

              const reader = new FileReader()
              reader.onload = () => {
                setForm({ ...form, imagen: reader.result as string })
              }
              reader.readAsDataURL(file)
            }}
          />

          {form.imagen && (
            <img
              src={form.imagen}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg"
            />
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold py-3 rounded-lg shadow-md"
          >
            {loading ? "Guardando..." : "Guardar Película"}
          </button>

        </form>
      </div>
    </div>
  )
}

export default sage