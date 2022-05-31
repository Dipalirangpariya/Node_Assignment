import  { countryModel }  from "../model/Country";

export default class countryRepo {

public static async create(country:countryModel): Promise<{country:countryModel}> {

  const createdCountry = await countryModel.create(country);
  return {country:createdCountry};
}
}