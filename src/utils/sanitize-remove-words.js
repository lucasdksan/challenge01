export const sanitizeAndRemoveWords = (inputString, wordsToRemove) => {
    const normalizeText = (text) => text.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    let sanitizedString = normalizeText(inputString);

    sanitizedString = sanitizedString.replace(/[.,!?0-9]/g, "");

    const regex = new RegExp(`\\b(${wordsToRemove.map(normalizeText).join("|")})\\b`, "gi");

    sanitizedString = sanitizedString.replace(regex, "").trim();

    return sanitizedString.replace(/\s+/g, "-").toLowerCase();
}