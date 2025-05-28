import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/auth/register", {
        email,
        password,
      });
      navigate("/");
    } catch (err) {
      setError("Erro ao registrar");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleRegister}
        className="bg-white p-3 rounded shadow-md w-[260px] box-border"
      >
        <h2 className="text-lg font-semibold mb-3 text-center">Cadastro</h2>
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
          className="w-full px-1.5 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs box-border"
        >
          Registrar
        </button>
      </form>
    </div>
  );
}