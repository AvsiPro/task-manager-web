import React, { useEffect, useState } from "react";

interface Tabela {
  nomeArquivo: string;
  dados: string[][];
}

const Tables: React.FC = () => {
  const [tabelas, setTabelas] = useState<Tabela[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/tabelas")
      .then((res) => res.json())
      .then((data) => setTabelas(data))
      .catch((err) => console.error("Erro ao buscar tabelas:", err));
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Tabelas dos Arquivos Enviados</h1>

      {tabelas.length === 0 ? (
        <p>Nenhuma tabela encontrada.</p>
      ) : (
        tabelas.map((tabela, index) => (
          <div key={index} className="mb-10">
            <h2 className="text-lg font-semibold mb-2">
              {tabela.nomeArquivo}
            </h2>
            <div className="overflow-auto">
              <table className="table-auto border-collapse border border-gray-400 w-full text-sm">
                <tbody>
                  {tabela.dados.map((linha, i) => (
                    <tr key={i}>
                      {linha.map((celula, j) => (
                        <td
                          key={j}
                          className="border border-gray-300 px-2 py-1 whitespace-nowrap"
                        >
                          {celula}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Tables;
