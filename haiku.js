
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

	var haiku = "";

	for (var i = 0; i < struc.length; i++){
		sylCount = struc[i];
		possibleWords = words[sylCount];
		randWord = Math.floor( Math.random() * possibleWords.length);
		haiku += possibleWords[randWord];

		if ((i + 1) != struc.length)
			haiku += "\n";

	}

	// console.log("Wow" + haiku);
	return haiku;

}

// log out the created haiku
console.log("I generated a 5 / 7 / 5 syllable haiku for you!: \n")
console.log(createHaiku([5,7,5]));
// console.log("If you want a new haiku, enter the syllable scheme you want:");


// export functions
 module.exports = {
 		createHaiku: createHaiku,
};