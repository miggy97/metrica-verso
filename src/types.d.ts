export interface metrica {
  metricaSilabas: number;
  totalSilabas: number;
  palabras: string[];
  silabasPorPalabra: [number, string][];
  sinalefa: [string, string][];
  dieresis: string[];
  posibleDieresis: string[];
  posibleSineresis: string[];
  posibleHiato: [string, string][];
  ultimaPalabra: ultimaPalabra;
}

interface ultimaPalabra {
  palabra: string;
  rimaConsonante: string;
  rimaAsonante: string;
  tonica: number;
  acentuacion: string;
  silabas: string[];
}

export interface palabraInfo {
  palabra: string
  rimaConsonante: string
  rimaAsonante: string
  longitudPalabra: number
  numSilabas: number
  silabas: string[]
  acentuacion: string
  tonica: number
  EsPrimeraVocal: boolean
  EsUltimaVocal: boolean
  EsPrimeraVocalTonica: boolean
  hiato: string[]
  diptongo: string[]
  triptongo: string[]
}