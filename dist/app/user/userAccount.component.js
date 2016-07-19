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
var user_service_1 = require('./user.service');
var UserAccountComponent = (function () {
    function UserAccountComponent(userService, router) {
        this.userService = userService;
    }
    UserAccountComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.userService.af.auth.subscribe(function (auth) {
            if (auth != null) {
                _this.user = _this.userService.user;
            }
            else {
            }
        });
    };
    UserAccountComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'userAccount',
            templateUrl: 'userAccount.component.html',
            directives: [],
            viewProviders: [],
            styleUrls: ['userAccount.component.css'],
            providers: [user_service_1.UserService]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, router_1.Router])
    ], UserAccountComponent);
    return UserAccountComponent;
}());
exports.UserAccountComponent = UserAccountComponent;
//# sourceMappingURL=userAccount.component.js.map