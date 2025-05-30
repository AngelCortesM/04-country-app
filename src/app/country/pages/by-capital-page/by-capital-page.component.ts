import { Component, inject, OnInit, signal } from '@angular/core';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { ListComponent } from './components/list/list.component';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, ListComponent],
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css',
})
export class ByCapitalPageComponent implements OnInit {
  countryService = inject(CountryService);

  ngOnInit() {}

  onSearch(query: string) {
    this.countryService.searchByCapital(query).subscribe({
      next: (countries) => {
        console.log({ countries });
      },
      error: (error) => {
        console.error('Error al buscar países por capital:', error);
      },
    });
  }
}
