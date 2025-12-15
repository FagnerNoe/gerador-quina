import { useState } from "react";

export const QuinaGenerator = () => {
    const [quantidade, setQuantidade] = useState<number>(1);
    const [jogos, setJogos] = useState<number[][]>([]);

    const handleGerar = () => {
        const novosJogos: number[][] = [];
        for (let i = 0; i < quantidade; i++) {
            novosJogos.push(gerarNumerosQuina());
        }
        setJogos(novosJogos);
    };

    return (
        <div className="flex flex-col items-center mt-10 border border-amber-500 p-6 rounded-lg shadow-lg bg-white">
            <h1 className="text-2xl font-bold text-purple-700">Gerador da Quina</h1>

            {/* 🔹 Selecionar quantidade de jogos */}
            <div className="mt-4 flex items-center gap-2">
                <label className="font-medium text-gray-700">Quantidade de jogos:</label>
                <select
                    value={quantidade}
                    onChange={(e) => setQuantidade(Number(e.target.value))}
                    className="px-3 py-1 border rounded-lg"
                >
                    {[1, 2, 3, 5, 10].map((q) => (
                        <option key={q} value={q}>
                            {q}
                        </option>
                    ))}
                </select>
            </div>

            {/* 🔹 Botão para gerar */}
            <button
                onClick={handleGerar}
                className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg shadow hover:bg-purple-800"
            >
                Gerar Jogos
            </button>

            {/* 🔹 Mostrar os jogos */}
            <div className="mt-6 flex flex-col gap-4">
                {jogos.map((jogo, index) => (
                    <div key={index} className="flex gap-2 items-center" >
                        <span className="font-bold text-gray-600 text-md">Jogo {index + 1}:</span>
                        {jogo.map((n) => (
                            <span
                                key={n}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-purple-200 text-purple-800 font-bold text-lg shadow"
                            >
                                {n}
                            </span>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

// Função auxiliar fora do componente
function gerarNumerosQuina(): number[] {
    const numeros: number[] = [];
    while (numeros.length < 5) {
        const n = Math.floor(Math.random() * 80) + 1;
        if (!numeros.includes(n)) {
            numeros.push(n);
        }
    }
    return numeros.sort((a, b) => a - b);
}