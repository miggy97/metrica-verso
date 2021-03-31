# metrica-verso

Analiza la métrica de un verso en español

> Analyzes the meter of a verse in Spanish

Tiene en cuenta la sinalefa y la diéresis **(pronto añadiré una función que predice los hiatos según una métrica dada)**.

> It takes into account the synalepha and the diereis **(I will soon add a function that predicts the hiatus based on a given metric)**.

# Install
```
npm install metrica-verso
```

## Usage 1
ES6
```ts
import * as metrica from "metrica-verso";
```
OR
```js
const metrica = require("metrica-verso");
console.log(metrica.analyze("Un soneto me manda hacer Violante"));
```

## Result

```js
{
  metricaSilabas: 11,
  totalSilabas: 12,
  palabras: [ 'un', 'soneto', 'me', 'manda', 'hacer', 'violante' ],
  silabasPorPalabra: [
    [ 1, 'un' ],
    [ 3, 'soneto' ],
    [ 1, 'me' ],
    [ 2, 'manda' ],
    [ 2, 'hacer' ],
    [ 3, 'violante' ]
  ],
  sinalefa: [ [ 'manda', 'hacer' ] ],
  dieresis: [],
  posibleDieresis: [ 'violante' ],
  posibleSineresis: [],
  posibleHiato: [],
  ultimaPalabra: {
    palabra: 'violante',
    rimaConsonante: 'ante',
    rimaAsonante: 'ae',
    tonica: 2,
    acentuacion: 'Grave (Llana)',
    silabas: [ 'vio', 'lan', 'te' ]
  }
}
```

## Values Definitions

**metricaSilabas:** `number` número de silabas teniendo en cuenta la sinalefa y la diéresis.

> **metricaSilabas:** `number` number of syllables taking into account the synalepha and the dieresis.

**totalSilabas:** `number` número de sílabas sin tener en cuanta ningun tipo de licencia poética (número real de sílabas)

> **totalSilabas:** `number` number of syllables without taking into account any kind of poetic license (real number of syllables).

**palabras:** `string[]` lista de palabras introducidas.

> **palabras:** `string[]` list of words entered.

**silabasPorPalabra:** `[number, string][]` número de sílabas por palabra.

> **silabasPorPalabra:** `[number, string][]` number of syllables per word.

**sinalefa:** `[string, string][]` indica entre qué dos palabras surge la sinalefa (cuenta una sílaba menos por sinalefa).

> **sinalefa:** `[string, string][]` indicates between which two words there is sinalefa (count one less syllable per synalepha).

**dieresis:** `string[]` indica si alguna de las palabras con hiato tiene una díeresis añadida (se cuenta una sílaba menos por diéresis).

> **dieresis:** `string[]` indicates if any of the words with hiatus has a dieresis added (one less syllable is counted per dieresis).

**posibleDieresis:** `string[]` muesta las palabras que tienen hiato y por lo tanto podrían ser utilizadas con diéreis.

> **posibleDieresis:** `string[]` show words that have a hiatus and therefore could be used with dieresis.

**posibleSineresis:** `string[]` muestra las palabras que tienen diptongo y por lo tanto se pueden romper para obtener una sílaba más.

> **posibleSineresis:** `string[]` shows words that have a diphthong and therefore can be broken to get one more syllable.

**posibleHiato:** `[string, string][]` muestra donde se podría romper la sinalefa para obtener una sílaba más en el verso.

> **posibleHiato:** `[string, string][]` shows where you could break the synalepha to get one more syllable in the verse.

**ultimaPalabra:** `object` contiene información sobre la última palabra.

> **ultimaPalabra:** `object` contains information about the last word.

**palabra:** `string` última palabra.

> **palabra:** `string` last word.

**rimaConsonante:** `string` terminación de la última palabra desde la sílaba tónica teniendo en cuenta consonantes y vocales.

> **rimaConsonante:** `string` last word ending from the stressed syllable taking into account consonants and vowels.

**rimaAsonante:** `string` terminación de la última palabra desde la sílaba tónica teniendo en cuenta solo las vocales.

> **rimaAsonante:** `string` last word ending from the stressed syllable taking into account only vowels.

**tonica:** `number` indica la posición de la sílaba que tiene el acento de la palabra, pero no necesariamente lleva tilde. Es decir, la sílaba que pronunciamos con más fuerza.

> **tonica:** `number` indicates syllable position that has the accent of the word, but does not necessarily have an accent mark. That is to say the stressed syllable.

**acentuacion:** `string` indica si la palabra es Aguda, LLana o Esdrújula. Si la sílaba tónica es la última, la palabra es **Aguda**, si es la penúltima, es **LLana** y si es la antepenúltima, es **Esdrújula**. (Aguda -> +1 sílaba || Esdrújula -> -1 sílaba).

> **acentuacion:** `string` indicates if the word is Aguda, LLana or Esdrújula. words stressed on the last syllable are **Aguda**, the penultimate syllable are **Llana**, and the antepenultimate syllable are **Esdrujula**. (Aguda -> +1 syllable || Esdrujula -> -1 syllable).

**silabas:** `string[]` última palabra separada por sílabas.

> **silabas:** `string[]` last word separated by syllables.

## Related

Tal vez te puede interesar esta otra librería que te dice si dos palabras riman y mucho más: [RIMAM](https://www.npmjs.com/package/riman)

> Maybe you may be interested in this other library that tells you if two words rhyme and more: [RIMAM](https://www.npmjs.com/package/riman)

AYUDAME A MEJORAR ESTA LIBRERÍA REPORTANDO LOS ERRORES EN GITHUB

> HELP ME IMPROVE THIS LIBRARY BY REPORTING BUGS IN GITHUB