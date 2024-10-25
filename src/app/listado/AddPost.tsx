import { AiOutlinePlus } from 'react-icons/ai'
import { FormEventHandler, useState, Dispatch, SetStateAction } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Post } from 'api/services/types/post'
import Modal from '../../components/modal'

interface AddPostProps {
  setPosts: Dispatch<SetStateAction<Post[]>>
}

const AddPost: React.FC<AddPostProps> = ({ setPosts }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [newPostValue, setNewPostValue] = useState({ title: '', body: '' })

  const handleInputChange = (e: any) => {
    const { name, value } = e.target
    setNewPostValue({ ...newPostValue, [name]: value })
  }

  const handleSubmitNewPost: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    const newPost = {
      id: uuidv4(),
      title: newPostValue.title,
      body: newPostValue.body,
      userId: '1',
      image: ''
    }
    setPosts((prevPosts) => {
      const updatedPosts = [newPost, ...prevPosts]
      localStorage.setItem('posts', JSON.stringify(updatedPosts))
      return updatedPosts
    })
    setNewPostValue({ title: '', body: '' })
    setModalOpen(false)
  }

  return (
    <div className="text-end">
      <button
        onClick={() => setModalOpen(true)}
        className="btn btn-success text-white text-sm min-h-10 h-10"
      >
        <span className='hidden sm:block'>Agregar publicación</span> <AiOutlinePlus size={19} />
      </button>
      <Modal modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <form onSubmit={handleSubmitNewPost}>
          <h3 className="font-bold text-lg text-center">Agregar nueva publicación</h3>
          <div>
            <input
              type="text"
              name="title"
              value={newPostValue.title}
              placeholder="Título"
              onChange={handleInputChange}
              className="input input-bordered w-full my-3 p-3"
            />
            <textarea
              name="body"
              value={newPostValue.body}
              onChange={handleInputChange}
              className="input input-bordered w-full h-auto p-3"
              rows={10}
              placeholder="Descripción"
            />
            <div className="modal-action mt-2">
              <button
                type="button"
                className="btn btn-error text-white min-h-10 h-10"
                onClick={() => { setNewPostValue({ title: '', body: '' }), setModalOpen(false) }}>
                Cancelar
              </button>
              <button type="submit" className="btn btn-success text-white min-h-10 h-10">
                Agregar
              </button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default AddPost
