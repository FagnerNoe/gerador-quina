import { useEffect, useRef, useState } from "react";
import { configs, type Modalidade } from "../service/Config";
import { gerarNumeros } from "../service/Geradores";




export const Generator = ({ modalidade }: { modalidade: Modalidade }) => {
    const [quantidade, setQuantidade] = useState<number>(1);
    const [jogos, setJogos] = useState<number[][]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const spinnerRef = useRef<HTMLDivElement>(null);
    const jogosRef = useRef<HTMLDivElement>(null);
    const [concursoAnterior, setConcursoAnterior] = useState<number[]>([]);

    useEffect(() => {
        async function fetchConcurso() {
            const resp = await fetch(configs["Lotofácil"].api);
            const data = await resp.json();
            console.log("Dados concurso anterior Lotofácil:", data.listaDezenas);

            // garante que seja um array de números
            const dezenas = data.listaDezenas.map((d: string | number) => Number(d));
            setConcursoAnterior(dezenas);
        }
        fetchConcurso();
    }, []);


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

    const validarLotofacil = (jogo: number[], concursoAnterior: number[]): boolean => {
        if (jogo.length !== 15) return false;

        const impares = jogo.filter(n => n % 2 !== 0).length;
        const pares = jogo.filter(n => n % 2 === 0).length;
        const fib = jogo.filter(n => [1, 2, 3, 5, 8, 13, 21].includes(n)).length;
        const primos = jogo.filter(n => [2, 3, 5, 7, 11, 13, 17, 19, 23].includes(n)).length;
        const repetidas = jogo.filter(n => concursoAnterior.includes(n)).length;


        // regras da Lotofácil
        return (
            impares >= 7 && impares <= 9 &&
            pares === 15 - impares &&
            fib >= 3 && fib <= 5 &&
            primos >= 4 && primos <= 5 &&
            repetidas >= 8 && repetidas <= 9
        );
    };


    const handleGerar = async () => {
        setLoading(true);

        const novosJogos: number[][] = [];


        for (let i = 0; i < quantidade; i++) {
            let jogo: number[] = [];

            if (modalidade === "Lotofácil") {
                // gerar até validar
                do {
                    jogo = gerarNumeros(modalidade, concursoAnterior);
                } while (!validarLotofacil(jogo, concursoAnterior));
            } else {
                jogo = gerarNumeros(modalidade, concursoAnterior);
            }

            novosJogos.push(jogo);
        }

        setJogos(novosJogos);

        setLoading(false);
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
                            {jogo.map((num: number, index: number) => (
                                <span key={`${num}-${index}`} className={`flex items-center justify-center rounded-full border-2 text-indigo-800 font-bold shadow-md
                            ${configs[modalidade].borda} 
                        ${modalidade === "Dia de Sorte" ? "w-10 h-10" : "p-3 w-12 h-12"}
                    
                           `}>
                                    {num.toString().padStart(2, '0')}
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


