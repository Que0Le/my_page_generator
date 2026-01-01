// import { Routes } from '@angular/router';
// import { PageComponent } from './page.component';
// import { MarkdownPageComponent } from './pages/markdown-page.component';

// export const routes: Routes = [
//   { path: 'path1', component: MarkdownPageComponent },
//   { path: 'path2', component: PageComponent, data: { title: 'Path 2' } },
//   { path: 'path3', component: PageComponent, data: { title: 'Path 3' } },
//   { path: 'path5', component: PageComponent, data: { title: 'Path 5' } },

//   { path: '', redirectTo: 'path1', pathMatch: 'full' },
//   { path: '**', redirectTo: 'path1' }
// ];


import { Routes } from '@angular/router';
import { MarkdownPageComponent } from './pages/markdown-page.component';

export const routes: Routes = [
  {
    path: '**',
    component: MarkdownPageComponent
  }
];

