import * as fs from "fs/promises";

export class FileController {
    static async readJSON<T>(path: string): Promise<T> {
        const fileData = await fs.readFile(path, 'utf-8');
        return JSON.parse(fileData);
    }
    static async writeJSON<T>(path: string, data: T): Promise<void> {
        await fs.writeFile(path, JSON.stringify(data, null, 2), 'utf-8');
    }
}
