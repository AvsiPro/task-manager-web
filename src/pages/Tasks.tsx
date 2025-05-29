import { useEffect, useState } from "react";
import axios from "axios";
import {
  Trash2,
  Menu,
  ListTodo,
  Settings,
  LogOut,
} from "lucide-react";

interface Task {
  id: number;
  title: string;
  description: string;
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activePage, setActivePage] = useState<"tarefas" | "configuracoes">("tarefas");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await axios.get("http://localhost:3000/tasks", {
        headers: { Authorization: `Bearer ${token}` },
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
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (error) {
      console.error("Erro ao adicionar tarefa", error);
    }
  };

  const handleDeleteTask = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await axios.delete(`http://localhost:3000/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchTasks();
    } catch (error) {
      console.error("Erro ao excluir tarefa", error);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;

    const token = localStorage.getItem("token");
    if (!token) return;

    const formData = new FormData();
    formData.append("file", selectedFile);

    try {
      const response = await axios.post("http://localhost:3000/tasks/upload", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Arquivo enviado com sucesso!");

      // 👇 Isso vai atualizar a tela com as novas tasks
      fetchTasks();

      setSelectedFile(null);
    } catch (error) {
      console.error("Erro ao enviar arquivo", error);
      alert("Falha no envio do arquivo.");
    }
};

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className={`${
          isCollapsed ? "w-16" : "w-60"
        } bg-gray-900 text-white transition-all duration-300 relative shadow-md`}
      >
        <div className="flex justify-end p-2">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-300 hover:text-white"
          >
            <Menu size={20} />
          </button>
        </div>

        <nav className="px-2">
          <ul className="space-y-2 mt-6">
            <li>
              <button
                onClick={() => setActivePage("tarefas")}
                className={`flex items-center w-full px-3 py-2 rounded-md transition ${
                  activePage === "tarefas" ? "bg-gray-800" : "hover:bg-gray-800"
                }`}
              >
                <ListTodo size={18} className="mr-3" />
                {!isCollapsed && <span className="text-sm">Tarefas</span>}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActivePage("configuracoes")}
                className={`flex items-center w-full px-3 py-2 rounded-md transition ${
                  activePage === "configuracoes" ? "bg-gray-800" : "hover:bg-gray-800"
                }`}
              >
                <Settings size={18} className="mr-3" />
                {!isCollapsed && <span className="text-sm">Configurações</span>}
              </button>
            </li>
            <li>
              <button className="flex items-center w-full px-3 py-2 hover:bg-gray-800 rounded-md transition">
                <LogOut size={18} className="mr-3" />
                {!isCollapsed && <span className="text-sm">Sair</span>}
              </button>
            </li>
          </ul>
        </nav>

        {/* Linha vertical suave */}
        <div className="absolute top-0 right-0 h-full w-[1px] bg-gray-700"></div>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 bg-gray-100 p-6 flex flex-col items-center">
        {activePage === "tarefas" ? (
          <>
            <h1 className="text-xl font-semibold mb-4">Minhas Tarefas</h1>

            <form
              onSubmit={handleAddTask}
              className="bg-white p-3 rounded-lg shadow-md w-[280px] box-border mb-6"
            >
              <input
                type="text"
                placeholder="Título"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-2 py-1 border rounded-lg mb-2 text-xs"
              />
              <input
                type="text"
                placeholder="Descrição"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-2 py-1 border rounded-lg mb-4 text-xs"
              />
              <button
                type="submit"
                className="w-full px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 text-xs"
              >
                Adicionar
              </button>
            </form>

            <ul className="w-[280px] space-y-2">
              {tasks.map((task) => (
                <li
                  key={task.id}
                  className="bg-white p-3 rounded-md shadow border text-sm flex justify-between items-start"
                >
                  <div>
                    <h3 className="font-semibold">{task.title}</h3>
                    <p>{task.description}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="text-red-500 hover:text-red-700 ml-2"
                    title="Excluir tarefa"
                  >
                    <Trash2 size={18} />
                  </button>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <h1 className="text-xl font-semibold mb-6">Configurações</h1>
            <div className="bg-white p-4 rounded shadow-md w-[280px] flex flex-col items-center">
              <label className="text-sm mb-2">Carregar arquivo:</label>
              <input
                type="file"
                className="text-sm mb-2"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setSelectedFile(e.target.files[0]);
                  }
                }}
              />
              <button
                onClick={handleFileUpload}
                className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs disabled:opacity-50"
                disabled={!selectedFile}
              >
                Enviar
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
