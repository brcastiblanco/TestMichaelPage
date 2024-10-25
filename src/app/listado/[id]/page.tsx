"use client"

import { getPostById } from 'api/services/api'
import { Post } from 'api/services/types/post'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function PostDetail({ params }: { params: { id: string } }) {
    const [post, setPost] = useState<Post>()

    useEffect(() => {
        if (params.id) {
            const fetchPost = async () => {
                const post = await getPostById(params.id)
                if (Object.keys(post).length === 0) {
                    const storedPosts = localStorage.getItem('posts');
                    if (storedPosts) {
                        const posts = JSON.parse(storedPosts);
                        const localPost = posts.find((p: { id: string }) => p.id === params.id);
                        if (localPost) {
                            console.log(localPost)
                            setPost(localPost)
                        }
                    }
                } else {
                    setPost(post)
                }
            }

            fetchPost()
        }
    }, [params.id])


    if (!post) return <p>Cargando...</p>

    return (
        <div className="p-6 mt-6 bg-gray-50 shadow-md rounded-lg max-w-2xl md:mx-auto mx-4 border border-gray-200">
            <div className='md:flex gap-3'>
                <Image
                    src={post.image}
                    alt={post.title}
                    width={150}
                    height={150}
                    className="rounded-lg mb-4 object-cover"
                />
                <div>
                    <h1 className="text-3xl font-semibold text-gray-900 mb-3">{post.title}</h1>
                    <p className="text-gray-700 text-base mb-4">{post.body}</p>
                </div>
            </div>
            <div className='flex justify-end'>
                <Link href={'/listado'} className="block text-center bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600 transition duration-300">
                    Volver al Listado
                </Link>
            </div>
        </div>
    )
}
