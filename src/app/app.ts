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
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './navbar.component';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterModule, NavbarComponent, HomeComponent],   // 👈 import the component
//   template: `<app-home></app-home>`  // 👈 use its selector
// })
// export class App {}


// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [
//     RouterModule,     // 👈 needed for router-outlet
//     NavbarComponent
//   ],
//   template: `
//     <app-navbar></app-navbar>

//     <main style="padding: 1rem;">
//       <router-outlet></router-outlet>
//     </main>
//   `
// })

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `
})

export class App {}