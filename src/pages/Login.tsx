import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });
      //localStorage.setItem("token", response.data.token);
      console.log("Resposta do login:", response.data);
      localStorage.setItem("token", response.data.access_token);
      navigate("/tasks");
    } catch (err) {
      setError("Credenciais inválidas");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleLogin}
        className="bg-white p-3 rounded shadow-md w-[260px] box-border"
      >
        <h2 className="text-lg font-semibold mb-3 text-center">Login</h2>
        {error && <p className="text-red-500 mb-2 text-xs text-center">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-1.5 py-1 border rounded mb-2 text-xs box-border"
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-1.5 py-1 border rounded mb-2 text-xs box-border"
        />
        <button
          type="submit"
          className="w-full px-1.5 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs box-border"
        >
          Entrar
        </button>
      </form>
    </div>
  );
}