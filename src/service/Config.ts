// configs.ts
export type Modalidade = "Quina" | "Mega-Sena" | "Lotomania" | "Lotofácil" | "Dia de Sorte";

export const configs: Record<Modalidade, { api: string; gradient: string ,background:string,color:string,borda:string}> = {
  "Quina": {
    api: "https://servicebus2.caixa.gov.br/portaldeloterias/api/quina",
    gradient: "from-blue-800 to-sky-300 ",
    background: "bg-blue-400",
    color: "shadow-blue-400",
    borda: "border-blue-400"
  },
  "Mega-Sena": {
    api: "https://servicebus2.caixa.gov.br/portaldeloterias/api/megasena",
    gradient: "from-green-700 to-emerald-400 ",
    background: "bg-green-500",
    color: "shadow-green-400",
    borda: "border-green-400"
  },
  "Lotomania": {
    api: "https://servicebus2.caixa.gov.br/portaldeloterias/api/lotomania",
    gradient: "from-orange-600 to-amber-400 ",
    background: "bg-orange-500",
    color: "shadow-orange-400",
    borda: "border-orange-400"
  },
  "Lotofácil": {
    api: "https://servicebus2.caixa.gov.br/portaldeloterias/api/lotofacil",
    gradient: "from-purple-700 to-indigo-400 ",
    background: "bg-purple-500",
    color: "shadow-purple-400",
    borda: "border-purple-400"
  },
  "Dia de Sorte": {
    api: "https://servicebus2.caixa.gov.br/portaldeloterias/api/diadesorte",
    gradient: "from-yellow-600 to-amber-400 ",
    background: "bg-yellow-600",
    color: "shadow-yellow-400",
    borda: "border-yellow-400"
  }
};