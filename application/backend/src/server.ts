import express from "express";
import morgan from "morgan";
import database from "./database";
const app = express();

app.use(morgan("common"));

app.get("/", function(req: any, res: { json: (arg0: { message: string; }) => any; }, next: any) {
  database.raw('select VERSION() version')
    .then(([rows, columns]: Array<Array<any>>): any => rows[0])
    .then((row: { version: any; }) => res.json({ message: `Hello from MySQL ${row.version}` }))
    .catch(next);
});

app.get("/roasters/all/", function(req: any, res: { json: (arg0: { data: any[]; }) => any; }, next: any) {
  database.raw('select * from Roaster')
    .then(([rows, columns]: Array<Array<any>>): any => rows[0])
    .then((rows: any) => res.json({ data: rows }))
    .catch(next);
});

app.get("/healthz", function(req: any, res: { json: (arg0: { message: string; }) => void; }) {
  // do app logic here to determine if app is truly healthy
  // you should return 200 if healthy, and anything else will fail
  // if you want, you should be able to restrict this to localhost (include ipv4 and ipv6)
  res.json({ message: "I am happy and healthy" });
});
export default app;
