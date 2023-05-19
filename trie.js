// This function creates a new Trie node
const createNode = () => {
	const node = new Map();
	node.set("results", new Map());
	return node;
  };
  
  // This is the implementation of the Trie data structure
  class Trie {
	// The root node of the Trie is created when a new instance of the Trie is created
	#root = createNode();
  
	constructor(files) {
	  // The buildTrie function is called to populate the Trie with data from the provided files
	  this.#buildTrie(files);
	}
  
	// This function builds the Trie by processing the text data from each file
	#buildTrie = (files) => {
	  // This function processes a single word and updates the Trie accordingly
	  const processWord = (fileName, word) => {
		let current = this.#root;
  
		// Iterate over each character in the word
		word.split("").forEach((char) => {
		  let occurrence = 0;
  
		  // If the character is not already in the Trie, add it
		  if (!current.has(char)) {
			current.set(char, createNode());
		  }
  
		  // Move to the next node in the Trie
		  current = current.get(char);
  
		  // If the current node already has results for the current file, get the number of occurrences
		  if (current.get("results").has(fileName)) {
			occurrence = current.get("results").get(fileName);
		  }
  
		  // Update the results for the current file in the current node
		  current.get("results").set(fileName, occurrence + 1);
		});
	  };
  
	  // This function processes a single file and calls processWord on each word
	  const processTextSnippet = (fileName, fileData) => {
		fileData.forEach((word) => {
		  processWord(fileName, word);
		});
	  };
  
	  // Iterate over each file and call processTextSnippet on each file
	  files.forEach((file) => {
		processTextSnippet(file.file, file.data);
	  });
	};
  
	// This function searches the Trie for the provided text
	search = (text, resultsLimit = Infinity) => {
	  // This function converts a Map of search results to an array and sorts it
	  const renderSearchResults = (resultMap) => {
		const resultArr = [];
		resultMap.forEach((occurrences, fileName) => {
		  resultArr.push({ fileName, occurrences });
		});
		return resultArr.sort((a, b) => b.occurrences - a.occurrences);
	  };
  
	  // Start the search at the root node
	  let trieMap = this.#root;
  
	  // Normalize the search text by removing whitespace and converting to lowercase
	  text = text
		.split("")
		.map((char) => char.trim().toLowerCase())
		.filter((char) => char !== "")
		.join("");
  
	  // Iterate over each character in the search text
	  for (const letter of text.toLowerCase()) {
		// If the current character is not in the Trie, return an empty array
		if (!trieMap.has(letter)) {
		  return renderSearchResults(new Map());
		}
  
		// Move to the next node in the Trie
		trieMap = trieMap.get(letter);
	  }
  
	  // Get the search results from the current node
	  const results = trieMap.get("results");
  
	  // If there are no search results, return an empty array
	  if (results.size === 0) {
		return [];
	  }
  
	  // Convert the search results to an array and sort it, then return the first resultsLimit elements
	  return renderSearchResults(results).slice(0, resultsLimit);
	};
}

module.exports = Trie;
