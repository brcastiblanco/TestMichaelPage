"use client";

import { ITask } from "../Components/types/task";
import { FormEventHandler, useState } from "react";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { LiaCloneSolid } from "react-icons/lia";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "./apis";
import {cloneTodo} from "./apis";
import { v4 as uuidv4 } from "uuid";
interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);
  const [openModalDeleted, setOpenModalDeleted] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.username);
  const [openModalClone, setOpenModalClone] = useState<boolean>(false);
  const [taskToClone, setTaskToClone] = useState<string>(task.username);
  // const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
  //   e.preventDefault();
  //   await editTodo({
  //     id: task.id,
  //     username: taskToEdit,
  //   });
  //   setOpenModalEdit(false);
  //   router.refresh();
  // };
  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      username: taskToEdit,
    });
  }
  const handleDeleteTask = async (id: string) => {
    await deleteTodo(id);
    setOpenModalDeleted(false);
    router.refresh();
  };
  const handleCloneTask = async (username: string) => {
    await cloneTodo({id: uuidv4(),
      username: taskToEdit,});
    setOpenModalClone(false);
    router.refresh();
  };

  // const handleCloneTask = async (username: string) => {
  //   await cloneTodo(username);
  //   //await cloneTodo(todo);
  //   setOpenModalClone(false);
  //   router.refresh();
  // };

  return (
    <tr key={task.id}>
      <td className="w-full text-white">{task.username}</td>
      <td className="flex gap-3">
        <FiEdit
          onClick={() => setOpenModalEdit(true)}
          cursor="pointer"
          className="text-blue-500"
          size={25}
        />
       <Modal modalOpen={openModalEdit} setModalOpen={setOpenModalEdit}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className="font-bold text-lg">Edit Task</h3>

            <div className="modal-action">
              <input
                type="text"
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
                placeholder="Type here"
                className="input input-bordered w-full"
              />

              <button type="submit" className="btn">
                Update
              </button>
            </div>
          </form>
        </Modal>
        </td>
        <td>
        <FiTrash2
          onClick={() => setOpenModalDeleted(true)}
          cursor="pointer"
          className="text-red-500"
          size={25}
        />
        <Modal modalOpen={openModalDeleted} setModalOpen={setOpenModalDeleted}>
          <h3 className="text-lg">
            Are you sure, you want to delete this task?
          </h3>
          <div className="modal-action">
            <button onClick={() => handleDeleteTask(task.id)} className="btn">
              Yes
            </button>
          </div>
        </Modal>
        </td>
        <td>
        <LiaCloneSolid
        //  onClick={() => setOpenModalDeleted(true)}
        onClick={() => setOpenModalClone(true)}  
        cursor="pointer"
          className="text-green-500"
          size={25}
        />
       
        <Modal modalOpen={openModalClone} setModalOpen={setOpenModalClone}>
          <h3 className="text-lg">
            Are you sure, you want to clone this task?
          </h3>
          <div className="modal-action">
            <button onClick={() => handleCloneTask(taskToClone)} className="btn">
              
              Yes
            </button>
          </div>
        </Modal>
        
      </td>
    </tr>
  );
};

export default Task;
