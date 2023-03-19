import fs from 'fs';

const readFileSync = (filename: string) => fs.readFileSync(filename).toString("utf8");

// Constants
export const database = {
    host: process.env.DATABASE_HOST || "localhost",
    port: process.env.DATABASE_PORT,
    database: process.env.DATABASE_DB,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD
      ? readFileSync(process.env.DATABASE_PASSWORD)
      : null
  };
 export const port = process.env.PORT || 8080;