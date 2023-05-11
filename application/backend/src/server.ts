import express from "express";
import morgan from "morgan";
import database from "./database";
import { cultivar, cultivarWithRoasts, roast, roastWithCultivars, roastWithCultivarsAndRoaster, roastWithRoaster, roaster, roasterWithRoasts } from "./types/roasts";
import path from "path";
const app = express();
const api = express.Router();
const fe = express.Router();

app.use(morgan("common"));


// fe.use(express.static(path.resolve(`${__dirname}/../build/`)));

api.get("/roasters/all/", function(req: express.Request, res: express.Response<{data: roaster[]}>, next: express.NextFunction) {
  database.raw(`
    SELECT 
      Roaster.id as roasterId,
      Roaster.name as roasterName,
      Roaster.country as roasterCountry
    FROM
      Roaster;`
  )
    .then(([rows]: roaster[][]): roaster[] => rows)
    .then((rows: roaster[]) => res.json({ data: rows }))
    .catch(next);
});

api.get(
  "/roasters/:id",
  (req: express.Request<{id: number}>, res: express.Response<{data: roasterWithRoasts[]}>, next: express.NextFunction) => {
    database
      .raw(`
      SELECT
        Roast.id roastId,
        Roast.name roastName,
        Roast.roaster roasterId,
        Roast.roastLevel roastLevel,
        Roast.sweetness roastSweetness,
        Roast.acidity roastAcidity,
        Roaster.name roasterName,
        Roaster.country roasterCountry,
        Cultivar.id cultivarId,
        Cultivar.name cultivarName,
        Cultivar.country cultivarCountry,
        Cultivar.maslMin cultivarMaslMin,
        Cultivar.maslMax cultivarMaslMax
      FROM Roast
      LEFT JOIN Roaster
          ON Roast.roaster = Roaster.id
      LEFT JOIN RoastCultivar
          ON RoastCultivar.roast = Roast.id
      LEFT JOIN Cultivar
          ON Cultivar.id = RoastCultivar.cultivar
      WHERE Roaster.id = ${req.params.id}
      ORDER BY Roast.id;
      `)
      .then(([rows]: (roast & roaster & cultivar)[][]): any => {
        const roasts = rows.reduce(
          (
            aggregator: roastWithCultivars[],
            {
              roastId,
              roasterId,
              roastName,
              roastLevel,
              roastSweetness,
              roastAcidity,
              cultivarId,
              cultivarName,
              cultivarCountry,
              cultivarMaslMin,
              cultivarMaslMax,
            }
          ) => {
            let newRoast: roastWithCultivars = {
              roastId,
              roasterId,
              roastName,
              roastLevel,
              roastSweetness,
              roastAcidity,
              cultivars: [
                {
                  cultivarId,
                  cultivarName,
                  cultivarCountry,
                  cultivarMaslMin,
                  cultivarMaslMax,
                },
              ],
            };
            newRoast.cultivars = newRoast.cultivars?.filter(c => !!c.cultivarName)
            if (aggregator.length === 0) {
              return [newRoast];
            }
            const previous = aggregator[aggregator.length - 1];
            if (previous.roastId === newRoast.roastId && previous.cultivars && newRoast.cultivars) {
              previous.cultivars.push(newRoast.cultivars[0]);
            } else {
              aggregator.push(newRoast);
            }
            return aggregator;
          },
          []
        );
        const { roasterName, roasterId, roasterCountry } = rows[0];
        return {
          roasterName,
          roasterId,
          roasterCountry,
          roasts,
        };
      })
      .then((rows: roasterWithRoasts[]) => res.json({ data: rows }))
      .catch(next);
  }
);

api.get("/cultivars/all/", function(req: express.Request, res: express.Response<{data: cultivar[]}>, next: express.NextFunction) {
  database.raw(`
    SELECT 
      id as cultivarId,
      name as cultivarName,
      country as cultivarCountry,
      maslMin as cultivarMaslMin,
      maslMax as cultivarMaslMax
    FROM
      Cultivar`
  )
    .then(([rows]: cultivar[][]): any => rows)
    .then((rows: cultivar[]) => res.json({ data: rows }))
    .catch(next);
});

api.get("/cultivars/:id/", function(
  req: express.Request<{id: number}>,
  res: express.Response<{data: cultivar}>,
  next: express.NextFunction
) {
  database.raw(`
    SELECT
      Roast.id roastId,
      Roast.name roastName,
      Roast.roaster roasterId,
      Roast.roastLevel roastLevel,
      Roast.sweetness roastSweetness,
      Roast.acidity roastAcidity,
      Roaster.name roasterName,
      Roaster.country roasterCountry,
      Cultivar.id cultivarId,
      Cultivar.name cultivarName,
      Cultivar.country cultivarCountry,
      Cultivar.maslMin cultivarMaslMin,
      Cultivar.maslMax cultivarMaslMax
    FROM Cultivar
    INNER JOIN RoastCultivar
      ON RoastCultivar.cultivar = Cultivar.id
    INNER JOIN Roast
      ON Roast.id = RoastCultivar.roast
    INNER JOIN Roaster
      ON Roast.roaster = Roaster.id
    WHERE Cultivar.id = ${req.params.id}
    ORDER BY Cultivar.id;
  `)
    .then(([rows]: (cultivar & roast & roaster)[][]): cultivarWithRoasts => {
      const { cultivarId, cultivarName, cultivarCountry, cultivarMaslMax, cultivarMaslMin } = rows[0];
      return {
        cultivarId,
        cultivarName,
        cultivarCountry,
        cultivarMaslMax,
        cultivarMaslMin,
        roasts: rows.map(
          ({
            roastId,
            roasterId,
            roastName,
            roasterName,
            roasterCountry,
            roastLevel,
            roastSweetness,
            roastAcidity
          }) => ({
            roastId,
            roasterId,
            roasterName,
            roasterCountry,
            roastName,
            roastLevel,
            roastSweetness,
            roastAcidity,
          })
        )
      };
    })
    .then((rows: cultivarWithRoasts) => res.json({ data: rows }))
    .catch(next);
});

