
var fs = require("fs");
var cmudictFile = readCmudictFile('./cmudict.txt');
var words = [];
// index represents number of syllables;
// array of words at each index;
// two dimensional array to store all the words and their syllable count


// read the dictionary file
function readCmudictFile(file){

  return fs.readFileSync(file).toString();

}


// takes the data and stores it a 2D array.
function formatData(data){    

   var lines = data.toString().split("\n");
    
    
    lines.forEach(function(line){    
    	 lineSplit = line.split("  ");
    	 word = lineSplit[0];
    	 syllableCount = countSyllables(lineSplit[1]);

    	 if (words[syllableCount] == undefined){
    	 	words[syllableCount] = [];
    	 	words[syllableCount].push(word);
    	 }
    	 else 
    	 	words[syllableCount].push(word);    
  });

}


// count the number of Syllables 
function countSyllables(phoneme){

	if (phoneme == undefined)
		return 0;

	var syllables = phoneme.split(" ");
	var syllableCount = 0;


	for (var i = 0; i < syllables.length; i++) {

		if (syllables[i].match(/\d/)){
			syllableCount++;
		}
	}

	return syllableCount;

}


// actually create the haiku
function createHaiku(struc){

	formatData(cmudictFile);
	
	// exit if user typed in nothing
	if (struc == "0"){
		sayBye();
	}

	var haiku = "";

	try {

		for (var i = 0; i < struc.length; i++){
			sylCount = struc[i];
			possibleWords = words[sylCount];
			randWord = Math.floor( Math.random() * possibleWords.length);
			haiku += possibleWords[randWord];

		if ((i + 1) != struc.length)
			haiku += "\n";

		}

	}

	catch (e) {
		sayBye();
	}

	return haiku;

}

// 
function processInput(text){
    text = text.toString();
	text = text.replace("\n", ""); // remove newline
	text = text.split(",");

	for (var i = 0; i < text.length; i++){
		text[i] = Number(text[i]);
	}

	return text;
}

function sayBye() {
	console.log("\nGoodbye!");
	process.exit();
}

// log out the created haiku
console.log("I generated a 5 / 7 / 5 syllable haiku for you:\n");
console.log(createHaiku([5,7,5]));

// prompt the user if they want a new haiku.
console.log("\nIf you want me to create a new haiku for you, enter a syllable scheme, delineated by commas.");
console.log("Enter anything else to quit.");
console.log("Scheme:")

// read the input information
process.stdin.resume();
process.stdin.setEncoding('utf8');
var util = require('util');

process.stdin.on('data', function (text) {

	text = processInput(text);
	console.log("\n" + createHaiku(text));
	sayBye();

    
});



// export functions
 module.exports = {
 		createHaiku: createHaiku,
};