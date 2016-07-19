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
var login_component_1 = require('../user/login.component');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var MenuComponent = (function () {
    function MenuComponent(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
    MenuComponent.prototype.ngOnInit = function () {
    };
    MenuComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'Menu-Bar',
            templateUrl: 'menu.component.html',
            styleUrls: ['menu.component.css'],
            directives: [login_component_1.LoginComponent, ng2_bootstrap_1.AlertComponent]
        }), 
        __metadata('design:paramtypes', [core_1.ViewContainerRef])
    ], MenuComponent);
    return MenuComponent;
}());
exports.MenuComponent = MenuComponent;
//# sourceMappingURL=menu.component.js.map