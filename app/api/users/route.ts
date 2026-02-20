import { NextResponse } from "next/server"
import { db } from "../../lib/db"
function generatePassword(length = 8) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let password = ""
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return password
}

export async function GET() {
  const [rows] = await db.query("SELECT * FROM users")
  return NextResponse.json(rows)
}

export async function POST(req: Request) {
  const data = await req.json()

  const password = generatePassword(8)

  await db.query(
    "INSERT INTO users (nombre, paterno, materno, correo, password) VALUES (?, ?, ?, ?, ?)",
    [data.nombre, data.paterno, data.materno, data.correo, password]
  )

  return NextResponse.json({ password })
}

export async function PUT(req: Request) {
  const data = await req.json()

  await db.query(
    "UPDATE users SET activo = ? WHERE id = ?",
    [data.activo, data.id]
  )

  return NextResponse.json({ message: "Usuario actualizado" })
}