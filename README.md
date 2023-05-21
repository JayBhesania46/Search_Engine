### Search Engine

## INTRODUCTION

The goal of this project was to create a search engine for a small website,following the guidelines described in section 23.6 (Subsection; Search Engine). The search engine is supposed to take a directory of files, parse the contents,and index all the words except stop words. The program should then rank the words based on their frequency in each file. Users can then search for specific terms and receive a ranking of relevant web pages.

## Search Engine

This is a tool built with NodeJS that can search for a specific word on a webpage and provide the number of times it appears. The search results are ranked based on the number of occurrences of the searched word, with the page having the highest number listed first.

## Static Data (Input Files)

At present, the project is using static HTML documents as input data. However, it is possible to modify the project to fetch these documents dynamically by using an endpoint. This means that the project can be extended to retrieve HTML documents from a remote server or a database, rather than relying solely on the static files stored locally. This would make the project more versatile and scalable, allowing it to handle a larger and more diverse set of input data. With this change, the project would be able to process and analyze HTML documents from various sources in a more efficient and automated manner.The files are placed in the [`data` directory](./data/).

## ALGORITHMS AND DATA STRUCTURES

The data structure used for this project is a [Trie](https://en.wikipedia.org/wiki/Trie) implemented using a JavaScript [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map). The implementation is in the file [`trie.js`](./trie.js). The map when viewed as a JavaScript object would look as follows:

```javascript
{
  a: {
    results: {},
  },
  t: {
    h: {
      e: {
        results: {
          "MsDhoni.html": 2,
          "ViratKohli.html": 1,
        },
      },
      results: {},
    },
    results: {},
  },
}
```

Each key in the object has a `results` object that contains a key-value pair signifying the file name and number of times the word that is formed with the keys upto the current key has occurred. For the example above, the word formed at the key `e` would be `the`, and the `results` object tells us that the word has appeared twice and once in the files named `MsDhoni.html` and `ViratKohli.html` respectively.

## Creating the Trie

The Trie is prepared when the application starts for all the files present in the data directory. The text in each file is cleaned as follows:

- remove all html tags
- convert all text to lower case
- remove all apostrophes (`'`)
- remove all [stop words](https://en.wikipedia.org/wiki/Stop_word)
- remove all non alpha numeric characters
- condense the file: remove all extra spaces, such as tabs (`\t`) and next lines (`\n`)

After this the list of words from the cleaned text for each file is added to the Trie as follows:

1. One word is taken at a time
2. Iterate over all the characters of the word starting from the first character
3. If the key already exists in the Map, we move into the the value Map for that key and continue iterating. 
Otherwise we initialize a key as the current letter and its value as a Map with a `results` key (which would be an empty Map)
4. Repeat step 3 till we reach the end of the word, at this stage we update the `results` Map of the final key as follows:

   - If the filename of the current file already exists in the `results` Map, then we increment the value by 1
   - Else, we add a key as current file's name and value as 1

## Searching the Trie

Getting the results for a word is very similar to how we created the Trie. We take the word user inputs, convert it to lowercase and iterate over it. We look for a key in the Map for each letter starting from the first letter and move onto the value Map for every match. At any point if there is no match, we return an empty result set. Otherwise, we keep iterating till we reach the last letter, at which stage we get the `results` Map at that key and print that in form of a table with file names sorted in descending order of number of occurrences.

## How to run

This is NodeJS project. So before running the project, make sure you have NodeJS setup. You can see the steps [here](https://nodejs.org/en/).

1. Install dependecies. From the root directory, run the following command:

```
npm install
```

This will install all the packages required to run this project. The list of dependencies can be seen in [`package.json`](./package.json)

2. From the root directory, run the following command to start the application:

```
npm start
```

To stop searching, and quit the application you can input `:q`

## Sample Output

```
PS F:\Masters\600 - AA\Final_Project_CWID_20011391_CS 600> npm start

> search-engine@1.0.0 start
> node app.js

Reading files from: F:\Masters\600 - AA\Final_Project_CWID_20011391_CS 600\data
✔ BhuvneshwarKumar.html
✔ HardikPandya.html
✔ JaspritBumrah.html
✔ MohammedShami.html
✔ RishabhPant.html
✔ SureshRaina.html
✔ RohitSharma.html
✔ MsDhoni.html
✔ SachinTendulkar.html
✔ ViratKohli.html

Enter the word you want to searh (Enter ':q' to quit): virat

Search Result:
┌─────────┬───────────┬───────────────────────────────────────────────────────┐
│ (index) │ File Name │                      Occurrence                       │
├─────────┼───────────┼───────────────────────────────────────────────────────┤
│    0    │    '0'    │   { fileName: 'ViratKohli.html', occurrences: 642 }   │
│    1    │    '1'    │   { fileName: 'RohitSharma.html', occurrences: 39 }   │
│    2    │    '2'    │     { fileName: 'MsDhoni.html', occurrences: 31 }     │
│    3    │    '3'    │ { fileName: 'SachinTendulkar.html', occurrences: 20 } │
│    4    │    '4'    │  { fileName: 'MohammedShami.html', occurrences: 12 }  │
│    5    │    '5'    │   { fileName: 'RishabhPant.html', occurrences: 9 }    │
│    6    │    '6'    │   { fileName: 'SureshRaina.html', occurrences: 7 }    │
│    7    │    '7'    │   { fileName: 'HardikPandya.html', occurrences: 5 }   │
│    8    │    '8'    │ { fileName: 'BhuvneshwarKumar.html', occurrences: 4 } │
│    9    │    '9'    │  { fileName: 'JaspritBumrah.html', occurrences: 4 }   │
└─────────┴───────────┴───────────────────────────────────────────────────────┘


Enter the word you want to searh (Enter ':q' to quit): Dhoni

Search Result:
┌─────────┬───────────┬────────────────────────────────────────────────────────┐
│ (index) │ File Name │                       Occurrence                       │
├─────────┼───────────┼────────────────────────────────────────────────────────┤
│    0    │    '0'    │     { fileName: 'MsDhoni.html', occurrences: 604 }     │
│    1    │    '1'    │    { fileName: 'ViratKohli.html', occurrences: 64 }    │
│    2    │    '2'    │   { fileName: 'RohitSharma.html', occurrences: 33 }    │
│    3    │    '3'    │   { fileName: 'RishabhPant.html', occurrences: 29 }    │
│    4    │    '4'    │   { fileName: 'SureshRaina.html', occurrences: 28 }    │
│    5    │    '5'    │ { fileName: 'SachinTendulkar.html', occurrences: 23 }  │
│    6    │    '6'    │ { fileName: 'BhuvneshwarKumar.html', occurrences: 14 } │
│    7    │    '7'    │   { fileName: 'HardikPandya.html', occurrences: 10 }   │
│    8    │    '8'    │  { fileName: 'JaspritBumrah.html', occurrences: 10 }   │
│    9    │    '9'    │   { fileName: 'MohammedShami.html', occurrences: 9 }   │
└─────────┴───────────┴────────────────────────────────────────────────────────┘


Enter the word you want to searh (Enter ':q' to quit): Sachin

Search Result:
┌─────────┬───────────┬────────────────────────────────────────────────────────┐
│ (index) │ File Name │                       Occurrence                       │
├─────────┼───────────┼────────────────────────────────────────────────────────┤
│    0    │    '0'    │ { fileName: 'SachinTendulkar.html', occurrences: 677 } │
│    1    │    '1'    │    { fileName: 'ViratKohli.html', occurrences: 55 }    │
│    2    │    '2'    │     { fileName: 'MsDhoni.html', occurrences: 12 }      │
│    3    │    '3'    │    { fileName: 'RohitSharma.html', occurrences: 9 }    │
│    4    │    '4'    │    { fileName: 'SureshRaina.html', occurrences: 6 }    │
│    5    │    '5'    │ { fileName: 'BhuvneshwarKumar.html', occurrences: 2 }  │
│    6    │    '6'    │   { fileName: 'JaspritBumrah.html', occurrences: 1 }   │
└─────────┴───────────┴────────────────────────────────────────────────────────┘


Enter the word you want to searh (Enter ':q' to quit): Ramesh

Search Result:
┌─────────┬───────────┬───────────────────────────────────────────────────────┐
│ (index) │ File Name │                      Occurrence                       │
├─────────┼───────────┼───────────────────────────────────────────────────────┤
│    0    │    '0'    │ { fileName: 'SachinTendulkar.html', occurrences: 18 } │
│    1    │    '1'    │     { fileName: 'MsDhoni.html', occurrences: 3 }      │
│    2    │    '2'    │    { fileName: 'ViratKohli.html', occurrences: 2 }    │
│    3    │    '3'    │  { fileName: 'JaspritBumrah.html', occurrences: 1 }   │
│    4    │    '4'    │   { fileName: 'RishabhPant.html', occurrences: 1 }    │
└─────────┴───────────┴───────────────────────────────────────────────────────┘


Enter the word you want to searh (Enter ':q' to quit): JayBhesania

Search Result:
Not found


Enter the word you want to searh (Enter ':q' to quit): cs 600

Search Result:
Not found


Enter the word you want to searh (Enter ':q' to quit): MyProject

Search Result:
Not found


Enter the word you want to searh (Enter ':q' to quit): Thank You

Search Result:
Not found


Enter the word you want to searh (Enter ':q' to quit): :q

```