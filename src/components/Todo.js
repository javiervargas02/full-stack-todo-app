export default function Todo({ todo, openDeleting }) {
  return (
    <>
      <li className="flex flex-col items-center space-y-4">
        <h2 className="font-bold text-xl">{todo.title}</h2>
        <p>{todo.completed ? "Completed" : "Not Completed"}</p>
        <button
          onClick={() => openDeleting({ open: true, id: todo.id })}
          className="bg-red-500 text-white p-2 rounded-xl hover:bg-red-600 duration-200 w-full">
          Delete
        </button>
      </li>
    </>
  );
}
