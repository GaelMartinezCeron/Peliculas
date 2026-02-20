"use client"
import { useState } from "react"

function Sage() {

  const generosDisponibles = [
    "Acción","Aventura","Animación","Comedia","Drama","Terror",
    "Ciencia Ficción","Romance","Fantasia","Suspenso","Documental",
    "Crimen","Misterio","Musical","Histórica","Bélica",
    "Deporte","Familiar","Western"
  ]

  const [form, setForm] = useState({
    nombre: "",
    genero: "",
    descripcion: "",
    imagen: "",
    video_url: ""   // ✅ CAMBIADO AQUÍ
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

    if (!form.nombre || !form.genero || !form.descripcion || !form.video_url) {
      setError("Completa todos los campos")
      return
    }

    if (!isValidUrl(form.video_url)) {
      setError("El link del video no es válido")
      return
    }

    setLoading(true)

    const res = await fetch("/api/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })

    const data = await res.json()

    if (!res.ok) {
      setError(data.error || "Error al guardar")
      setLoading(false)
      return
    }

    setLoading(false)

    setForm({
      nombre: "",
      genero: "",
      descripcion: "",
      imagen: "",
      video_url: ""
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
            className="w-full p-3 border rounded-lg"
            placeholder="Nombre"
            value={form.nombre}
            onChange={e => setForm({ ...form, nombre: e.target.value })}
          />

          <select
            className="w-full p-3 border rounded-lg bg-white"
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
            className="w-full p-3 border rounded-lg"
            placeholder="Descripción"
            rows={4}
            value={form.descripcion}
            onChange={e => setForm({ ...form, descripcion: e.target.value })}
          />

          <input
            type="url"
            className="w-full p-3 border rounded-lg"
            placeholder="Link del video (YouTube)"
            value={form.video_url}
            onChange={e => setForm({ ...form, video_url: e.target.value })}
          />

          <input
            type="file"
            accept="image/*"
            className="w-full p-2 border rounded-lg cursor-pointer"
            onChange={e => {
              const file = e.target.files?.[0]
              if (!file) return

              const reader = new FileReader()
              reader.onload = () => {
                setForm(prev => ({ ...prev, imagen: reader.result as string }))
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
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded-lg"
          >
            {loading ? "Guardando..." : "Guardar Película"}
          </button>

        </form>
      </div>
    </div>
  )
}

export default Sage