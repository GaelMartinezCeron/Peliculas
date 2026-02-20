"use client"
import { useState } from "react"

export default function Saludar() {

  const [form, setForm] = useState({
    nombre: "",
    paterno: "",
    materno: "",
    correo: ""
  })

  const [generatedPassword, setGeneratedPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    })

    const data = await res.json()
    setGeneratedPassword(data.password)

    setForm({
      nombre: "",
      paterno: "",
      materno: "",
      correo: ""
    })

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 px-4">
      
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl">

        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Registrar Usuario
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Nombre"
            required
            value={form.nombre}
            onChange={e => setForm({ ...form, nombre: e.target.value })}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="text"
            placeholder="Apellido Paterno"
            required
            value={form.paterno}
            onChange={e => setForm({ ...form, paterno: e.target.value })}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="text"
            placeholder="Apellido Materno"
            required
            value={form.materno}
            onChange={e => setForm({ ...form, materno: e.target.value })}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="email"
            placeholder="Correo"
            required
            value={form.correo}
            onChange={e => setForm({ ...form, correo: e.target.value })}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition duration-300 text-white font-semibold py-3 rounded-lg shadow-md"
          >
            {loading ? "Registrando..." : "Registrar"}
          </button>

        </form>

        {generatedPassword && (
          <div className="mt-6 bg-green-100 border border-green-300 p-4 rounded-xl">
            <p className="text-green-700 font-semibold">
              Usuario registrado correctamente
            </p>
            <div className="mt-2">
              <span className="font-bold text-gray-700">Contraseña generada:</span>
              <div className="mt-1 bg-white p-2 rounded-md border font-mono text-indigo-600">
                {generatedPassword}
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  )
}