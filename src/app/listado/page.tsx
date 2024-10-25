import ListPosts from "./ListPosts"

export default async function Home() {
 return (
    <main className="max-w-4xl mx-auto p-4">
      <div className="text-center mt-4 mb-6 flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Listado de publicaciones</h1>
      </div>
      <div className="text-center">
        <ListPosts />
      </div>
    </main>
  )
}
