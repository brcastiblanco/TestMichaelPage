'use client'

import { useState, useEffect, useRef } from "react"
import { getAllPosts } from "api/services/api"
import { Post } from "api/services/types/post"
import ActionsPost from "./ActionsPost"
import AddPost from "./AddPost"

const ListPosts = () => {
  const [posts, setPosts] = useState<Post[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const tableRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true)
      const newPosts = await getAllPosts(page)
      const storedPosts = localStorage.getItem('posts')
      if (storedPosts) {
        setPosts(JSON.parse(storedPosts))
      }
      setPosts((prevPosts) => {
        const filteredNewPosts = newPosts.filter(
          (newPost) => !prevPosts.some((prevPost) => prevPost.id === newPost.id)
        )
        const updatedPosts = [...prevPosts, ...filteredNewPosts]
        localStorage.setItem('posts', JSON.stringify(updatedPosts))

        return updatedPosts
      })
      setLoading(false)
    }
    fetchPosts()
  }, [page])

  useEffect(() => {
    const handleScroll = () => {
      if (tableRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = tableRef.current
        if (scrollTop + clientHeight >= scrollHeight - 2 && !loading) {
          setPage((prevPage) => prevPage + 1)
        }
      }
    }
    const currentTableRef = tableRef.current
    if (currentTableRef) {
      currentTableRef.addEventListener('scroll', handleScroll)
    }
    return () => {
      if (currentTableRef) {
        currentTableRef.removeEventListener('scroll', handleScroll)
      }
    }
  }, [loading])

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.body.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleDelete = (postId: string) => {
    setPosts(posts.filter((post) => post.id !== postId))
    const storedPosts = localStorage.getItem('posts')
    if (storedPosts) {
      const parsedPosts = JSON.parse(storedPosts)
      const updatedLocalPosts = parsedPosts.filter((post: { id: string }) => post.id !== postId)
      localStorage.setItem('posts', JSON.stringify(updatedLocalPosts))
    }
  }

  const handleUpdate = (updatedPost: Post) => {
    setPosts((prevPosts) => {
      const updatedPosts = prevPosts.map((post) =>
        post.id === updatedPost.id ? { ...post, ...updatedPost } : post
      )
      const storedPosts = localStorage.getItem('posts')
      if (storedPosts) {
        const parsedPosts = JSON.parse(storedPosts)
        const updatedLocalPosts = parsedPosts.map((post: Post) =>
          post.id === updatedPost.id ? { ...post, ...updatedPost } : post
        )
        localStorage.setItem('posts', JSON.stringify(updatedLocalPosts))
      }
      return updatedPosts
    })
  }

  return (
    <div>
      <div className="flex justify-between">
        <input
          type="text"
          placeholder="Buscar publicaciones..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border-0 text-base rounded-lg p-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
        />
        <AddPost setPosts={setPosts} />
      </div>
      <div ref={tableRef} className="overflow-y-auto h-[68vh]">
        <table className="table w-full">
          <thead className="sticky top-0 bg-gray-700 z-10">
            <tr className="text-white">
              <th className="text-base">Titulo</th>
              <th className="text-base">Descripción</th>
              <th className="text-base">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.map((post) => (
              <ActionsPost key={post.id} post={post} onDelete={handleDelete} onUpdate={handleUpdate} />
            ))}
          </tbody>
        </table>
        {loading && <p>Loading...</p>}
      </div>
    </div>
  )
}

export default ListPosts
