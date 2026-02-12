import { APP_INITIALIZER, ApplicationConfig, inject  } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import {provideAnimations} from '@angular/platform-browser/animations'

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { InitServiceService } from '../core/services/init-service.service';
import { lastValueFrom } from 'rxjs';

export function appInitializerFactory(initService: InitServiceService) {
  return () => new Promise<void>((resolve) => {
    setTimeout(async () => { try {
      await lastValueFrom(initService.init());
    }
    finally {
      const splash = document.getElementById('initial-splash');
      if (splash) {splash.remove();}
      resolve();
    }
  },500)
  })
 
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,withViewTransitions()),
    provideHttpClient(),
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-bottom-right'
    }),
  {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFactory,
      deps: [InitServiceService],
      multi: true
    }
  ]
};
