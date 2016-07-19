"use strict";
var platform_browser_dynamic_1 = require('@angular/platform-browser-dynamic');
var core_1 = require('@angular/core');
var user_service_1 = require('./app/user/user.service');
var tasks_service_1 = require('./app/tasks/tasks.service');
var clients_service_1 = require('./app/clients/clients.service');
var calendar_service_1 = require('./app/calendar/calendar.service');
var box_api_service_1 = require('./app/user/box.api.service');
var _1 = require('./app/');
var forms_1 = require('@angular/forms');
var angularfire2_1 = require('angularfire2');
if (_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_dynamic_1.bootstrap(_1.AppComponent, [
    forms_1.disableDeprecatedForms(),
    forms_1.provideForms(),
    _1.AppRouterProvider,
    box_api_service_1.BoxApiService,
    calendar_service_1.CalendarService,
    user_service_1.UserService,
    tasks_service_1.TasksService,
    clients_service_1.ClientService,
    angularfire2_1.FIREBASE_PROVIDERS,
    angularfire2_1.firebaseAuthConfig({
        provider: angularfire2_1.AuthProviders.Password,
        method: angularfire2_1.AuthMethods.Password,
    }),
    angularfire2_1.defaultFirebase({
        apiKey: "AIzaSyAZcXxUL6IgxKoLy3qt_75i-ApGtlQUJkA",
        authDomain: "lawyermanagementsys-2df1f.firebaseapp.com",
        databaseURL: "https://lawyermanagementsys-2df1f.firebaseio.com",
        storageBucket: "lawyermanagementsys-2df1f.appspot.com",
    })
]);
//# sourceMappingURL=main.js.map