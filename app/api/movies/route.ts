import { NextResponse } from "next/server"
import { db } from "../../lib/db"

export async function GET() {
  const [rows] = await db.query("SELECT * FROM movies")
  return NextResponse.json(rows)
}

export async function POST(req: Request) {
  const data = await req.json()

  await db.query(
    "INSERT INTO movies (nombre, genero, descripcion, imagen) VALUES (?, ?, ?, ?)",
    [data.nombre, data.genero, data.descripcion, data.imagen]
  )

  return NextResponse.json({ message: "Película registrada" })
}

export async function PUT(req: Request) {
  const data = await req.json()

  await db.query(
    "UPDATE movies SET activa = ? WHERE id = ?",
    [data.activa, data.id]
  )

  return NextResponse.json({ message: "Película actualizada" })
}