import { Component, input } from '@angular/core';
import { Country } from '../../../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-list',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent {
  countries = input.required<Country[]>();
  errorMessage = input<string | unknown>();
  isLoading = input<boolean>(false);
  isEmpty = input<boolean>(false);
}
