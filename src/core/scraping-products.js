import { sanitizeAndRemoveWords } from "../utils/sanitize-remove-words.js";
import { validateAllWords } from "../utils/validate-all-words.js";
import workList from "../utils/work-list.js";

export const scrapingProducts = (data) => {
    const result = [];
    const ids = [];

    for (let i = 0; i < data.length; i++) {
        const product = data[i];
        const normalizeTitle = sanitizeAndRemoveWords(product.title, workList);
        const children = [];

        for (let j = 0; j < data.length; j++) {
            if (!ids.includes(data[j].id)) {
                const nextProduct = data[j];
                const nextNormalizeTitle = sanitizeAndRemoveWords(nextProduct.title, workList);

                if (validateAllWords(normalizeTitle, nextNormalizeTitle)) {
                    ids.push(data[j].id);
                    children.push({ title: data[j].title, supermarket: data[j].supermarket });
                }
            }
        }

        if (children.length > 0) {
            result.push({ category: product.title, count: children.length, products: children });
        }
    }

    return result;
}