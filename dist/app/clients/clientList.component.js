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
var angularfire2_1 = require('angularfire2');
var addClient_component_1 = require('./addClient.component');
var clients_service_1 = require('./clients.service');
var user_service_1 = require('../user/user.service');
var common_1 = require('@angular/common');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var search_pipe_1 = require("./search.pipe");
//import 'xlsx'; declare let XLSX;
var ClientListComponent = (function () {
    function ClientListComponent(auth, af, clientService, userService) {
        this.auth = auth;
        //this.spreadsheet = XLSX;
        this.clientService = clientService;
        this.af = af;
    }
    ClientListComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.auth.subscribe(function (data) {
            if (data) {
                _this.clients = _this.clientService.getClients();
            }
        });
        this.searchClient = "";
        this.isCollapsed = true;
        this.edit = true;
    };
    ClientListComponent.prototype.onKey = function (event) {
        this.clientList = this.clientService.getLocalClientList();
        this.searchClient = event.target.value;
        console.log(this.searchClient);
    };
    ClientListComponent.prototype.editToggle = function (client, isLocal) {
        this.edit = !this.edit;
        this.name = client.name;
        this.email = client.email;
        this.phoneNumber = client.phoneNumber;
        this.address = client.address;
        if (!isLocal) {
            this.updatedClientKey = client.$key;
        }
        else {
            this.updatedClientKey = client.key;
        }
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    };
    ClientListComponent.prototype.getStyle = function (clientTask) {
        if (clientTask.days <= 2) {
            return "rgba(255,0,0,1)";
        }
        else if (clientTask.days <= 5) {
            return "rgba(255,255,0,1)";
        }
        else {
            return "rgba(0,255,0,1)";
        }
    };
    ClientListComponent.prototype.updateClient = function () {
        this.edit = !this.edit;
        this.clientService.updateClient(this.updatedClientKey, this.name, this.email, this.phoneNumber, this.address);
    };
    ClientListComponent.prototype.closeEdit = function () {
        this.edit = !this.edit;
    };
    ClientListComponent.prototype.deleteClient = function (client) {
        this.clientService.deleteClient(client.$key);
        return false;
    };
    ClientListComponent.prototype.deleteLocalClient = function (clientKey) {
        this.clientService.deleteClient(clientKey);
        this.searchClient = "";
        return false;
    };
    ClientListComponent.prototype.clientDetail = function (client) {
        if (client.$key == this.clientKey) {
            return false;
        }
        else {
            //this.isCollapsed=!this.isCollapsed;
            return true;
        }
    };
    ClientListComponent.prototype.localClientDetail = function (client) {
        if (client.key == this.localClientKey) {
            return false;
        }
        else {
            //this.isCollapsed=!this.isCollapsed;
            return true;
        }
    };
    ClientListComponent.prototype.activeClient = function (client) {
        if (this.clientKey == client.$key) {
            this.clientKey = "";
            this.clientTasks = null;
        }
        else {
            this.clientKey = client.$key;
            this.clientTasks = this.af.database.list('clientTasks/' + this.clientKey, {
                query: {
                    orderByChild: 'days',
                }
            });
            console.log(this.clientKey);
        }
        return false;
    };
    ClientListComponent.prototype.activeLocalClient = function (client) {
        if (this.localClientKey == client.key) {
            this.localClientKey = "";
            this.clientTasks = null;
        }
        else {
            this.localClientKey = client.key;
            this.clientTasks = this.af.database.list('clientTasks/' + this.localClientKey, {
                query: {
                    orderByChild: 'days',
                }
            });
            console.log(this.localClientKey);
        }
        return false;
    };
    ClientListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'Client-List',
            pipes: [search_pipe_1.SearchPipe],
            templateUrl: 'clientList.component.html',
            styleUrls: ['clients.component.css'],
            viewProviders: [ng2_bootstrap_1.BS_VIEW_PROVIDERS],
            directives: [addClient_component_1.AddClientComponent, ng2_bootstrap_1.CollapseDirective, common_1.CORE_DIRECTIVES]
        }), 
        __metadata('design:paramtypes', [angularfire2_1.FirebaseAuth, angularfire2_1.AngularFire, clients_service_1.ClientService, user_service_1.UserService])
    ], ClientListComponent);
    return ClientListComponent;
}());
exports.ClientListComponent = ClientListComponent;
//# sourceMappingURL=clientList.component.js.map