
import { useEffect, useState } from 'react';
import './App.css'
import { QuinaGenerator } from './components/QuinaGerador'
import QuinaPanel from './components/QuinaPainel'

function App() {
  const [modalidade, setModalidade] = useState<string | null>(null);
  const [resultado, setResultado] = useState(null);


  // Função para buscar resultados da API da Caixa
  const fetchResultados = async (modalidade: any) => {
    try {
      // Exemplo de endpoint (ajuste conforme a API real da Caixa)
      const response = await fetch(`https://api-caixa/${modalidade}`);
      const data = await response.json();
      setResultado(data);
    } catch (error) {
      console.error("Erro ao buscar resultados:", error);
    }
  };

  // Buscar resultados sempre que a modalidade mudar
  useEffect(() => {
    fetchResultados(modalidade);
  }, [modalidade]);


  return (
    <div className="p-2 flex flex-col items-center  min-h-screen">
      <div className="w-[70%] flex justify-center py-3 items-center  shadow-sm shadow-sky-500 rounded-lg  ">
        <img src="/trevo2.png" alt="Logo" className="mr-2 w-6 h-6" />
        <h1 className='text-2xl font-extrabold font-[Shadows_Into_Light]'>FN Loterias</h1>
      </div>

      {/* Botões de seleção */}
      <div className="mt-8 grid grid-cols-5 gap-x-2 h-40">
        <button className='shadow-md shadow-sky-200 rounded-md bg-linear-to-t from-blue-400 to-sky-600' onClick={() => setModalidade("Quina")}><p className='text-white text-2xl font-[Shadows_Into_Light] rotate-270 text-center'>Quina</p></button>
        <button className='shadow-md shadow-emerald-200 rounded-md bg-linear-to-t from-green-400 to-emerald-600' onClick={() => setModalidade("Mega-Sena")}><h5 className='text-white text-2xl font-[Shadows_Into_Light] rotate-270'>Mega Sena</h5></button>
        <button className='shadow-md shadow-orange-200 rounded-md bg-linear-to-t from-amber-400 to-orange-600' onClick={() => setModalidade("Lotomania")}><p className='text-white text-2xl font-[Shadows_Into_Light] rotate-270'>Lotomania</p></button>
        <button className='shadow-md shadow-purple-300 rounded-md bg-linear-to-t from-pink-400 to-purple-600' onClick={() => setModalidade("Lotofácil")}><p className='text-white text-2xl font-[Shadows_Into_Light] rotate-270'>Lotofácil</p></button>
        <button className='shadow-md shadow-amber-200 rounded-md bg-linear-to-t from-yellow-400 to-amber-700' onClick={() => setModalidade("Dia de Sorte")}><p className='text-white text-2xl font-[Shadows_Into_Light] rotate-270'>Dia de Sorte</p></button>
      </div>
      {/* Renderização condicional */}
      {modalidade === "Quina" && (
        <><QuinaPanel /><QuinaGenerator /></>
      )}




    </div>
  )
}

export default App
