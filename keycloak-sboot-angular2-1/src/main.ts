import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import { AppModule } from './app/app.module';

import { KeycloakService } from './app/service/keycloak.service';


if (environment.production) {
  enableProdMode();
}

KeycloakService.init()
  .then(() => {
    const platform = platformBrowserDynamic();
    platformBrowserDynamic().bootstrapModule(AppModule);
  });
  //.catch(() => window.location.reload());
