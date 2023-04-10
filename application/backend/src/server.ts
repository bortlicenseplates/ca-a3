import express from "express";
import morgan from "morgan";
import database from "./database";
import { cultivar, cultivarWithRoasts, roast, roastWithCultivars, roastWithRoaster, roaster, roasterWithRoasts } from "./types/roasts";
const app = express();

app.use(morgan("common"));

app.get("/roasters/all/", function(req: express.Request, res: express.Response<{data: roaster[]}>, next: express.NextFunction) {
  database.raw(`
    select 
      id as roasterId,
      name as roasterName,
      country as roasterCountry
    from
      Roaster`
  )
    .then(([rows]: roaster[][]): roaster[] => rows)
    .then((rows: roaster[]) => res.json({ data: rows }))
    .catch(next);
});

app.get(
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
      INNER JOIN Roaster
          ON Roast.roaster = Roaster.id
      INNER JOIN RoastCultivar
          ON RoastCultivar.roast = Roast.id
      INNER JOIN Cultivar
          ON Cultivar.id = RoastCultivar.cultivar
      WHERE Roaster.id = 1
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
            if (aggregator.length === 0) {
              return [newRoast];
            }
            const previous = aggregator[aggregator.length - 1];
            if (previous.roastId === newRoast.roastId) {
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

app.get("/cultivars/all/", function(req: express.Request, res: express.Response<{data: cultivar[]}>, next: express.NextFunction) {
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

app.get("/cultivars/:id/", function(
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
          }) => {
            return {
              roastId,
              roasterId,
              roasterName,
              roasterCountry,
              roastName,
              roastLevel,
              roastSweetness,
              roastAcidity,
            }
          }
        )
      };
    })
    .then((rows: cultivar) => res.json({ data: rows }))
    .catch(next);
});

export default app;


