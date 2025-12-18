import type { Modalidade } from "./Config";


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

  const numeros: number[] = [];
  while (numeros.length < quantidade) {
    const n = Math.floor(Math.random() * (max - min + 1)) + min;
    if (!numeros.includes(n)) {
      numeros.push(n);
    }
  }

  return numeros.sort((a, b) => a - b);
}