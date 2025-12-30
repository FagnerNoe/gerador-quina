import { useEffect, useRef, useState } from "react";
import { configs, type Modalidade } from "../service/Config";
import { gerarNumeros } from "../service/Geradores";


export const Generator = ({ modalidade }: { modalidade: Modalidade }) => {
    const [quantidade, setQuantidade] = useState<number>(1);
    const [jogos, setJogos] = useState<number[][]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const spinnerRef = useRef<HTMLDivElement>(null);
    const jogosRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        if (loading && spinnerRef.current) {
            spinnerRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [loading]);


    useEffect(() => {
        if (jogos.length > 0 && jogosRef.current) {
            jogosRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [jogos]);


    useEffect(() => {
        setJogos([]);
    }, [modalidade]);


    const handleGerar = () => {
        setLoading(true);
        setTimeout(() => {
            const novosJogos: number[][] = [];
            for (let i = 0; i < quantidade; i++) {
                novosJogos.push(gerarNumeros(modalidade));
            }
            setJogos(novosJogos);
            setLoading(false);
        }, 1500); //simula tempo de processamento
    };

    const meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];




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

            <button onClick={handleGerar}
                className={`bg-clip-text bg-linear-to-r ${configs[modalidade].gradient} text-transparent font-[Poppins] font-semibold px-4 py-2 rounded-md mt-4 shadow-sm ${configs[modalidade].color} hover:opacity-90 transition-opacity`}
                disabled={loading}>

                {loading ? "Gerando..." : "Gerar Palpite"}
            </button>

            <div className={` mt-6 flex flex-col gap-5 items-center justify-center w-full`}>
                {loading ? (
                    // Indicador de carregamento
                    <div
                        ref={spinnerRef}
                        className="flex flex-col items-center justify-center p-6">
                        <div className={`w-10 h-10 border-4 ${configs[modalidade].borda} border-t-transparent rounded-full animate-spin`}></div>
                        <p className="mt-3 text-gray-500 font-[Poppins]">Gerando palpites...</p>
                    </div>
                ) : (



                    jogos.map((jogo: number[], index: number) => (
                        <div
                            ref={jogosRef}
                            key={index} className={`grid border ${configs[modalidade].borda} w-full p-3 rounded-lg gap-x-2 gap-y-3 items-center justify-center shadow-md
                    ${modalidade === "Mega-Sena" ? "grid-cols-6 gap-x-2" : "grid-cols-5"} 
                    ${modalidade === "Dia de Sorte" ? "grid-cols-7  " : ""}
                    `}>
                            {jogo.map((num: any) => (
                                <span key={num} className={`flex items-center justify-center rounded-full border-2 text-indigo-800 font-bold shadow-md
                            ${configs[modalidade].borda} 
                        ${modalidade === "Dia de Sorte" ? "w-10 h-10" : "p-3 w-12 h-12"}
                    
                           `}>
                                    {num}
                                </span>

                            ))}
                            {modalidade === "Dia de Sorte" && (
                                <span className="text-sm font-[Poppins] text-gray-600 ml-4">
                                    <span className="font-bold text-yellow-600">{meses[Math.floor(Math.random() * meses.length)]}</span>
                                </span>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};


