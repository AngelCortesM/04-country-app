import { Component } from '@angular/core';
import { SearchInputComponent } from "../by-capital-page/components/search-input/search-input.component";
import { ListComponent } from "../by-capital-page/components/list/list.component";

@Component({
  selector: 'app-by-country-page',
  imports: [SearchInputComponent, ListComponent],
  templateUrl: './by-country-page.component.html',
  styleUrl: './by-country-page.component.css'
})
export class ByCountryPageComponent {

}
