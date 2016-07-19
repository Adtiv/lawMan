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
var angularfire2_1 = require('angularfire2');
var clients_service_1 = require('./clients.service');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var ng2_bootstrap_2 = require('ng2-bootstrap/ng2-bootstrap');
require('rxjs/add/operator/map');
var AddClientComponent = (function () {
    function AddClientComponent(clientService, af) {
        this.clientService = clientService;
        this.isCollapsed = true;
    }
    AddClientComponent.prototype.ngOnInit = function () {
    };
    AddClientComponent.prototype.openClients = function () {
        this.isCollapsed = !this.isCollapsed;
    };
    AddClientComponent.prototype.readFile = function () {
        var x = document.getElementById("xcelFile");
        //this.spreadsheet.read(x.files, {type:'binary'});
        //this.spreadsheet.read('sample.xlsx');
    };
    AddClientComponent.prototype.addClient = function () {
        this.clientService.addClient(this.name, this.email, this.phoneNumber, this.address);
        this.isCollapsed = !this.isCollapsed;
        this.name = "";
        this.email = "";
        this.phoneNumber = "";
        this.address = "";
    };
    AddClientComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'Add-Client',
            templateUrl: 'addClient.component.html',
            styleUrls: ['clients.component.css'],
            viewProviders: [ng2_bootstrap_2.BS_VIEW_PROVIDERS],
            directives: [ng2_bootstrap_1.CollapseDirective, ng2_bootstrap_2.MODAL_DIRECTVES, common_1.CORE_DIRECTIVES, ng2_bootstrap_2.DATEPICKER_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [clients_service_1.ClientService, angularfire2_1.AngularFire])
    ], AddClientComponent);
    return AddClientComponent;
}());
exports.AddClientComponent = AddClientComponent;
//# sourceMappingURL=addClient.component.js.map