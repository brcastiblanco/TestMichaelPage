"use client"

import { Post } from "../../services/types/post"
import { FormEventHandler, useState } from "react"
import { FiEdit, FiTrash2, FiSearch } from "react-icons/fi"
import { deletePost } from "../../services/api"
import Modal from "../../components/modal"
import Link from "next/link"

interface PostProps {
  post: Post
  onDelete: (id: string) => void
  onUpdate: (arg: Post) => void
}

const ActionsPost: React.FC<PostProps> = ({ post, onDelete, onUpdate }) => {
  const [openModalUpdate, setOpenModalUpdate] = useState<boolean>(false)
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false)
  const [postUpdate, setPostUpdate] = useState<any>(post)

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setPostUpdate({ ...postUpdate, [name]: value })
  }

  const handleSubmitUpdatePost: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const result = {
      id: post.id,
      title: postUpdate.title,
      userId: post.userId,
      body: postUpdate.body,
      image: post.image
    }
    setOpenModalUpdate(false)
    onUpdate(result)
  }

  const handleDeletePost = async (id: string) => {
    await deletePost(id)
    setOpenModalDeleted(false)
    onDelete(post.id)
  }

  return (
    <tr key={post.id}>
      <td className=" text-white">{post.title}</td>
      <td className=" text-white">{post.body}</td>
      <td className="flex gap-4">
        <div>
          <Link href={`/listado/${post.id}`} className="tooltip">
            <FiSearch
              className="text-green-500"
              size={20} />
            <span className="tooltiptext hidden sm:block">Ver</span>
          </Link>
        </div>
        <div>
          <div className="tooltip">
            <FiEdit
              onClick={() => setOpenModalUpdate(true)}
              cursor="pointer"
              className="text-blue-500"
              size={20}
            />
            <span className="tooltiptext hidden sm:block">Actualizar</span>
          </div>
          <Modal modalOpen={openModalUpdate} setModalOpen={setOpenModalUpdate}>
            <form onSubmit={handleSubmitUpdatePost}>
              <h3 className="font-bold text-lg text-center">Editar publicación</h3>
              <div>
                <input
                  type="text"
                  name="title"
                  value={postUpdate.title}
                  placeholder="Titulo"
                  onChange={handleInputChange}
                  className="input input-bordered w-full my-3 p-3"
                />
                <textarea
                  name="body"
                  onChange={handleInputChange}
                  className="input input-bordered w-full h-auto p-3"
                  rows={10}
                  placeholder="Descripción"
                  value={postUpdate.body} />
                <div className="modal-action mt-2">
                  <button
                    type="button"
                    className="btn btn-error text-white min-h-10 h-10"
                    onClick={() => { setPostUpdate(post), setOpenModalUpdate(false) }}>
                    Cancelar
                  </button>
                  <button type="submit" className="btn btn-success text-white min-h-10 h-10">
                    Editar
                  </button>
                </div>
              </div>
            </form>
          </Modal>
        </div>
        <div>
          <div className="tooltip">
            <FiTrash2
              onClick={() => setOpenModalDeleted(true)}
              cursor="pointer"
              className="text-red-500"
              size={20}
            />
            <span className="tooltiptext hidden sm:block">Eliminar</span>
          </div>
          <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
            <h3 className="font-bold text-lg text-center">Eliminar publicación</h3>
            <h4 className="text-base text-center">
              ¿Estas seguro que deseas eliminar esta publicación?
            </h4>
            <div className="modal-action flex justify-center">
              <button
                onClick={() => setOpenModalDeleted(false)}
                className="btn btn-error text-white min-h-10 h-10">
                Cancelar
              </button>
              <button
                onClick={() => handleDeletePost(post.id)}
                className="btn btn-success text-white min-h-10 h-10">
                Si, eliminar
              </button>
            </div>
          </Modal>
        </div>
      </td>
    </tr>
  )
}

export default ActionsPost
