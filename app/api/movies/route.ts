import { NextResponse } from "next/server"
import { db } from "../../lib/db"

/* 🎬 Obtener películas */
export async function GET() {
  try {
    const [rows]: any = await db.query(
      "SELECT * FROM movies WHERE activa = 1 ORDER BY created_at DESC"
    )

    return NextResponse.json(rows)
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Error al obtener películas" },
      { status: 500 }
    )
  }
}

/* 🎬 Crear película */
export async function POST(req: Request) {
  try {
    const data = await req.json()

    if (!data.nombre || !data.genero) {
      return NextResponse.json(
        { error: "Nombre y género son obligatorios" },
        { status: 400 }
      )
    }

    await db.query(
      `INSERT INTO movies 
      (nombre, genero, descripcion, imagen, video_url) 
      VALUES (?, ?, ?, ?, ?)`,
      [
        data.nombre,
        data.genero,
        data.descripcion || null,
        data.imagen || null,
        data.video_url || null,
      ]
    )

    return NextResponse.json({ message: "Película registrada" })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Error al registrar película" },
      { status: 500 }
    )
  }
}

/* 🎬 Activar / Desactivar película */
export async function PUT(req: Request) {
  try {
    const data = await req.json()

    await db.query(
      "UPDATE movies SET activa = ? WHERE id = ?",
      [data.activa, data.id]
    )

    return NextResponse.json({ message: "Película actualizada" })
  } catch (error) {
    console.error(error)
    return NextResponse.json(
      { error: "Error al actualizar película" },
      { status: 500 }
    )
  }
}