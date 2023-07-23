import * as fs from "fs";

// Reads file path parses it as a string an return its content as a private key
export async function readPkFromFile(filePath: string): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    filePath = filePath.trim();
    fs.readFile(filePath, "utf8", (err: any, data: any) => {
      if (err) {
        reject(err);
        return;
      }

      resolve(data.trim());
    });
  });
}
