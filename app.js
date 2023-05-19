// Import necessary modules
const fs = require("fs/promises");
const path = require("path");
const textCleaner = require("text-cleaner");
const { htmlToText } = require("html-to-text");
const { removeStopwords } = require("stopword");
const readline = require("readline").createInterface({
	input: process.stdin,
	output: process.stdout,
});
const Trie = require("./trie");

// Define the directory where the data files are stored
const filesDirectory = path.resolve("data");

// Function to read and clean data from a file
const readFileData = async (file) => {
	// Read the file data
	const data = await fs.readFile(path.join(filesDirectory, file), "utf-8");
	// Clean the data using various text cleaning techniques
	const cleanData = removeStopwords(
		textCleaner(htmlToText(data))
			.toLowerCase()
			.removeApostrophes()
			.removeStopWords()
			.removeChars({ exclude: "0123456789", replaceWith: " " })
			.condense()
			.valueOf()
			.split(" ")
	);
	// Log that the file has been processed successfully
	console.log(`✔ ${file}`);
	return cleanData;
};

// Function to read and process data from all files in the directory
const readFiles = async (files) => {
	await Promise.all(
		files.map(async (file, index) => {
			// Read and clean the data from the file
			const data = await readFileData(file);
			// Store the cleaned data and file name in the files array
			files[index] = {
				file,
				data,
			};
		})
	);
	return files;
};

// Function to get user input from the command line
const getUserInput = async () =>
	new Promise((resolve) => {
		readline.question(
			"\n\nEnter the word you want to search (Enter ':q' to quit): ",
			resolve
		);
	});

// Main function that runs the program
const main = async () => {
	try {
		console.log(`Reading files from: ${filesDirectory}`);
		// Read all files in the directory and process their data
		let files = await fs.readdir(filesDirectory);
		files = await readFiles(files);
		// Create a trie data structure using the processed data from all files
		const trie = new Trie(files);
		// Continuously prompt the user for input until they quit
		let userInput = await getUserInput();
		while (userInput !== ":q") {
			// Search the trie for the user's input and display the results
			const result = await trie.search(userInput);
			console.log("\nSearch Result: ");
			const resultArr = Object.entries(result)
				.sort((a, b) => b[1] - a[1])
				.map((entry) => ({
					"File Name": entry[0],
					Occurrence: entry[1],
				}));
			if (resultArr.length > 0) console.table(resultArr);
			else console.log("Not found");
			// Prompt the user for more input
			userInput = await getUserInput();
		}
		// Close the readline interface when the program ends
		readline.close();
	} catch (problem) {
		// Catch and log any errors that occur
		console.error(problem);
	}
};

// Call the main function to start the program
main();
