import { readFile, writeFile } from "fs/promises";
import fs from "fs";
import path from "path";

export class InFileInfra {
    constructor(inputFilePath, outputFilePath) {
        this._inputPath = inputFilePath;
        this._outputPath = outputFilePath;

        const inputDirPath = path.dirname(inputFilePath);
        const outputDirPath = path.dirname(outputFilePath);

        if (!fs.existsSync(inputDirPath)) fs.mkdirSync(inputDirPath, { recursive: true });
        if (!fs.existsSync(outputDirPath)) fs.mkdirSync(outputDirPath, { recursive: true });
    }

    async getFile() {
        try {
            const data = await readFile(this._inputPath, { encoding: "utf8" });
            
            return JSON.parse(data);
        } catch (error) {
            if (error.code === "ENOENT") console.error("Arquivo não encontrado:", this._inputPath);
            else console.error("Erro ao ler o arquivo:", error);

            return null;
        }
    }

    async editFile(data) {
        const jsonData = JSON.stringify(data);

        await writeFile(this._outputPath, jsonData);
    }
}
