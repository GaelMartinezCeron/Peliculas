"use client"

import { useEffect, useState } from "react"

interface Movie {
  id: number
  nombre: string
  genero: string
  descripcion: string
  imagen: string
  video_url: string | null
}

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  useEffect(() => {
    const fetchMovies = async () => {
      const res = await fetch("/api/movies")
      const data = await res.json()
      setMovies(data)
    }

    fetchMovies()
  }, [])

  function convertToEmbed(url: string) {
    if (!url) return null

    if (url.includes("youtube.com/watch?v=")) {
      return url.replace("watch?v=", "embed/")
    }

    if (url.includes("youtu.be/")) {
      return url.replace("youtu.be/", "youtube.com/embed/")
    }

    return url
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-4xl font-bold mb-10">
        🎬 Películas
      </h1>

      {/* 🎞 Películas */}
      <div className="flex gap-6 overflow-x-auto pb-6">
        {movies.map(movie => (
          <div
            key={movie.id}
            onClick={() => setSelectedMovie(movie)}
            className="min-w-[250px] cursor-pointer bg-gray-900 rounded-xl overflow-hidden hover:scale-105 transition"
          >
            <img
              src={movie.imagen}
              alt={movie.nombre}
              className="w-full h-60 object-cover"
            />

            <div className="p-4">
              <h2 className="font-semibold">{movie.nombre}</h2>
              <p className="text-sm text-gray-400 mt-2 line-clamp-2">
                {movie.descripcion}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* 🎥 Trailer */}
      {selectedMovie && selectedMovie.video_url && (
        <div className="mt-16">

          <h2 className="text-3xl font-bold text-center mb-6">
            {selectedMovie.nombre}
          </h2>

          <div className="aspect-video max-w-5xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              src={convertToEmbed(selectedMovie.video_url) || undefined}
              className="w-full h-full"
              allowFullScreen
            />
          </div>

        </div>
      )}

    </div>
  )
}