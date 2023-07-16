import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  desarollador: string = 'Mrybakin';
  version: string = '1.0';
  fecha: string = '09/07/2023';
}
