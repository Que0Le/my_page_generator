import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/homepage';
// import { TestComponent } from './pages/test.component';
import { MarkdownPageComponent } from './pages/markdown-page';
import { UtilsPageComponent } from './pages/utils-page';
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