api.get("/roasts/all/", function(req: express.Request, res: express.Response<{data: roast[]}>, next: express.NextFunction) {
  database.raw(`
    SELECT 
      Roast.id roastId,
      Roast.name roastName,
      Roast.roaster roasterId,
      Roast.roastLevel roastLevel,
      Roast.sweetness roastSweetness,
      Roaster.name roasterName,
      Roaster.country roasterCountry,
      COUNT(RoastCultivar.roast) as cultivarCount
    FROM Roast
    INNER JOIN Roaster
      ON Roast.roaster = Roaster.id
    LEFT JOIN RoastCultivar
      ON Roast.id = RoastCultivar.roast
    GROUP BY
      Roast.id,
      Roast.name,
      Roast.roaster,
      Roast.roastLevel,
      Roast.sweetness,
      Roaster.name,
      Roaster.country`
  )
    .then(([rows]: roast[][]): any => rows)
    .then((rows: roast[]) => res.json({ data: rows }))
    .catch(next);
});

api.get("/roasts/:id/", function(
  req: express.Request<{id: number}>,
  res: express.Response<{data: roastWithCultivarsAndRoaster}>,
  next: express.NextFunction
) {
  database.raw(`
    SELECT
      Roast.id roastId,
      Roast.name roastName,
      Roast.roaster roasterId,
      Roast.roastLevel roastLevel,
      Roast.sweetness roastSweetness,
      Roast.acidity roastAcidity,
      Roaster.name roasterName,
      Roaster.country roasterCountry,
      Cultivar.id cultivarId,
      Cultivar.name cultivarName,
      Cultivar.country cultivarCountry,
      Cultivar.maslMin cultivarMaslMin,
      Cultivar.maslMax cultivarMaslMax
    FROM Roast
    LEFT JOIN RoastCultivar
      ON RoastCultivar.roast = Roast.id
    LEFT JOIN Cultivar
      ON Cultivar.id = RoastCultivar.cultivar
    LEFT JOIN Roaster
      ON Roast.roaster = Roaster.id
    WHERE Roast.id = ${req.params.id}
    ORDER BY Roast.id;
  `)
    .then(([rows]: (cultivar & roast & roaster)[][]): roastWithCultivarsAndRoaster => {
      const { 
        roastId,
        roastName,
        roastLevel,
        roastAcidity,
        roastSweetness,
        roasterId,
        roasterName,
        roasterCountry
      } = rows[0];
      const cultivars: cultivar[] = rows
        .filter(c => !!c?.cultivarId)
        .map((r) => {
          return {
            cultivarId: r.cultivarId,
            cultivarName: r.cultivarName,
            cultivarCountry: r.cultivarCountry,
            cultivarMaslMin: r.cultivarMaslMin,
            cultivarMaslMax: r.cultivarMaslMax,
          };
        });
      return {
        roastId,
        roastName,
        roastLevel,
        roastAcidity,
        roastSweetness,
        roasterId,
        roasterName,
        roasterCountry,
        cultivars
      };
    })
    .then((rows: roastWithCultivarsAndRoaster) => res.json({ data: rows }))
    .catch(next);
});

api.post("/roast/new/", (req, res) => {
  database.raw(`
  INSERT INTO
    CoffeeDb.Roast
  VALUES ()`)
})
api.put("/roast/:id/", (req, res) => {
  database.raw(`
  UPDATE
    CoffeeDb.Roast
  SET
  WHERE
    id = ${req.params.id}`)
})
api.post("/roaster/new/", (req, res) => {
  database.raw(`
  INSERT INTO
    CoffeeDb.Roast
  VALUES ()`)
})
api.put("/roaster/:id/", (req, res) => {
  database.raw(`
  UPDATE
    CoffeeDb.Roast
  SET
  WHERE
    id = ${req.params.id}`)
})
api.post("/roast/new/", (req, res) => {
  database.raw(`
  INSERT INTO
    CoffeeDb.Roast
  VALUES ()`)
})
api.put("/roast/:id/", (req, res) => {
  database.raw(`
  UPDATE
    CoffeeDb.Roast
  SET
  WHERE
    id = ${req.params.id}`)
})

app.use('/api/', api);
app.use('/*', function(req, res){res.sendFile(path.join(__dirname, `build`, `index.html`))});

export const apiApp = app;


