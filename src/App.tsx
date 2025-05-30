import { Routes, Route, Navigate } from 'react-router-dom'
import Register from './pages/register'
import Login from './pages/login'
import Tasks from './pages/Tasks'
import ProtectedRoute from './components/protectedroute'
import Tables from './pages/Tables';

export default function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/tasks" element={
        <ProtectedRoute>
          <Tasks />
        </ProtectedRoute>
      } />
      <Route path="/tables" element={<Tables />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  )
}