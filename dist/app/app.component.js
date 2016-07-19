"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var router_1 = require('@angular/router');
var angularfire2_1 = require('angularfire2');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var menu_component_1 = require('./menu/menu.component');
var taskList_component_1 = require('./tasks/taskList.component');
var clientList_component_1 = require('./clients/clientList.component');
var login_component_1 = require('./user/login.component');
var user_service_1 = require('./user/user.service');
var primeng_1 = require('primeng/primeng');
//import xlsx = require('xlsx');
var AppComponent = (function () {
    //private messages:kurve.MessageDataModel[];
    function AppComponent(af, viewContainerRef, userService) {
        var _this = this;
        this.viewContainerRef = viewContainerRef;
        this.userService = userService;
        this.userService.af.auth.subscribe(function (auth) {
            if (auth != null) {
                console.log(_this.userService.uid);
                _this.userState = true;
                _this.user = _this.userService.user;
                console.log(_this.user);
                document.getElementById('loginButton').style.visibility = 'hidden';
                document.getElementById('loginButton').style.display = 'none';
                document.getElementById('userButton').style.visibility = 'visible';
                document.getElementById('userButton').style.display = 'initial';
            }
            else {
                console.log("not Logged in");
                _this.userState = false;
                document.getElementById('userButton').style.visibility = 'hidden';
                document.getElementById('userButton').style.display = 'none';
            }
        });
    }
    AppComponent.prototype.logOut = function () {
        this.userService.logout();
    };
    AppComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'app-root',
            templateUrl: 'app.component.html',
            styleUrls: ['app.component.css'],
            directives: [router_1.ROUTER_DIRECTIVES, primeng_1.Schedule, ng2_bootstrap_1.AlertComponent, ng2_bootstrap_1.DATEPICKER_DIRECTIVES, menu_component_1.MenuComponent, taskList_component_1.TaskListComponent, login_component_1.LoginComponent, clientList_component_1.ClientListComponent]
        }), 
        __metadata('design:paramtypes', [angularfire2_1.AngularFire, core_1.ViewContainerRef, user_service_1.UserService])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map