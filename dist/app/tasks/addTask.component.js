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
var tasks_service_1 = require('./tasks.service');
var ng2_bootstrap_1 = require('ng2-bootstrap/ng2-bootstrap');
var ng2_bootstrap_2 = require('ng2-bootstrap/ng2-bootstrap');
require('rxjs/add/operator/map');
var primeng_1 = require('primeng/primeng');
var moment = require('moment');
var now = moment().format('LLLL');
var AddTaskComponent = (function () {
    function AddTaskComponent(taskService, af) {
        var _this = this;
        this.types = ['Motion Response', 'Mediation Statement',
            'Discovery Response', 'Pleading Response', 'Other'];
        this.taskService = taskService;
        this.client = "";
        this.taskService.userService.af.auth.subscribe(function (auth) {
            if (auth != null) {
                _this.clients = _this.taskService.clients;
            }
            else {
                _this.clients = null;
            }
        });
    }
    AddTaskComponent.prototype.ngOnInit = function () {
        this.isCollapsed = true;
        //this.clients = this.taskService.clients;
    };
    /*
    getDate():number {
      //this.dueDate=this.date.toDateString();
      return this.date && this.date.getTime() || new Date().getTime();
    }
    */
    AddTaskComponent.prototype.formatDate = function (date) {
        var formattedDate = "";
        if (date.getMonth() < 10) {
            formattedDate += "0" + (date.getMonth() + 1);
        }
        else {
            formattedDate += date.getMonth() + 1;
        }
        if (date.getDate() < 10) {
            formattedDate += '/' + '0' + date.getDate();
        }
        else {
            formattedDate += '/' + date.getDate();
        }
        formattedDate += '/' + date.getFullYear();
        return formattedDate;
    };
    AddTaskComponent.prototype.openTasks = function () {
        this.isCollapsed = !this.isCollapsed;
    };
    AddTaskComponent.prototype.addTask = function () {
        var curr = new Date();
        var due = this.taskService.parseDateISO(this.date);
        var currentDate = moment(curr).startOf('day');
        var futureDate = moment(due).startOf('day');
        var differenceInDays = futureDate.diff(currentDate, 'days');
        console.log(currentDate + "    " + futureDate + "   " + differenceInDays);
        this.taskService.addTask(this.title, this.description, this.date, this.taskType, differenceInDays, this.client);
        this.isCollapsed = !this.isCollapsed;
        this.title = "";
        this.description = "";
        this.date = "";
        this.taskType = "";
        this.client = null;
    };
    AddTaskComponent.prototype.setClient = function () {
        //this.client=client;
        console.log(this.client);
    };
    AddTaskComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'Add-Task',
            templateUrl: 'addTask.component.html',
            styleUrls: ['tasks.component.css'],
            viewProviders: [ng2_bootstrap_2.BS_VIEW_PROVIDERS],
            directives: [ng2_bootstrap_1.CollapseDirective, ng2_bootstrap_2.MODAL_DIRECTVES, common_1.CORE_DIRECTIVES, ng2_bootstrap_2.DATEPICKER_DIRECTIVES, primeng_1.Calendar]
        }), 
        __metadata('design:paramtypes', [tasks_service_1.TasksService, angularfire2_1.AngularFire])
    ], AddTaskComponent);
    return AddTaskComponent;
}());
exports.AddTaskComponent = AddTaskComponent;
//# sourceMappingURL=addTask.component.js.map