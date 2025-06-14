import type { Country } from '../interfaces/country.interface';
import type { RESTCountry } from '../interfaces/rest-countries.interface';

export class CountryMapper {
  static mapRestCountryToCountry(restCountry: RESTCountry): Country {
    return {
      cca2: restCountry.cca2,
      flag: restCountry.flag,
      flagSvg: restCountry.flags.svg,
      name: restCountry.translations['spa'].common ?? 'No Spanish Name',
      capital: restCountry.capital,
      population: restCountry.population,
      region: restCountry.region,
      subregion: restCountry.subregion ?? 'No Subregion',
    };
  }

  static mapRestCountryToArrayToCountryArray(
    restCountries: RESTCountry[]
  ): Country[] {
    return restCountries.map(this.mapRestCountryToCountry);
  }
}
