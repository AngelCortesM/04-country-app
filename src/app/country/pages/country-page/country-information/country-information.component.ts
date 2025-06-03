import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-country-information',
  imports: [],
  template: `<p>country-information works!</p>`,
  styleUrl: './country-information.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryInformationComponent {}
