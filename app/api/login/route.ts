import { NextResponse } from "next/server"
import { db } from "@/app/lib/db"
import bcrypt from "bcryptjs"

export async function POST(req: Request) {
  const { email, password } = await req.json()

  const [rows]: any = await db.query(
    "SELECT * FROM users WHERE email = ?",
    [email]
  )

  if (rows.length === 0) {
    return NextResponse.json({ error: "Usuario no encontrado" }, { status: 401 })
  }

  const user = rows[0]

  const validPassword = await bcrypt.compare(password, user.password)

  if (!validPassword) {
    return NextResponse.json({ error: "Contraseña incorrecta" }, { status: 401 })
  }

  if (user.role !== "admin") {
    return NextResponse.json({ error: "No tienes permisos" }, { status: 403 })
  }

  return NextResponse.json({
    message: "Login correcto",
    user: {
      id: user.id,
      nombre: user.nombre,
      role: user.role
    }
  })
}