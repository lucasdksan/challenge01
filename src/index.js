import { InFileInfra } from "./utils/in-file-infra.js";
import { inputPathFile, outputPathFile } from "./utils/paths.js";
import { scrapingProducts } from "./core/scraping-products.js";

async function main() {
    const inFileInfra = new InFileInfra(inputPathFile, outputPathFile);
    const products = await inFileInfra.getFile();
    const result = scrapingProducts(products);

    await inFileInfra.editFile(result);
}

main();