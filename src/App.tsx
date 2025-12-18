
import { useState } from 'react';
import './App.css'
import type { Modalidade } from './service/Config';
import PainelResultados from './components/PainelResultados';
import { Generator } from './components/Gerador';


function App() {
  const [modalidade, setModalidade] = useState<Modalidade>("Quina");



  // Função para buscar resultados da API da Caixa


  return (
    <div className="p-2 flex flex-col items-center  min-h-screen">
      <div className="w-[70%] flex justify-center py-3 items-center  shadow-md shadow-gray-400 rounded-md  ">
        <img src="/trevo2.png" alt="Logo" className="mr-2 w-6 h-6" />
        <h1 className='text-2xl font-extrabold font-[Shadows_Into_Light]'>FN Loterias</h1>
      </div>

      {/* Botões de seleção */}
      <div className="mt-8 grid grid-cols-5 gap-x-2 h-40 ">
        <button className=' shadow-md shadow-sky-200 rounded-md bg-linear-to-t from-blue-400 to-sky-600 active:bg-gray-300' onClick={() => setModalidade("Quina")}><p className='text-white text-2xl font-[Shadows_Into_Light] rotate-270 text-center'>Quina</p></button>
        <button className='pt-10 shadow-md shadow-emerald-200 rounded-md bg-linear-to-t from-green-400 to-emerald-600' onClick={() => setModalidade("Mega-Sena")}><h5 className='text-white text-2xl font-[Shadows_Into_Light] rotate-270 whitespace-nowrap'>Mega Sena</h5></button>
        <button className=' shadow-md shadow-orange-200 rounded-md bg-linear-to-t from-amber-400 to-orange-600' onClick={() => setModalidade("Lotomania")}><p className='text-white text-2xl font-[Shadows_Into_Light] rotate-270'>Lotomania</p></button>
        <button className=' shadow-md shadow-purple-300 rounded-md bg-linear-to-t from-pink-400 to-purple-600' onClick={() => setModalidade("Lotofácil")}><p className='text-white text-2xl font-[Shadows_Into_Light] rotate-270'>Lotofácil</p></button>
        <button className='pt-10 shadow-md shadow-amber-200 rounded-md bg-linear-to-t from-yellow-400 to-amber-700' onClick={() => setModalidade("Dia de Sorte")}><p className='text-white text-2xl font-[Shadows_Into_Light] rotate-270 whitespace-nowrap'>Dia de Sorte</p></button>
      </div>

      <PainelResultados modalidade={modalidade} />
      <Generator modalidade={modalidade} />




    </div>
  )
}

export default App
