import type { Modalidade } from "./Config";

type Estatisticas = {
  somaMin?: number;
  somaMax?: number;
  paresPossiveis?: number[];
  jogo?: number[];
};



function escolherColunas(todas: number[], qtd: number): number[] {
  const escolhidas: number[] = [];
  while (escolhidas.length< qtd) {
    const idx = Math.floor(Math.random() * todas.length);
    const coluna = todas[idx];
    if (!escolhidas.includes(coluna)) {
      escolhidas.push(coluna);
    }
  }
  console.log(escolhidas);
  return escolhidas;
}

function gerarJogoLotomania() {
  let soma=0;
  let pares=0;
  let numeros: number[] = [];
  let colunasExcluidas: number[] = [];
  let quantidadePrimos=0;
  let quantidadeDiv3=0;
  

    // lista de primos de 1 a 100
  const primos = [
    2, 3, 5, 7, 11, 13, 17, 19, 23, 29,
    31, 37, 41, 43, 47, 53, 59, 61, 67,
    71, 73, 79, 83, 89, 97
  ];



   // repete até atender a condição de primos
  do {
    numeros = [];
    const todasColunas = Array.from({ length: 10 }, (_, i) => i);

    // escolhe 3 colunas para excluir
     colunasExcluidas = escolherColunas(todasColunas, 3);

    // colunas válidas
    const colunasValidas = todasColunas.filter(c => !colunasExcluidas.includes(c));

    // garante entre 5 a 7 números por coluna válida
    for (const coluna of colunasValidas) {
      const qtd = Math.floor(Math.random() * 3) + 7; 
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
  quantidadeDiv3 = numeros.filter(n => n % 3 === 0).length;
  } while (quantidadePrimos < 8 || quantidadePrimos > 20    
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
    quantidadeDiv3
  };
}

function gerarLotofacil(concursoAnterior: number[]): number[] {
  const dezenas = Array.from({ length: 25 }, (_, i) => i + 1);

  // conjuntos especiais
  const primos = [2,3,5,7,11,13,17,19,23];
  const fibonacci = [1,2,3,5,8,13,21];
  const resultado: Set<number> = new Set<number>();

 
  // helper para adicionar sem duplicar
  const addUnique = (nums: number[]) => {
    for (const n of nums) {
     if (resultado.size >= 15) break; // não deixa passar de 15
      if (n >= 1 && n <= 25) resultado.add(n);

    }
  };

  // 1. repete 8 a 9 números do concurso anterior
  const qtdRepetidas = Math.floor(Math.random() * 3) + 7; // 
  const repetidas = [...concursoAnterior]
  .sort(() => Math.random() - 0.5)
  .slice(0, qtdRepetidas);
  const repetidasSet = new Set(repetidas);
  addUnique(repetidas);


const qtdPrimos = Math.floor(Math.random() * 2) + 4; // 4..5
 const primosEscolhidos= primos
 .filter(p => !repetidasSet.has(p) && !repetidasSet.has(p))
 .sort(() => Math.random() - 0.5)
  .slice(0, qtdPrimos);
addUnique(primosEscolhidos);

    // 3. garante 7 a 8 ímpares
  const qtdImpares = Math.floor(Math.random() * 2) + 7; 
  const impares = dezenas.filter(n => n % 2 !== 0);
  const qtdPares = 15 - qtdImpares;
 const pares = dezenas.filter(n => n % 2 === 0);

// força quantidade de ímpares
while ([...resultado].filter(n => n % 2 !== 0).length < qtdImpares && resultado) {
  const candidato = impares[Math.floor(Math.random() * impares.length)];
  if (!repetidasSet.has(candidato)) resultado.add(candidato);

}

// força quantidade de pares
while ([...resultado].filter(n => n % 2 === 0).length < qtdPares && resultado.size < 15) {
  const candidato = pares[Math.floor(Math.random() * pares.length)];
  if (!repetidasSet.has(candidato)) resultado.add(candidato);
}


  // 4. garante 3 a 5 Fibonacci
  const qtdFib = Math.floor(Math.random() * 3) + 3; // 3..5
  const fibDisponiveis = fibonacci.filter(f => !resultado.has(f));

  const fibEscolhidos = fibDisponiveis
    .sort(() => Math.random() - 0.5)
    .slice(0, qtdFib);

    // adiciona os escolhidos
for (const f of fibEscolhidos) {
  if (resultado.size < 15) {
    resultado.add(f);
  }
}

  
// força quantidade de Fibonacci
while (
  [...resultado].filter(n => fibonacci.includes(n)).length < qtdFib && resultado.size < 15){
    const candidato = fibonacci[Math.floor(Math.random() * fibonacci.length)];
  if (!repetidasSet.has(candidato)) resultado.add(candidato);

  }

const imparesRestantes = impares.filter(n => !resultado.has(n));
const paresRestantes = pares.filter(n => !resultado.has(n));

while (resultado.size < 15) {
  const pool = resultado.size % 2 === 0 ? imparesRestantes : paresRestantes;
  resultado.add(pool[Math.floor(Math.random() * pool.length)]);
}


  // ordena resultado
  return [...resultado].sort((a, b) => a - b);
}



function getEstatisticas(modalidade: Modalidade,concursoAnterior?:number[]): Estatisticas {
  switch (modalidade) {
    case "Mega-Sena":
      return { somaMin: 151, somaMax: 216, paresPossiveis: [2, 3, 4,5] };
    case "Quina":
      return { somaMin: 120, somaMax: 280, paresPossiveis: [2, 3] };
    case "Lotofácil":
       if (!concursoAnterior) throw new Error("Concurso anterior é obrigatório para Lotofácil");
      return { jogo: gerarLotofacil(concursoAnterior) };

    case "Lotomania":
      return  gerarJogoLotomania();    
    case "Dia de Sorte":
      return { somaMin: 90, somaMax: 140, paresPossiveis: [3, 4] };
    default:
      return {};
  }
}



export function gerarNumeros(modalidade: Modalidade,concursoAnterior?:number[]): number[] {
 
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
       if (!concursoAnterior) throw new Error("Concurso anterior é obrigatório para Lotofácil");
      return gerarLotofacil(concursoAnterior);

    case "Lotomania":
      return gerarJogoLotomania().jogo;      
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




