export type roast = {
  roastId: number;
  roastName: string;
  roasterId: number;
  roastLevel: number;
  roastSweetness: number;
  roastAcidity: number;
}

export type roaster = {
  roasterId: number;
  roasterName: string;
  roasterCountry: string;
};

export type cultivar = {
  cultivarId: number;
  cultivarName: string;
  cultivarCountry: string;
  cultivarMaslMin: number;
  cultivarMaslMax: number;
}

export type roastWithCultivars = roast & {
  cultivars: cultivar[];
}

export type roasterWithRoasts = roaster & {
  roasts: roastWithCultivars[]
}