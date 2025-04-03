import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPathFile = path.resolve(__dirname, "..", "uploads", "data01.json");
const outputPathFile = path.resolve(__dirname, "..", "uploads", "result01.json");

export {
    inputPathFile,
    outputPathFile
}