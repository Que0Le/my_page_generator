import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>{{ title }}</h1>
    <p>You are on <strong>{{ path }}</strong></p>
  `
})
export class PageComponent {
  title = '';
  path = '';

  constructor(route: ActivatedRoute) {
    route.data.subscribe(d => this.title = d['title']);
    this.path = route.snapshot.routeConfig?.path ?? '';
  }
}
