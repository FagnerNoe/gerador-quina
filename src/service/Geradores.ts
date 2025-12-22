import type { Modalidade } from "./Config";

type Estatisticas = {
  somaMin?: number;
  somaMax?: number;
  paresPossiveis?: number[];
  numerosPrimos?: number[];
  colunasExcluidas?: number[];
};


function escolherColunas(todas: number[], qtd: number): number[] {
  const escolhidas: number[] = [];
  while (escolhidas.length < qtd) {
    const idx = Math.floor(Math.random() * todas.length);
    const coluna = todas[idx];
    if (!escolhidas.includes(coluna)) {
      escolhidas.push(coluna);
    }
  }
  return escolhidas;
}


function getEstatisticas(modalidade: Modalidade): Estatisticas {
  switch (modalidade) {
    case "Mega-Sena":
      return { somaMin: 151, somaMax: 216, paresPossiveis: [2, 3, 4,5] };
    case "Quina":
      return { somaMin: 120, somaMax: 280, paresPossiveis: [2, 3] };
    case "Lotofácil":
      return { somaMin: 170, somaMax: 221, paresPossiveis: [7, 8,9],numerosPrimos:[4,5] };
    case "Lotomania":
    const todasColunas = Array.from({ length: 10 }, (_, i) => i);
      const colunasExcluidas = escolherColunas(todasColunas, 2);
      return { 
        somaMin: 1900, 
        somaMax: 2400,
        paresPossiveis: [24,25,26],
        colunasExcluidas }; // paridade equilibrada
    case "Dia de Sorte":
      return { somaMin: 90, somaMax: 140, paresPossiveis: [3, 4] };
    default:
      return {};
  }
}



export function gerarNumeros(modalidade: Modalidade): number[] {
  let quantidade = 0;
  let max = 0;
  let min = 1;

  switch (modalidade) {
    case "Quina":
      quantidade = 5;
      max = 80;
      break;
    case "Mega-Sena":
      quantidade = 6;
      max = 60;
      break;
    case "Lotofácil":
      quantidade = 15;
      max = 25;
      break;
    case "Lotomania":
      quantidade = 50;
      max = 99;
      min = 0; // Lotomania começa no 0
      break;
    case "Dia de Sorte":
      quantidade = 7;
      max = 31;
      break;
    default:
      throw new Error("Modalidade não suportada");
  }

const estat = getEstatisticas(modalidade);


  while (true) {
    const numeros: number[] = [];
    while (numeros.length < quantidade) {
      const n = Math.floor(Math.random() * (max - min + 1)) + min;
      if (estat.colunasExcluidas) {
        const coluna = Math.floor(n % 10);
        if (estat.colunasExcluidas.includes(coluna)) {
          continue; // ignora número dessa coluna
        }
      }
      if (!numeros.includes(n)) {
        numeros.push(n);
      }
    }
    numeros.sort((a, b) => a - b);

    const soma = numeros.reduce((acc, n) => acc + n, 0);
    const pares = numeros.filter(n => n % 2 === 0).length;

    // regra de exclusão de colunas


    const somaOk = estat.somaMin && estat.somaMax
      ? soma >= estat.somaMin && soma <= estat.somaMax
      : true;

    const paridadeOk = estat.paresPossiveis
      ? estat.paresPossiveis.includes(pares)
      : true;

     

    if (somaOk && paridadeOk ) {
      return numeros;
    }
  }
  
}


