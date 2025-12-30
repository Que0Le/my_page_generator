// import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet],
//   templateUrl: './app.html',
//   styleUrl: './app.css'
// })
// export class App {
//   protected readonly title = signal('project1');
// }

import { Component } from '@angular/core';
import { HomeComponent } from './home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent],   // 👈 import the component
  template: `<app-home></app-home>`  // 👈 use its selector
})
export class App {}
