import { useState } from "react";
import { configs, type Modalidade } from "../service/Config";
import { gerarNumeros } from "../service/Geradores";


export const Generator = ({ modalidade }: { modalidade: Modalidade }) => {
    const [quantidade, setQuantidade] = useState<number>(1);
    const [jogos, setJogos] = useState<number[][]>([]);

    const handleGerar = () => {
        const novosJogos: number[][] = [];
        for (let i = 0; i < quantidade; i++) {
            novosJogos.push(gerarNumeros(modalidade));
        }
        setJogos(novosJogos);
    };

    return (
        <div className="flex flex-col items-center mt-10 rounded-lg shadow-lg bg-white w-full p-4">
            <h1 className={`bg-clip-text bg-linear-to-l ${configs[modalidade].gradient} text-transparent text-2xl font-[Poppins] font-semibold`}>Palpites</h1>

            <div className="mt-4 flex items-center gap-4">
                <label className="text-gray-500 font-[Poppins] text-sm">Quantidade de jogos:</label>
                <select value={quantidade} onChange={(e) => setQuantidade(Number(e.target.value))}>
                    {[1, 2, 3, 5, 10].map((q) => (
                        <option key={q} value={q}>{q}</option>
                    ))}
                </select>
            </div>

            <button onClick={handleGerar} className={`bg-clip-text bg-linear-to-r ${configs[modalidade].gradient} text-transparent font-[Poppins] font-semibold px-4 py-2 rounded-md mt-4 shadow-sm ${configs[modalidade].color} hover:opacity-90 transition-opacity`}>
                Gerar Jogos
            </button>

            <div className="mt-6 flex flex-col gap-2">
                {jogos.map((jogo: any, index: number) => (
                    <div key={index} className="flex gap-2 items-center justify-center">
                        <span className="text-gray-600 text-sm">{index + 1}:</span>
                        {jogo.map((num: any) => (
                            <span key={num} className={`${configs[modalidade].borda} w-10 h-10 flex items-center justify-center rounded-full border-2 text-indigo-800 font-bold`}>
                                {num}
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};


