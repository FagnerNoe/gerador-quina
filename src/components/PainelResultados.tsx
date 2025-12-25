import { useEffect, useState } from "react";
import { configs, type Modalidade } from "../service/Config";

function PainelResultados({ modalidade }: { modalidade: Modalidade }) {
  const [resultado, setResultado] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      try {
        const cacheKey = `resultado_${modalidade}`;
        const cachedData = localStorage.getItem(cacheKey);
        const agora = new Date();
        const horaAtual = agora.getHours();

        const expiracao = 1000 * 60 * 60; // 1 hora


        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);
          const valido = Date.now() - timestamp < expiracao;

          if (valido && horaAtual < 21) { // Atualiza após as 21h

            setResultado(data);
            setLoading(false);
            return;
          }
        }
        const apiOficial = await fetch(configs[modalidade].api);
        if (!apiOficial.ok) {
          throw new Error("API Oficial não respondeu corretamente");
        }
        const dataOficial = await apiOficial.json();

        let resultadoFinal = dataOficial;

        //tentar buscar na API alternativa
        try {
          const responseAlt = await fetch(configs[modalidade].apiAlternativa);
          if (!responseAlt.ok) {
            throw new Error("API Alternativa não respondeu corretamente");
          }
          const dataAlt = await responseAlt.json();
          console.log("Dados API Alternativa:", dataAlt);

          // Normaliza os campos
          const concursoOficial = dataOficial.numero;
          const concursoAlt = dataAlt.numero;

          // só usa alternativa se for mais atual e tiver dezenas válidas
          const altTemDezenas =
            dataAlt.dezenas && Array.isArray(dataAlt.dezenas) && dataAlt.dezenas.length > 0;



          if (concursoAlt > concursoOficial && altTemDezenas) {
            resultadoFinal = dataAlt;
          }
        }
        catch (error) {
          console.warn("Falha ao buscar na API alternativa, usando oficial:", error);
        }

        localStorage.setItem(
          cacheKey,
          JSON.stringify({ data: resultadoFinal, timestamp: Date.now() })
        );

        setResultado(resultadoFinal);
      } catch (error) {
        console.error("Erro ao buscar dados das APIs:", error);
        setResultado(null);
      }
      finally {
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
      <p className="text-gray-500 mb-4 mt-1 text-sm font-[Poppins]">{resultado.dataApuracao}</p>



      <h3 className="text-xl  text-gray-600 mb-2 text-center font-[Lilita_One]">Números sorteados:</h3>
      <div className={`grid  px-3  items-center justify-center gap-3 mb-4 
    ${modalidade === "Mega-Sena" ? "grid-cols-6" : "grid-cols-5"}
    ${modalidade === "Dia de Sorte" ? "grid-cols-7 gap-x-1" : ""}
  
     `}
      >
        {resultado.listaDezenas.map((dezena: string, index: number) => (
          <span
            key={index}
            className={`text-lg font-bold ${configs[modalidade].background} text-white ${modalidade == "Mega-Sena" ? "px-3 py-2" : "p-3"} ${modalidade == "Dia de Sorte" ? "px-3 py-2" : ""} rounded-full shadow-lg`}
          >
            {dezena}
          </span>
        ))}
      </div>
      {modalidade === "Dia de Sorte" && (
        <div className="space-y-2">
          <p className="text-xs font-[Poppins] text-gray-500  ">Mês da Sorte</p>
          <span className=" text-lg font-bold  text-yellow-600 px-4 py-1  rounded-xl shadow-sm shadow-amber-800 font-[Poppins]">
            {resultado.nomeTimeCoracaoMesSorte}
          </span>


        </div>
      )}

      <h3 className="text-xl font-semibold text-gray-500 mb-2 mt-5 font-[Poppins]">Detalhes do Sorteio</h3>
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
        <span className="text-white/70 font-bold text-xs">{resultado.dataProximoConcurso}</span>

        <p className="text-2xl font-bold font-[Poppins] text-white text-center mt-4 bg-white/20 p-2 rounded-2xl">
          R$ {resultado.valorEstimadoProximoConcurso.toLocaleString("pt-BR")}
        </p>
      </div>
    </div>
  );
}

export default PainelResultados;
