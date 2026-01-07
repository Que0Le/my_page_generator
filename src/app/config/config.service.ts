import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { AppConfig } from './app-config';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  readonly config: AppConfig = environment;

  get github() {
    return this.config.github;
  }

  get apiBaseUrl() {
    return this.config.apiBaseUrl;
  }

  get isProd() {
    return this.config.production;
  }  
  
  get isMocked() {
    return this.config.isMocked;
  }
}
