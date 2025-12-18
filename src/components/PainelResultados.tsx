import { useEffect, useState } from "react";
import { configs, type Modalidade } from "../service/Config";

function PainelResultados({ modalidade }: { modalidade: Modalidade }) {
  const [resultado, setResultado] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(configs[modalidade].api);
        const data = await response.json();
        setResultado(data);
      } catch (error) {
        console.error("Erro ao buscar dados :", error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [modalidade]);

  if (loading) return <p className="text-center text-lg font-semibold">Carregando resultados...</p>;
  if (!resultado) return <p className="text-center text-red-500">Não foi possível carregar os dados.</p>;

  return (
    <div className="rounded-lg shadow-md w-full text-center mt-6">
      <h2 className={`text-5xl font-bold bg-clip-text bg-linear-to-r ${configs[modalidade].gradient} text-transparent mb-4 font-[Oleo_Script_Swash_Caps]`}>{modalidade}</h2>
      <span className={`font-bold ${configs[modalidade].background} px-6 py-1 rounded-md text-white text-lg font-[Poppins]`}>{resultado.numero}</span>
      <p className="text-gray-700 mb-4 mt-1 font-bold font-[Lilita_One]">{resultado.dataApuracao}</p>



      <h3 className="text-xl  text-gray-600 mb-2 text-center font-[Lilita_One]">Números sorteados:</h3>
      <div className={`grid  px-3  items-center justify-end-safe gap-3 mb-6 
    ${modalidade === "Mega-Sena" ? "grid-cols-6" : "grid-cols-5"} `}
      >
        {resultado.listaDezenas.map((dezena: string, index: number) => (
          <span
            key={index}
            className={`text-lg font-bold ${configs[modalidade].background} text-white ${modalidade == "Mega-Sena" ? "px-3 py-2" : "p-3"} rounded-full shadow-lg`}
          >
            {dezena}
          </span>
        ))}
      </div>
      {modalidade === "Dia de Sorte" && (
        <span className="mt-4 text-lg font-bold bg-yellow-700 text-white p-3 rounded-xl shadow-md">
          {resultado.nomeTimeCoracaoMesSorte}
        </span>
      )}

      <h3 className="text-xl font-semibold text-gray-500 mb-2 mt-3 font-[Poppins]">Detalhes do Sorteio</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 rounded-lg shadow-sm bg-white">
          <thead className="bg-gray-600 text-white">
            <tr>
              <th className="px-1 py-2 text-center">Faixa</th>
              <th className="px-1 py-2 text-center">Ganhadores</th>
              <th className="px-1 py-2 text-center">Valor do Prêmio</th>
            </tr>
          </thead>
          <tbody>
            {resultado.listaRateioPremio.map((premio: any, index: number) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="px-3 py-2 text-start text-sm">{premio.descricaoFaixa}</td>
                <td className="px-4 py-2 font-medium">{premio.numeroDeGanhadores}</td>
                <td className={`px-4 py-2 ${configs[modalidade].background} text-white
                 font-semibold font-[Poppins] text-center`}>
                  R$ {premio.valorPremio.toLocaleString("pt-BR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={`mt-6 p-4 bg-linear-to-l ${configs[modalidade].gradient} rounded-lg`}>
        <h4 className="text-lg font-bold text-white text-center">Estimado para o próximo Concurso</h4>

        <p className="text-2xl font-bold font-[Poppins] text-white text-center mt-2 bg-white/20 p-2 rounded-2xl">
          R$ {resultado.valorEstimadoProximoConcurso.toLocaleString("pt-BR")}
        </p>
      </div>
    </div>
  );
}

export default PainelResultados;