function translateToPigLatin() {
    let input = document.getElementById('txtVal').value;
    let pigLatin = convertToPigLatin(input);
    document.getElementById('pigLatLbl').textContent = pigLatin;
}

function convertToPigLatin(sentence) {
    // Separa el texto en palabras
    let words = sentence.split(' ');
    let vowels = ['a', 'e', 'i', 'o', 'u'];

    
    let pigLatinWords = words.map(word => {
        let lowerWord = word.toLowerCase();
        
        // Si la palabra empieza con vocal agrega way
        if (vowels.includes(lowerWord[0])) {
            return word + 'way';
        } else {
            
            let vowelIndex = lowerWord.search(/[aeiou]/);
            if (vowelIndex === -1) return word; 

            // Mueve la parte antes de la vocal al final y agrega ay
            let consonantCluster = word.slice(0, vowelIndex);
            let restOfWord = word.slice(vowelIndex);
            return restOfWord + consonantCluster + 'ay';
        }
    });

    // Une las palabras procesadas 
    return pigLatinWords.join(' ');
}
