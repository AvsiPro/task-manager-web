import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export default function Register() {
  const { register, handleSubmit } = useForm({ resolver: zodResolver(schema) })
  const navigate = useNavigate()

  const onSubmit = async (data: any) => {
    await api.post('/auth/register', data)
    navigate('/login')
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded">
      <h2 className="text-xl mb-4">Cadastro</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <input {...register('email')} placeholder="Email" className="border p-2" />
        <input {...register('password')} placeholder="Senha" type="password" className="border p-2" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Registrar</button>
      </form>
    </div>
  )
}