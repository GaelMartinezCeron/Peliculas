"use client"

import { useState } from "react"

export default function AgregarUsers() {
  const [formData, setFormData] = useState({
    nombre: "",
    paterno: "",
    materno: "",
    correo: ""
  })

  const [message, setMessage] = useState("")
  const [isError, setIsError] = useState(false)

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (data.error) {
        setIsError(true)
        setMessage(data.message)
        return
      }

      setIsError(false)
      setMessage(data.message)

      setFormData({
        nombre: "",
        paterno: "",
        materno: "",
        correo: ""
      })

    } catch (error) {
      setIsError(true)
      setMessage("Error al conectar con el servidor")
    }
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Registrar Usuario</h2>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            name="nombre"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="paterno"
            placeholder="Apellido Paterno"
            value={formData.paterno}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="materno"
            placeholder="Apellido Materno"
            value={formData.materno}
            onChange={handleChange}
            style={styles.input}
          />

          <input
            name="correo"
            placeholder="Correo Electrónico"
            value={formData.correo}
            onChange={handleChange}
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Registrar
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: "15px",
              color: isError ? "#ff4d4d" : "#00cc66",
              fontWeight: "500"
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  )
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #1e3c72, #2a5298)"
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    width: "100%",
    maxWidth: "400px"
  },
  title: {
    textAlign: "center" as const,
    marginBottom: "20px",
    fontSize: "22px",
    fontWeight: "bold",
    color: "#333"
  },
  form: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "15px"
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "14px",
    outline: "none"
  },
  button: {
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    backgroundColor: "#1e3c72",
    color: "white",
    fontSize: "15px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s"
  }
}