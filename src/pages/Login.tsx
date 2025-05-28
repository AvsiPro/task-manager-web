import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export default function Login() {
  const { register, handleSubmit } = useForm({ resolver: zodResolver(schema) })
  const navigate = useNavigate()

  const onSubmit = async (data: any) => {
    const res = await api.post('/auth/login', data)
    localStorage.setItem('token', res.data.access_token)
    navigate('/tasks')
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h2 className="text-xl mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <input {...register('email')} placeholder="Email" className="border p-2" />
        <input {...register('password')} placeholder="Senha" type="password" className="border p-2" />
        <button type="submit" className="bg-green-600 text-white p-2 rounded">Entrar</button>
      </form>
    </div>
  )
}