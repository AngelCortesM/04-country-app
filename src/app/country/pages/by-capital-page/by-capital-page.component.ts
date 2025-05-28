import { Component, OnInit, signal } from '@angular/core';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { ListComponent } from './components/list/list.component';

@Component({
  selector: 'app-by-capital-page',
  imports: [SearchInputComponent, ListComponent],
  templateUrl: './by-capital-page.component.html',
  styleUrl: './by-capital-page.component.css',
})
export class ByCapitalPageComponent implements OnInit {
  searchValueeee = signal('');
  ngOnInit() {}
  guardar(valor: string) {
    this.searchValueeee.set(valor);
    console.log('Valor guardado:', this.searchValueeee());
  }
}
