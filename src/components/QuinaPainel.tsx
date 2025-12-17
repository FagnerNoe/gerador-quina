import { useEffect, useState } from "react";

function QuinaPanel() {
  const [resultado, setResultado] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://servicebus2.caixa.gov.br/portaldeloterias/api/quina");
        const data = await response.json();
        setResultado(data);
      } catch (error) {
        console.error("Erro ao buscar dados da Quina:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) return <p className="text-center text-lg font-semibold">Carregando resultados...</p>;
  if (!resultado) return <p className="text-center text-red-500">Não foi possível carregar os dados.</p>;

  return (
    <div className=" font-sans rounded-lg shadow-md max-w-2xl mx-auto text-center mt-6">
      <h2 className="text-[3.5rem] font-bold bg-clip-text bg-linear-to-r from-blue-800 to-sky-300 text-transparent mb-1 font-[Caramel]">Quina</h2>
      <p className="text-gray-600">Concurso: <span className="font-bold bg-blue-400 px-4 rounded-md text-white text-lg font-[Poppins]">{resultado.numero}</span></p>
      <p className="text-gray-700 mb-4 font-bold font-[Lilita_One]">{resultado.dataApuracao}</p>

      <h3 className="text-xl  text-gray-600 mb-2 text-center font-[Lilita_One]">Números sorteados:</h3>
      <div className="flex  items-center justify-center gap-3 mb-10">
        {resultado.listaDezenas.map((dezena: string, index: number) => (
          <span
            key={index}
            className="text-lg font-bold bg-blue-500 text-white px-3 py-2 rounded-full shadow"
          >
            {dezena}
          </span>
        ))}
      </div>

      <h3 className="text-xl font-semibold text-gray-500 mb-2 font-[Poppins]">Detalhes do Sorteio</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg shadow-sm bg-white">
          <thead className="bg-sky-600 text-white">
            <tr>
              <th className="px-1 py-2 text-center">Faixa</th>
              <th className="px-1 py-2 text-center">Ganhadores</th>
              <th className="px-1 py-2 text-center">Valor do Prêmio</th>
            </tr>
          </thead>
          <tbody>
            {resultado.listaRateioPremio.map((premio: any, index: number) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="px-4 py-2 text-start text-sm">{premio.descricaoFaixa}</td>
                <td className="px-4 py-2 font-medium">{premio.numeroDeGanhadores}</td>
                <td className="px-4 py-2 text-green-600 font-semibold font-[Poppins] text-center">
                  R$ {premio.valorPremio.toLocaleString("pt-BR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-6 p-4 bg-linear-to-r from-purple-600 to-blue-500 rounded-lg">
        <h4 className="text-lg font-bold text-white text-center">Valor Estimado para o próximo Concurso</h4>

        <p className="text-xl font-bold text-white text-center mt-2 bg-white/20 p-2 rounded-2xl">
          R$ {resultado.valorEstimadoProximoConcurso.toLocaleString("pt-BR")}
        </p>
      </div>
    </div>
  );
}

export default QuinaPanel;