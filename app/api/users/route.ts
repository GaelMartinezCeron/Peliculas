import { NextResponse } from "next/server"
import { db } from "../../lib/db"
import { generatePassword } from "../../lib/generarpass"

export async function POST(req: Request) {
  try {
    const data = await req.json()

    if (!data.nombre || !data.paterno || !data.materno || !data.correo) {
      return NextResponse.json(
        { message: "Todos los campos son obligatorios" },
        { status: 400 }
      )
    }

    // Verificar si ya existe
    const [existing]: any = await db.query(
      "SELECT id FROM users WHERE correo = ?",
      [data.correo]
    )

    if (existing.length > 0) {
      return NextResponse.json(
        { message: "Este correo ya está registrado" },
        { status: 400 }
      )
    }

    const password = generatePassword(8)

    await db.query(
      "INSERT INTO users (nombre, paterno, materno, correo, password) VALUES (?, ?, ?, ?, ?)",
      [data.nombre, data.paterno, data.materno, data.correo, password]
    )

    return NextResponse.json({
      message: "Usuario registrado correctamente"
    })

  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { message: "Error interno del servidor" },
      { status: 500 }
    )
  }
}