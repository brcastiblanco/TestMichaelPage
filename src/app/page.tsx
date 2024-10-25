import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-5">
      <h1 className="text-xl sm:text-2xl md:text-4xl font-bold">
        Bienvenido a la aplicación de Posts
      </h1>
      <p className="mt-4 text-xs sm:text-sm md:text-base">
        Esta aplicación muestra una lista de publicaciones obtenidas de una API pública.
      </p>
      <Link href="/listado" className="mt-6 bg-blue-500 text-white px-4 py-2 rounded-md text-xs sm:text-sm md:text-base">
        Ver Listado
      </Link>
    </div>
  )
}
