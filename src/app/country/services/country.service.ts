import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { RESTCountry } from '../interfaces/rest-countries.interface';
import { catchError, delay, map } from 'rxjs/operators';
import { CountryMapper } from '../mappers/country.mapper';
import { Observable, throwError } from 'rxjs';
import type { Country } from '../interfaces/country.interface';

const ApiUrl = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();
    return this.http.get<RESTCountry[]>(`${ApiUrl}/capital/${query}`).pipe(
      map((resp) => CountryMapper.mapRestCountryToArrayToCountryArray(resp)),
      catchError((error) => {
        console.error(`Error al buscar países por capital: ${query}`, error);
        return throwError(
          () =>
            new Error(`Error con la búsqueda de países por capital: ${query}`)
        );
      })
    );
  }

  searchByCountry(query: string): Observable<Country[]> {
    const url = `${ApiUrl}/name/${query}`;
    query = query.toLowerCase();
    return this.http.get<RESTCountry[]>(url).pipe(
      map((resp) => CountryMapper.mapRestCountryToArrayToCountryArray(resp)),
      delay(2000),
      catchError((error) => {
        console.error(`Error al buscar países por nombre: ${query}`, error);
        return throwError(
          () =>
            new Error(`Error con la búsqueda de países por nombre: ${query}`)
        );
      })
    );
  }

  searchByCountryByAlphaCode(code: string) {
    const url = `${ApiUrl}/alpha/${code}`;

    return this.http.get<RESTCountry[]>(url).pipe(
      map((resp) => CountryMapper.mapRestCountryToArrayToCountryArray(resp)),
      map((countries) => countries.at(0)), // Asumiendo que el código alfa devuelve un solo país
      catchError((error) => {
        console.error(`Error al buscar países por nombre: ${code}`, error);
        return throwError(
          () => new Error(`Error con la búsqueda de países por código: ${code}`)
        );
      })
    );
  }
}
