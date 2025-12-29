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

function gerarJogoLotomania() {
  let soma=0;
  let pares=0;
  let numeros: number[] = [];
  let colunasExcluidas: number[] = [];
  let quantidadePrimos=0;
  let quantidadeFibonacci=0;
  let quantidadeDiv3=0;
  

    // lista de primos de 1 a 100
  const primos = [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29,
    31, 37, 41, 43, 47, 53, 59, 61, 67,
    71, 73, 79, 83, 89, 97
  ];

   // lista de Fibonacci até 100
  const fibonacci = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

   // repete até atender a condição de primos
  do {
    numeros = [];
    const todasColunas = Array.from({ length: 10 }, (_, i) => i);

    // escolhe 3 colunas para excluir
     colunasExcluidas = escolherColunas(todasColunas, 3);

    // colunas válidas
    const colunasValidas = todasColunas.filter(c => !colunasExcluidas.includes(c));

    // distribui entre 6 e 8 números por coluna
    for (const coluna of colunasValidas) {
      const qtd = Math.floor(Math.random() * 3) + 6; // 6, 7 ou 8
      let count = 0;
      while (count < qtd && numeros.length < 50) {
        const n = coluna + 10 * Math.floor(Math.random() * 10); // número da coluna
        if (!numeros.includes(n)) {
          numeros.push(n);
          count++;
        }
      }
    }


  // completa até 50 números
  while (numeros.length < 50) {
    const coluna = colunasValidas[Math.floor(Math.random() * colunasValidas.length)];
    const n = coluna + 10 * Math.floor(Math.random() * 10);
    if (!numeros.includes(n)) {
      numeros.push(n);
    }
  }

  numeros.sort((a, b) => a - b);

   soma = numeros.reduce((acc, n) => acc + n, 0);
   pares = numeros.filter(n => n % 2 === 0).length;
  quantidadePrimos = numeros.filter(n => primos.includes(n)).length;
  quantidadeFibonacci = numeros.filter(n => fibonacci.includes(n)).length;
  quantidadeDiv3 = numeros.filter(n => n % 3 === 0).length;
  } while (quantidadePrimos < 8 || quantidadePrimos > 20
    || quantidadeFibonacci < 2 || quantidadeFibonacci > 6
    || quantidadeDiv3 < 12 || quantidadeDiv3 > 20
  );

  return {
    jogo: numeros,
    soma,
    pares,
    somaMin: 1900,
    somaMax: 2400,
    paresPossiveis: [24, 25, 26],
    colunasExcluidas,
    quantidadePrimos,
    quantidadeFibonacci,
    quantidadeDiv3
  };
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
      return  gerarJogoLotomania();    
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


