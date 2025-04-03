function sanitizeAndRemoveWords(inputString, wordsToRemove) {
    const normalizeText = (text) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    let sanitizedString = normalizeText(inputString);

    sanitizedString = sanitizedString.replace(/[.,!?0-9]/g, "");

    const regex = new RegExp(`\\b(${wordsToRemove.map(normalizeText).join("|")})\\b`, "gi");

    sanitizedString = sanitizedString.replace(regex, "").trim();

    return sanitizedString.replace(/\s+/g, "-").toLowerCase();
}

function validateAllWords(sanitizedString, comparisonString) {
    const words = sanitizedString.split("-");
    const nWords = comparisonString.split("-");

    return words.every(word => comparisonString.toLowerCase().includes(word.toLowerCase())) && nWords.length === words.length; 
}

const validateData = (data) => {
    const result = [];
    const ids = [];
    const works = ["ml", "g", "Gramas", "kg", "Litro", "Quilos", "Quilos", "de", "L"];

    for(let i = 0; i < data.length; i++) {
        const product = data[i];
        const normalizeTitle = sanitizeAndRemoveWords(product.title, works);
        const children = [];

        for(let j = 0; j < data.length; j++) {
            if(!ids.includes(data[j].id)) {
                const nextProduct = data[j];
                const nextNormalizeTitle = sanitizeAndRemoveWords(nextProduct.title, works);

                if(validateAllWords(normalizeTitle, nextNormalizeTitle)){
                    ids.push(data[j].id);
                    children.push({ title: data[j].title, supermarket: data[j].supermarket });
                }
            }
        }

        if(children.length > 0) {
            result.push({ category: product.title, count: children.length, products: children });
        } 
    }

    return result;
}

export default validateData;