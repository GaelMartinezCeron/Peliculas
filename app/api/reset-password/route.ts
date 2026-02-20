import { NextResponse } from "next/server"
import { db } from "../../lib/db"  // SOLO la conexión a MySQL

// Función para generar contraseña aleatoria
function generatePassword(length = 8) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let password = ""
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return password
}

export async function POST(req: Request) {
  const { correo } = await req.json()

  // Buscar el usuario en la base de datos
  const [rows]: any = await db.query(
    "SELECT * FROM users WHERE correo = ?",
    [correo]
  )

  if (rows.length === 0) {
    return NextResponse.json({ error: "Usuario no encontrado" })
  }

  const newPass = generatePassword(8)

  // Actualizar la contraseña en la BD
  await db.query(
    "UPDATE users SET password = ? WHERE correo = ?",
    [newPass, correo]
  )

  return NextResponse.json({ nuevaPassword: newPass })
}