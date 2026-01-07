export interface AppConfig {
  production: boolean;
  isMocked: boolean;
  apiBaseUrl: string;
  github: {
    owner: string;
    repo: string;
    branch: string;
  };
}
