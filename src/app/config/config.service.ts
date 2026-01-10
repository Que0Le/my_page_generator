import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { EnvConfig } from './env-config';

@Injectable({ providedIn: 'root' })
export class ConfigService {
  readonly config: EnvConfig = environment;

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

  get cacheTimeout() {
    return this.config.cacheTimeout;
  }
}
