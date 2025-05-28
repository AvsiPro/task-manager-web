import { useEffect, useState } from 'react'
import api from '../services/api'

export default function Tasks() {
  const [tasks, setTasks] = useState<any[]>([])

  useEffect(() => {
    api.get('/tasks').then(res => setTasks(res.data))
  }, [])

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl mb-4">Suas Tarefas</h2>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className="border-b py-2">{task.title}</li>
        ))}
      </ul>
    </div>
  )
}