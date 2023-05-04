import { ISOAlpha3 } from "../utils/countries";

export type roast = {
  roastId: number;
  roastName: string;
  roasterId: number;
  roastLevel: number;
  roastSweetness: number;
  roastAcidity: number;
  cultivarCount?: number;
}

export type roaster = {
  roasterId: number;
  roasterName: string;
  roasterCountry: ISOAlpha3;
};

export type cultivar = {
  cultivarId: number;
  cultivarName: string;
  cultivarCountry: ISOAlpha3;
  cultivarMaslMin: number;
  cultivarMaslMax: number;
}

export type roastWithCultivars = roast & {
  cultivars: cultivar[];
}

export type roasterWithRoasts = roaster & {
  roasts: roastWithCultivars[];
}

export type roastWithRoaster = roast & roaster;

export type cultivarWithRoasts = cultivar & {
  roasts: roastWithRoaster[];
}

export type roastWithCultivarsAndRoaster = roastWithCultivars & roaster;