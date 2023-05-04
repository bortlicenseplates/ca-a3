import fs from 'fs';

const readFileSync = (filename: string) => fs.readFileSync(filename).toString("utf8");

// Constants
export const database = {
    host: "localhost",
    port: 3306,
    database: 'CoffeeDb',
    user: 'root',
    password: 'shire'
  };
 export const port = 9001;
 export const fePort = 9000;