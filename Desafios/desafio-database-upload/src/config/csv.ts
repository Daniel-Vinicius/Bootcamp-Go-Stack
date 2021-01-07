// Leia https://www.notion.so/danielvini/Importando-arquivos-CSV-com-Node-js-3ca078d6faa547f6ab50f71b27ef6bb5 para entender

import csvParse from 'csv-parse';
import fs from 'fs';
import path from 'path';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function loadCSV(filePath: string): any[] {
  const readCSVStream = fs.createReadStream(csvFilePath);

  const parseStream = csvParse({
    from_line: 2,
    ltrim: true,
    rtrim: true,
  });
  const parseCSV = readCSVStream.pipe(parseStream);

  const lines = [];

  parseCSV.on('data', line => {
    lines.push(line);
  });

  await new Promise(resolve => {
    parseCSV.on('end', resolve);
  });

  return lines;
}

const csvFilePath = path.resolve(__dirname, 'import_template.csv');

const data = loadCSV(csvFilePath);
