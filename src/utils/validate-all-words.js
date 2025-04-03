export const validateAllWords = (sanitizedString, comparisonString) => {
    const words = sanitizedString.split("-");
    const nWords = comparisonString.split("-");

    return words.every(word => comparisonString.toLowerCase().includes(word.toLowerCase())) && nWords.length === words.length; 
}