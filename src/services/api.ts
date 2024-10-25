import { Post } from "./types/post"

const baseUrl = "https://jsonplaceholder.typicode.com/"

export const getAllPosts = async (page: number): Promise<Post[]> => {
  const res = await fetch(`${baseUrl}posts?_limit=10&_page=${page}`, { cache: "no-store" })
  const posts = await res.json()
  const photosRes = await fetch(`${baseUrl}photos?_limit=10&_page=${page}`)
  const photos = await photosRes.json()
  const postsWithImages = posts.map((post: any, index: any) => ({
    ...post,
    image: photos[index]?.url || "https://via.placeholder.com/600",
  }))

  return postsWithImages
}

export const getPostById = async (id: string) => {
  const res = await fetch(`${baseUrl}posts/${id}`)
  const post = await res.json()
  const photoRes = await fetch(`${baseUrl}photos/${id}`)
  const photo = await photoRes.json()
  const postWithImage = {
    ...post,
    image: photo?.url || "https://via.placeholder.com/600",
  } 

  return !postWithImage.id ? {} : postWithImage
};


export const deletePost = async (id: string): Promise<boolean> => {
  await fetch(`${baseUrl}posts/${id}`, {
    method: "DELETE",
  })
  return true
}