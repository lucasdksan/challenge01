import path from "path";
import { fileURLToPath } from "url";
import { InFileInfra } from "./in-file-infra.js";
import validateData from "./validate-data.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const inputPathFile = path.resolve(__dirname, "uploads", "data01.json");
const outputPathFile = path.resolve(__dirname, "uploads", "result01.json");

async function main() {
    const inFileInfra = new InFileInfra(inputPathFile, outputPathFile);
    const data = await inFileInfra.getFile();
    const result= validateData(data);

    await inFileInfra.editFile(result);
}

main();