import { Routes } from '@angular/router';
import { HomePageComponent } from './pages/homepage';
// import { TestComponent } from './pages/test.component';
import { MarkdownPageComponent } from './pages/markdown-page';
import { UtilsPageComponent } from './pages/utils-page';
import { CountdownComponent } from './components/countdown';
import { TelexPageComponent } from './pages/telex-typing-page';
import { ToCPageComponent } from './pages/table-of-content-page';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomePageComponent,
  },
  {
    path: 'toc',
    component: ToCPageComponent,
  },
  {
    path: 'utils',
    component: UtilsPageComponent,
  },
  {
    path: 'telex',
    component: TelexPageComponent,
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
