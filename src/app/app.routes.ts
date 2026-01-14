import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/homepage.component';
// import { TestComponent } from './pages/test.component';
import { MarkdownPageComponent } from './pages/markdown-page.component';
import { UtilsPageComponent } from './pages/utils-page.component';
import { CountdownComponent } from './components/countdown';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomePageComponent,
  },

  {
    path: 'test',
    component: HomePageComponent,
  },  
  {
    path: 'utils',
    component: UtilsPageComponent,
  },
  {
    path: 'countdown',
    component: CountdownComponent,
  },
  {
    path: '**',
    component: MarkdownPageComponent,
  },
];
