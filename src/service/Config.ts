// configs.ts
export type Modalidade = "Quina" | "Mega-Sena" | "Lotomania" | "Lotofácil" | "Dia de Sorte";

export const configs: Record<Modalidade, { api: string; apiAlternativa:string; gradient: string ,background:string,color:string,borda:string,fundo:string}> = {
  "Quina": {
    api: "https://servicebus2.caixa.gov.br/portaldeloterias/api/quina",
    apiAlternativa: "https://api.guidi.dev.br/loteria/quina/ultimo",
    gradient: "from-blue-800 to-sky-300 ",
    background: "bg-blue-400",
    color: "shadow-blue-400",
    borda: "border-blue-400",
    fundo: "bg-blue-50"
  },
  "Mega-Sena": {
    api: "https://servicebus2.caixa.gov.br/portaldeloterias/api/megasena",
    apiAlternativa: "https://api.guidi.dev.br/loteria/megasena/ultimo",
    gradient: "from-green-700 to-emerald-400 ",
    background: "bg-green-500",
    color: "shadow-green-400",
    borda: "border-green-400",
    fundo: "bg-green-50"
  },
  "Lotomania": {
    api: "https://servicebus2.caixa.gov.br/portaldeloterias/api/lotomania",
    apiAlternativa: "https://api.guidi.dev.br/loteria/lotomania/ultimo",
    gradient: "from-orange-600 to-amber-400 ",
    background: "bg-orange-500",
    color: "shadow-orange-400",
    borda: "border-orange-400",
    fundo: "bg-orange-50"
  },
  "Lotofácil": {
    api: "https://servicebus2.caixa.gov.br/portaldeloterias/api/lotofacil",
    apiAlternativa: "https://api.guidi.dev.br/loteria/lotofacil/ultimo",
    gradient: "from-purple-700 to-pink-400 ",
    background: "bg-purple-600",
    color: "shadow-purple-400",
    borda: "border-purple-400",
    fundo: "bg-purple-50"
  },
  "Dia de Sorte": {
    api: "https://servicebus2.caixa.gov.br/portaldeloterias/api/diadesorte",
    apiAlternativa: "https://api.guidi.dev.br/loteria/diadesorte/ultimo",
    gradient: "from-yellow-600 to-amber-400 ",
    background: "bg-yellow-600",
    color: "shadow-yellow-400",
    borda: "border-yellow-400",
    fundo: "bg-yellow-50"
  }
};