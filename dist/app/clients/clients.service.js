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
var user_service_1 = require('../user/user.service');
var moment = require('moment');
var now = moment().format('LLLL');
var ClientService = (function () {
    function ClientService(af, userService) {
        var _this = this;
        this.af = af;
        this.userService = userService;
        this.clientList = [];
        this.userService.af.auth.subscribe(function (auth) {
            if (auth != null) {
                _this.userId = _this.userService.uid;
                _this.setClients();
            }
            else {
                _this.clients = null;
            }
        });
    }
    ClientService.prototype.ngOnInit = function () { };
    ClientService.prototype.setClients = function () {
        var _this = this;
        this.clients = this.af.database.list('clients/' + this.userId, { preserveSnapshot: true });
        this.clientList = [];
        this.af.database.list('clients/' + this.userId, {
            query: {
                orderByChild: 'name',
            }
        }).subscribe(function (snapshots) {
            snapshots.forEach(function (snapshot) {
                _this.setLocalClients(snapshot.$key, snapshot.name, snapshot.email, snapshot.phoneNumber, snapshot.address);
            });
        });
    };
    ClientService.prototype.setLocalClients = function (key, name, email, phoneNumber, address) {
        this.clientList.push(new Client(key, name, email, phoneNumber, address));
    };
    ClientService.prototype.getClients = function () {
        if (this.userId != null) {
            this.clients = this.af.database.list('clients/' + this.userId, {
                query: {
                    orderByChild: 'name',
                }
            });
            return this.clients;
        }
    };
    ClientService.prototype.getLocalClientList = function () {
        return this.clientList;
    };
    ClientService.prototype.addClient = function (name, email, phoneNumber, address) {
        console.log(name + "   " + email + " " + phoneNumber + " " + address);
        this.clients = this.af.database.list('clients/' + this.userService.uid);
        this.clientKey = this.clients.push({ uid: this.userService.uid, name: name, email: email, phoneNumber: phoneNumber, address: address }).key;
        this.addSortLocalClientArray(new Client(this.clientKey, name, email, phoneNumber, address));
    };
    ClientService.prototype.addSortLocalClientArray = function (client) {
        this.clientList.push(client);
        this.clientList.sort(function (a, b) {
            var alc = a.name.toLowerCase(), blc = b.name.toLowerCase();
            return alc > blc ? 1 : alc < blc ? -1 : a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
        });
    };
    ClientService.prototype.updateSortLocalClient = function (key, name, email, phoneNumber, address) {
        for (var i = 0; i < this.clientList.length; i++) {
            if (this.clientList[i].key == key) {
                this.clientList[i].name = name;
                this.clientList[i].email = email;
                this.clientList[i].phoneNumber = phoneNumber;
                this.clientList[i].address = address;
            }
        }
        this.clientList.sort(function (a, b) {
            var alc = a.name.toLowerCase(), blc = b.name.toLowerCase();
            return alc > blc ? 1 : alc < blc ? -1 : a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
        });
    };
    ClientService.prototype.deleteLocalClient = function (clientKey) {
        for (var i = 0; i < this.clientList.length; i++) {
            if (this.clientList[i].key == clientKey) {
                this.clientList.splice(i, 1);
            }
        }
    };
    ClientService.prototype.updateClient = function (clientKey, name, email, phoneNumber, address) {
        var _this = this;
        this.client = this.af.database.object('clients/' + this.userService.uid + '/' + clientKey);
        this.client.update({ name: name, email: email, phoneNumber: phoneNumber, address: address });
        this.af.database.list('clientTasks/' + clientKey).subscribe(function (snapshots) {
            snapshots.forEach(function (snapshot) {
                _this.af.database.object('taskClients/' + snapshot.$key + '/' + clientKey).update({ client: name });
            });
        });
        this.updateSortLocalClient(clientKey, name, email, phoneNumber, address);
        //console.log(taskKey + title + description + dueDate + taskType + daysTillDue);
    };
    ClientService.prototype.deleteClient = function (clientKey) {
        var _this = this;
        this.clients = this.af.database.list('clients/' + this.userService.uid);
        this.clients.remove(clientKey);
        this.af.database.list('clientTasks/' + clientKey).subscribe(function (snapshots) {
            snapshots.forEach(function (snapshot) {
                _this.af.database.object('taskClients/' + snapshot.$key + '/' + clientKey).remove();
            });
        });
        this.af.database.list('clientTasks/' + clientKey).remove();
        this.deleteLocalClient(clientKey);
    };
    ClientService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [angularfire2_1.AngularFire, user_service_1.UserService])
    ], ClientService);
    return ClientService;
}());
exports.ClientService = ClientService;
var Client = (function () {
    function Client(key, name, email, phoneNumber, address) {
        this.key = key;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.address = address;
    }
    return Client;
}());
exports.Client = Client;
//# sourceMappingURL=clients.service.js.map