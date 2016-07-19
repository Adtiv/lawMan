"use strict";
var router_1 = require('@angular/router');
var taskList_component_1 = require('./tasks/taskList.component');
var clientList_component_1 = require('./clients/clientList.component');
var login_component_1 = require('./user/login.component');
var userAccount_component_1 = require('./user/userAccount.component');
var calendar_component_1 = require('./calendar/calendar.component');
exports.appRoutes = [
    { path: '', redirectTo: 'tasks' },
    { path: 'tasks', component: taskList_component_1.TaskListComponent },
    { path: 'clients', component: clientList_component_1.ClientListComponent },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'calendar', component: calendar_component_1.CalendarComponent },
    { path: 'userAccount', component: userAccount_component_1.UserAccountComponent }
];
exports.AppRouterProvider = router_1.provideRouter(exports.appRoutes);
//# sourceMappingURL=app.routes.js.map