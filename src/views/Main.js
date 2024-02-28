import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../utils/helpers";
import Todo from "../components/Todo";
import Modal from "../components/Modal";
import toast from "react-hot-toast";

export default function Main() {
  const [todos, setTodos] = useState([]);
  const [selected, setSelected] = useState("pending");
  const [toDelete, setToDelete] = useState({
    open: false,
    id: null,
  });

  const handleDelete = async () => {
    try {
      console.log(toDelete);
      const response = await axios.delete(`${API_URL}/todo/${toDelete.id}`);
      console.log(response);
      toast.success("To-Do deleted successfully");
      setTodos((prev) => prev.filter((t) => t.id !== toDelete.id));
      setToDelete({ open: false, id: null });
    } catch (err) {
      if (err.response.status === 404) {
        toast.error("To-Do not found");
        setToDelete({ open: false, id: null });
      } else {
        toast.error(
          err.response.data.detail ||
            "An error occurred. Please check your internet connection"
        );
      }
    }
  };

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/`);
        setTodos(data);
      } catch (err) {
        console.error(err);
      }
    };

    loadTodos();
  }, []);

  return (
    <>
      {toDelete.open && (
        <Modal handleClose={() => setToDelete({ open: false, id: null })}>
          <div className="w-full text-center md:flex md:flex-col md:items-center md:justify-center px-8 py-12">
            <h2 className="text-2xl font-medium">
              Are you sure you want to delete this To-Do?
            </h2>
            <br />
            <div className="flex flex-col items-center w-full space-y-6 ">
              <button
                className="w-full px-4 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600 hover:-translate-y-1 duration-200 xl:w-3/4"
                onClick={() => {
                  handleDelete();
                }}>
                Yes
              </button>
              <button
                className="w-full px-4 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 hover:-translate-y-1 duration-200 xl:w-3/4"
                onClick={() => setToDelete({ open: false, id: null })}>
                No
              </button>
            </div>
          </div>
        </Modal>
      )}
      <main className="py-6 px-8 xl:px-16 flex flex-col items-center">
        <h1 className="font-bold text-4xl">To-Do List</h1>
        {todos.length === 0 && (
          <section className="bg-gray-100 my-12 px-8 py-6 rounded-lg shadow-2xl border-2 border-black flex flex-col items-center">
            <p className="py-4">You do not have any todos on your list.</p>
            <p className="py-4">Please add a new todo</p>
            <button className="w-full bg-blue-500 text-white p-4 rounded-xl font-medium shadow-lg hover:bg-blue-600 duration-200">
              Add new todo
            </button>
          </section>
        )}
        {todos.length > 0 && (
          <>
            <div className="flex justify-evenly w-full py-8 space-x-6">
              <button
                onClick={() => setSelected("pending")}
                disabled={selected === "pending"}
                className="bg-blue-500 w-1/2 text-white p-4 rounded-xl hover:bg-blue-600 duration-200 shadow-xl disabled:cursor-not-allowed disabled:bg-blue-400">
                Pending To-Do's
              </button>
              <button
                onClick={() => setSelected("completed")}
                disabled={selected === "completed"}
                className="bg-blue-500 w-1/2 text-white p-4 rounded-xl hover:bg-blue-600 duration-200 shadow-xl disabled:cursor-not-allowed disabled:bg-blue-400">
                Completed To-Do's
              </button>
            </div>
            <section className="bg-gray-100 my-12 px-8 py-6 rounded-lg shadow-2xl border-2 border-black w-full">
              <ul className="space-y-4 flex flex-col">
                {todos.map((todo) => (
                  <Todo key={todo.id} todo={todo} openDeleting={setToDelete} />
                ))}
              </ul>
            </section>
          </>
        )}
      </main>
    </>
  );
}
