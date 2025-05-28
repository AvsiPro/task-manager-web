import { useEffect, useState } from "react";
import axios from "axios";

interface Task {
  id: number;
  title: string;
  description: string;
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.get("http://localhost:3000/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(response.data);
    } catch (error) {
      console.error("Erro ao buscar tarefas", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await axios.post(
        "http://localhost:3000/tasks",
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (error) {
      console.error("Erro ao adicionar tarefa", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4">
      <h1 className="text-xl font-semibold mb-4">Minhas Tarefas</h1>

      <form
        onSubmit={handleAddTask}
        className="bg-white p-3 rounded shadow-md w-[280px] box-border mb-6"
      >
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-2 py-1 border rounded mb-2 text-xs box-border"
        />
        <input
          type="text"
          placeholder="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-2 py-1 border rounded mb-4 text-xs box-border"
        />
        <button
          type="submit"
          className="w-full px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs box-border"
        >
          Adicionar
        </button>
      </form>

      <ul className="w-[280px] space-y-2 list-none">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="bg-white p-3 rounded shadow border text-sm"
          >
            <h3 className="font-semibold">{task.title}</h3>
            <p>{task.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
