import {provideRouter, RouterConfig} from '@angular/router';
import {TaskListComponent} from './tasks/taskList.component';
import {ClientListComponent} from './clients/clientList.component';
import {LoginComponent} from './user/login.component';
import {UserAccountComponent} from './user/userAccount.component';
import {CalendarComponent} from './calendar/calendar.component';

export const appRoutes: RouterConfig = [
	{path: '', redirectTo:'tasks'},
	{path: 'tasks',component:TaskListComponent},
	{path: 'clients',component:ClientListComponent},
	{path: 'login',component:LoginComponent},
	{path: 'calendar', component:CalendarComponent},
	{path: 'userAccount',component:UserAccountComponent}
];

export const AppRouterProvider = provideRouter(appRoutes);