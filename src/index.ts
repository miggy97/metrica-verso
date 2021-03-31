import { metrica, palabraInfo } from "./types";
import * as riman from "riman";

export function analyze(verso: string): metrica {
  const metrica: metrica = {
    metricaSilabas: 0,
    totalSilabas: 0,
    palabras: [],
    silabasPorPalabra: [],
    sinalefa: [],
    dieresis: [],
    posibleDieresis: [],
    posibleSineresis: [],
    posibleHiato: [],
    ultimaPalabra: {
      palabra: "",
      rimaConsonante: "",
      rimaAsonante: "",
      tonica: 0,
      acentuacion: "",
      silabas: [],
    },
  };
  const words: string[] = splitWords(verso);
  metrica.palabras = words;

  const dieresis: string[] = [];
  for (let i = 0; i < words.length; i++) {
    if (words[i].indexOf("ä") !== -1) {
      dieresis.push(words[i]);
      words[i] = words[i].replace("ä", "a");
    }
    if (words[i].indexOf("ë") !== -1) {
      dieresis.push(words[i]);
      words[i] = words[i].replace("ë", "e");
    }
    if (words[i].indexOf("ï") !== -1) {
      dieresis.push(words[i]);
      words[i] = words[i].replace("ï", "i");
    }
    if (words[i].indexOf("ö") !== -1) {
      metrica.dieresis.push(words[i]);
      words[i] = words[i].replace("ö", "o");
    }
    if (words[i].indexOf("ü") !== -1 && !isNoDieresis(words[i])) {
      dieresis.push(words[i]);
      words[i] = words[i].replace("ü", "u");
    }
  }

  const wordsInfo: palabraInfo[] = [];
  for (let word of words) {
    wordsInfo.push(riman.analyzeWord(word));
  }

  // Keep track of posible sinalefa or hiato
  let posibleSinalefa: string[] = [];
  let posibleHiato: string[] = [];
  let numSilabas = 0;

  for (let wordInfo of wordsInfo) {
    numSilabas += wordInfo.numSilabas;
    metrica.silabasPorPalabra.push([wordInfo.numSilabas, wordInfo.palabra]);
    //Add sinalefa
    if (posibleSinalefa[0] && wordInfo.EsPrimeraVocal) {
      metrica.sinalefa.push([posibleSinalefa[0], wordInfo.palabra]);
      posibleSinalefa = [];
    } else posibleSinalefa = [];
    //Add posible hiato
    if (posibleHiato[0] && wordInfo.EsPrimeraVocalTonica) {
      metrica.posibleHiato.push([posibleHiato[0], wordInfo.palabra]);
      posibleHiato = [];
    } else posibleHiato = [];

    //Posible sineresis
    if (wordInfo.hiato[0]) {
      metrica.posibleSineresis.push(wordInfo.palabra);
    }

    //Posible dieresis
    if (wordInfo.diptongo[0]) {
      metrica.posibleDieresis.push(wordInfo.palabra);
    }

    if (wordInfo.EsUltimaVocal) {
      posibleSinalefa.push(wordInfo.palabra);
      if (wordInfo.palabra != "y") posibleHiato.push(wordInfo.palabra);
    }
  }

  for (let d of dieresis) {
    if (metrica.posibleDieresis.indexOf(removeDieresis(d)) !== -1) {
      metrica.dieresis.push(d);
    }
  }

  metrica.totalSilabas = numSilabas;

  const ultPalabra: palabraInfo = wordsInfo[wordsInfo.length - 1];
  metrica.ultimaPalabra.palabra = ultPalabra.palabra;
  metrica.ultimaPalabra.rimaConsonante = ultPalabra.rimaConsonante;
  metrica.ultimaPalabra.rimaAsonante = ultPalabra.rimaAsonante;
  metrica.ultimaPalabra.tonica = ultPalabra.tonica;
  metrica.ultimaPalabra.acentuacion = ultPalabra.acentuacion;
  metrica.ultimaPalabra.silabas = ultPalabra.silabas;

  metrica.metricaSilabas = numSilabas - metrica.sinalefa.length;
  metrica.metricaSilabas += metrica.dieresis.length;

  // If the last word is Aguda you add 1 syllable
  if (metrica.ultimaPalabra.acentuacion === "Aguda") {
    metrica.metricaSilabas += 1;
  }
  // If the last word is Esdrújula you subtract one syllable
  if (metrica.ultimaPalabra.acentuacion === "Esdrújula") {
    metrica.metricaSilabas -= 1;
  }

  return metrica;
}

//Is not dieresis
function isNoDieresis(word: string): boolean {
  if (
    word.indexOf("qüe") !== -1 ||
    word.indexOf("qüi") !== -1 ||
    word.indexOf("güe") !==-1 ||
    word.indexOf("güi") !== -1
  ) {
    return true;
  }
  return false;
}

function removeDieresis(word: string): string {
  if (word.indexOf("ä") !== -1) {
    word = word.replace("ä", "a");
  }
  if (word.indexOf("ë") !== -1) {
    word = word.replace("ë", "e");
  }
  if (word.indexOf("ï") !== -1) {
    word = word.replace("ï", "i");
  }
  if (word.indexOf("ö") !== -1) {
    word = word.replace("ö", "o");
  }
  if (word.indexOf("ü") !== -1 && !isNoDieresis(word)) {
    word = word.replace("ü", "u");
  }
  return word;
}

// Removes all characters that are not letters and returns an array of words
function splitWords(verso: string): string[] {
  const result: string[] = [];
  let word: string = "";
  for (let v of verso) {
    if (/^[A-zÀ-úñÑüÜäÄëËïÏöÖ]+$/.test(v)) {
      word += v;
    } else if (v === " " && word !== "") {
      result.push(word.toLowerCase());
      word = "";
    }
  }
  if (word !== "") {
    result.push(word.toLowerCase());
  }
  return result;
}
