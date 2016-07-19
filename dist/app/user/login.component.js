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
var common_1 = require('@angular/common');
var router_1 = require('@angular/router');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var user_service_1 = require('./user.service');
var user_1 = require('./user');
var LoginComponent = (function () {
    function LoginComponent(UserService, router) {
        this.model = new user_1.User("", "", "");
        this.UserService = UserService;
        this.router = router;
    }
    LoginComponent.prototype.ngOnInit = function () {
        document.getElementById('clickModal').click();
    };
    LoginComponent.prototype.navSignUp = function () {
        document.getElementById('login').style.visibility = "hidden";
        document.getElementById('login').style.display = "none";
        document.getElementById('login-title').style.visibility = "hidden";
        document.getElementById('login-title').style.display = "none";
        document.getElementById('signUp').style.visibility = "visible";
        document.getElementById('signUp').style.display = "initial";
        document.getElementById('signUp-title').style.visibility = "visible";
        document.getElementById('signUp-title').style.display = "initial";
    };
    LoginComponent.prototype.navLogin = function () {
        document.getElementById('login').style.visibility = "visible";
        document.getElementById('login').style.display = "initial";
        document.getElementById('login-title').style.visibility = "visible";
        document.getElementById('login-title').style.display = "initial";
        document.getElementById('signUp').style.visibility = "hidden";
        document.getElementById('signUp').style.display = "none";
        document.getElementById('signUp-title').style.visibility = "hidden";
        document.getElementById('signUp-title').style.display = "none";
    };
    LoginComponent.prototype.onLogOut = function () {
        this.UserService.logout();
    };
    LoginComponent.prototype.onSignUp = function () {
        this.UserService.createUser(this.model.email, this.password, this.model.fName, this.model.lName);
    };
    LoginComponent.prototype.onLogin = function () {
        this.UserService.loginUser(this.model.email, this.password);
        this.router.navigate(['tasks']);
        console.log("HERE???");
    };
    LoginComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'Login',
            templateUrl: 'login.component.html',
            directives: [ng2_bootstrap_1.MODAL_DIRECTVES, common_1.CORE_DIRECTIVES],
            viewProviders: [ng2_bootstrap_1.BS_VIEW_PROVIDERS],
            styleUrls: ['login.component.css'],
            providers: [user_service_1.UserService]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, router_1.Router])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map