import { useEffect, useState } from 'react'
import api from '../services/api'

type Task = {
  id: number
  title: string
  done: boolean
}

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTitle, setNewTitle] = useState('')

  const loadTasks = () => {
    api.get('/tasks').then(res => setTasks(res.data))
  }

  useEffect(() => {
    loadTasks()
  }, [])

  const addTask = async () => {
    if (!newTitle.trim()) return
    await api.post('/tasks', { title: newTitle })
    setNewTitle('')
    loadTasks()
  }

  const toggleDone = async (task: Task) => {
    await api.patch(`/tasks/${task.id}`, { done: !task.done })
    loadTasks()
  }

  const deleteTask = async (id: number) => {
    await api.delete(`/tasks/${id}`)
    loadTasks()
  }

  return (
  <div className="min-h-screen flex items-center justify-center">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Minhas Tarefas</h2>

      <div className="flex gap-2 mb-6">
        <input
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={newTitle}
          onChange={e => setNewTitle(e.target.value)}
          placeholder="Nova tarefa"
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          onClick={addTask}
        >
          Adicionar
        </button>
      </div>

      <ul className="space-y-3">
        {tasks.map(task => (
          <li
            key={task.id}
            className="flex justify-between items-center border-b pb-2"
          >
            <span
              onClick={() => toggleDone(task)}
              className={`cursor-pointer ${task.done ? 'line-through text-gray-400' : 'text-gray-800'}`}
            >
              {task.title}
            </span>
            <button
              onClick={() => deleteTask(task.id)}
              className="text-red-500 hover:text-red-700 transition"
            >
              🗑️
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
)
}
