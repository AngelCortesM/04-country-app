import { Component, inject, resource, signal } from '@angular/core';
import { SearchInputComponent } from '../by-capital-page/components/search-input/search-input.component';
import { ListComponent } from '../by-capital-page/components/list/list.component';
import { CountryService } from '../../services/country.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, ListComponent],
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css',
})
export class ByCountryPageComponent {
  countryService = inject(CountryService);
  query = signal('');

  countryResourse = resource({
    request: () => ({ query: this.query() }),
    loader: async ({ request }) => {
      if (!request.query) return [];
      return await firstValueFrom(
        this.countryService.searchByCountry(request.query)
      );
    },
  });
}
