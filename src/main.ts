import { bootstrap } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import {UserService} from './app/user/user.service'
import {TasksService} from './app/tasks/tasks.service'
import {ClientService} from './app/clients/clients.service'
import {CalendarService} from './app/calendar/calendar.service'
import {BoxApiService} from './app/user/box.api.service'
import { AppComponent, environment, AppRouterProvider } from './app/';
import {disableDeprecatedForms, provideForms} from '@angular/forms';

import { FIREBASE_PROVIDERS, 
         defaultFirebase,  
         AuthMethods, 
         AuthProviders, 
         firebaseAuthConfig } from 'angularfire2';

if (environment.production) {
  enableProdMode();
}

bootstrap(AppComponent,[
  disableDeprecatedForms(),
  provideForms(),
  AppRouterProvider,
  BoxApiService,
  CalendarService,
  UserService,
  TasksService,
  ClientService,
  FIREBASE_PROVIDERS,
  firebaseAuthConfig({
    provider: AuthProviders.Password,
    method: AuthMethods.Password,
  }),
  defaultFirebase({
    apiKey: "AIzaSyAZcXxUL6IgxKoLy3qt_75i-ApGtlQUJkA",
    authDomain: "lawyermanagementsys-2df1f.firebaseapp.com",
    databaseURL: "https://lawyermanagementsys-2df1f.firebaseio.com",
    storageBucket: "lawyermanagementsys-2df1f.appspot.com",
  })
]);
