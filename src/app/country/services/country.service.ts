import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import type { RESTCountry } from '../interfaces/rest-countries.interface';
import { catchError, delay, map, tap } from 'rxjs/operators';
import { CountryMapper } from '../mappers/country.mapper';
import { Observable, of, throwError } from 'rxjs';
import type { Country } from '../interfaces/country.interface';
import { Region } from '../interfaces/region.interface';

const ApiUrl = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<Region, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();
    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${ApiUrl}/capital/${query}`).pipe(
      map((resp) => CountryMapper.mapRestCountryToArrayToCountryArray(resp)),
      tap((countries) => this.queryCacheCapital.set(query, countries)),
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
    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(url).pipe(
      map((resp) => CountryMapper.mapRestCountryToArrayToCountryArray(resp)),
      tap((countries) => this.queryCacheCountry.set(query, countries)),
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
  searchByRegion(region: Region): Observable<Country[]> {
    const url = `${ApiUrl}/region/${region}`;

    if (this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region) ?? []);
    }

    return this.http.get<RESTCountry[]>(url).pipe(
      map((resp) => CountryMapper.mapRestCountryToArrayToCountryArray(resp)),
      tap((countries) => this.queryCacheRegion.set(region, countries)),
      delay(2000),
      catchError((error) => {
        console.error(`Error al buscar países por región: ${region}`, error);
        return throwError(
          () =>
            new Error(`Error con la búsqueda de países por región: ${region}`)
        );
      })
    );
  }
}
